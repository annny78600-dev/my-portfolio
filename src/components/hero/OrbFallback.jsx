// Static stand-in for the WebGL orb: shown while the shader chunk loads,
// and permanently when WebGL2 is unavailable.
const OrbFallback = ({ className = "" }) => (
  <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
    <div
      className="aspect-square w-[62%] rounded-full"
      style={{
        background:
          "radial-gradient(circle at 34% 28%, #ffffff 0%, #e4dbff 7%, #a78bfa 24%, #5b21b6 52%, #1e0a45 78%, #0b0614 100%)",
        boxShadow: "inset -24px -30px 60px rgba(10, 4, 30, 0.75), inset 18px 22px 40px rgba(255, 255, 255, 0.18)",
      }}
    />
  </div>
);

export default OrbFallback;
