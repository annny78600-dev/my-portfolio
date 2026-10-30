import { useEffect, useRef, useState } from "react";
import OrbFallback from "./OrbFallback";

// Raymarched liquid-chrome blob in a single WebGL2 fragment shader.
// Reacts to pointer position (rotation) and pointer speed (surface energy),
// idles smoothly on its own, pauses off-screen, and renders one still frame for reduced motion.

const VERTEX = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uEnergy;
out vec4 outColor;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float map(vec3 p) {
  p.yz *= rot(uPointer.y * 0.55 + uTime * 0.11);
  p.xz *= rot(uPointer.x * 0.75 + uTime * 0.17);
  float t = uTime * 0.6;
  float amp = 0.15 + uEnergy * 0.13;
  float d = length(p) - 1.0;
  d += amp * sin(p.x * 2.6 + t) * sin(p.y * 3.1 + t * 1.21) * sin(p.z * 2.3 + t * 0.83);
  d += amp * 0.45 * sin(p.x * 5.3 - t * 1.4 + p.z * 1.7) * sin(p.y * 4.7 + t);
  return d * 0.7;
}

vec3 calcNormal(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float h = 0.0015;
  return normalize(
    k.xyy * map(p + k.xyy * h) + k.yyx * map(p + k.yyx * h) +
    k.yxy * map(p + k.yxy * h) + k.xxx * map(p + k.xxx * h));
}

// Studio environment: deep violet floor, lavender sky, a chrome horizon band, two softboxes.
vec3 env(vec3 r) {
  float y = r.y * 0.5 + 0.5;
  vec3 col = mix(vec3(0.03, 0.015, 0.07), vec3(0.36, 0.22, 0.78), smoothstep(0.08, 0.9, y));
  col = mix(col, vec3(0.94, 0.91, 1.0), smoothstep(0.78, 1.0, y));
  col += vec3(0.78, 0.64, 1.0) * pow(max(0.0, 1.0 - abs(r.y + 0.06) * 6.5), 3.0) * 0.85;
  col += vec3(1.0) * pow(max(dot(r, normalize(vec3(-0.6, 0.7, 0.5))), 0.0), 36.0) * 1.7;
  col += vec3(0.62, 0.42, 1.0) * pow(max(dot(r, normalize(vec3(0.85, -0.25, 0.55))), 0.0), 10.0) * 0.9;
  return col;
}

vec3 shade(vec3 p, vec3 rd) {
  vec3 n = calcNormal(p);
  vec3 r = reflect(rd, n);
  float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
  vec3 col = env(r);
  vec3 irid = vec3(0.78, 0.62, 1.1) + 0.22 * cos(6.2831 * (fres * 0.8 + vec3(0.0, 0.33, 0.67)));
  col *= mix(vec3(1.0), irid, 0.4);
  col += vec3(0.55, 0.4, 1.0) * fres * 0.55;
  col = col / (1.0 + col * 0.3);
  return pow(col, vec3(0.92));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  vec3 ro = vec3(0.0, 0.0, 5.0);
  vec3 rd = normalize(vec3(uv, -1.5));
  float t = 0.0;
  float minD = 1e3;
  float minT = 0.0;
  bool hit = false;
  for (int i = 0; i < 80; i++) {
    float d = map(ro + rd * t);
    if (d < minD) { minD = d; minT = t; }
    if (d < 0.0008) { hit = true; break; }
    t += d;
    if (t > 8.0) break;
  }
  float px = 1.6 * minT / (1.5 * min(uRes.x, uRes.y));
  float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, px, minD / 0.7);
  if (alpha <= 0.0) { outColor = vec4(0.0); return; }
  vec3 col = shade(ro + rd * (hit ? t : minT), rd);
  outColor = vec4(col * alpha, alpha);
}`;

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const ChromeOrb = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) {
      setFailed(true);
      return undefined;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (vertex && fragment) {
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
    }
    if (!vertex || !fragment || !gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return undefined;
    }
    gl.useProgram(program);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const uniforms = {
      res: gl.getUniformLocation(program, "uRes"),
      time: gl.getUniformLocation(program, "uTime"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      energy: gl.getUniformLocation(program, "uEnergy"),
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { time: 4, px: 0, py: 0, tx: 0, ty: 0, energy: 0, lastX: null, lastY: null };
    let raf = 0;
    let last = 0;
    let visible = true;
    let firstFrame = true;

    const draw = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.res, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, state.time);
      gl.uniform2f(uniforms.pointer, state.px, state.py);
      gl.uniform1f(uniforms.energy, state.energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (firstFrame) {
        firstFrame = false;
        setReady(true);
      }
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      state.time += dt;
      const ease = Math.min(1, dt * 3);
      state.px += (state.tx - state.px) * ease;
      state.py += (state.ty - state.py) * ease;
      state.energy *= Math.exp(-dt * 1.6);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!reduce && !raf && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, rect.width < 600 ? 1.25 : 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      draw();
    };

    const onPointerMove = (event) => {
      state.tx = (event.clientX / window.innerWidth) * 2 - 1;
      state.ty = (event.clientY / window.innerHeight) * 2 - 1;
      if (state.lastX !== null) {
        const speed = Math.hypot(event.clientX - state.lastX, event.clientY - state.lastY);
        state.energy = Math.min(1, state.energy + speed * 0.0025);
      }
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    };

    const onVisibility = () => start();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    intersection.observe(canvas);
    if (!reduce) window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  if (failed) return <OrbFallback className={className} />;

  return (
    <div className={`relative ${className}`}>
      {!ready && <OrbFallback className="absolute inset-0" />}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default ChromeOrb;
