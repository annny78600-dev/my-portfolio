import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const detailsRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const entryTrigger = { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" };

    gsap.fromTo(contentRef.current, { y: 90, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: entryTrigger,
    });

    gsap.fromTo(detailsRef.current, { x: -45, autoAlpha: 0 }, {
      x: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 76%", toggleActions: "play none none reverse" },
    });

    gsap.fromTo(formRef.current, { x: 45, autoAlpha: 0 }, {
      x: 0,
      autoAlpha: 1,
      duration: 1,
      delay: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 76%", toggleActions: "play none none reverse" },
    });

    gsap.fromTo(formRef.current.querySelectorAll("label"), { y: 22, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.65,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: formRef.current, start: "top 70%", once: true },
    });

    gsap.to(imageRef.current, {
      yPercent: 12,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgoykkzk", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Unable to send message");

      toast.success("Message sent successfully", { position: "top-right", autoClose: 3000 });
      setStatus("success");
      form.reset();
    } catch {
      toast.error("Something went wrong", { position: "top-right", autoClose: 3000 });
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="stacked-section relative min-h-screen overflow-hidden bg-[#0a0a0a] px-6 py-24 text-[#f4f2e9] sm:px-10 lg:px-16">
      <ToastContainer theme="dark" newestOnTop closeOnClick pauseOnHover />
      <img ref={imageRef} src="/lapatop_timeline.avif" alt="" aria-hidden="true" className="pointer-events-none absolute -inset-y-[8%] right-0 h-[116%] w-full object-cover opacity-[0.12] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(243,160,111,0.16),transparent_28%),radial-gradient(circle_at_88%_80%,rgba(104,154,164,0.12),transparent_30%)]" />
      <div ref={contentRef} className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:items-end md:gap-20">
        <div ref={detailsRef}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3a06f]">Contact</p>
          <h2 className="max-w-lg text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl">Have a system worth building?</h2>
          <p className="mt-8 max-w-md text-base leading-7 text-white/60">Tell me what you are working on, where the friction is, and what a better outcome looks like.</p>
          <div className="mt-10 space-y-3 text-sm text-white/65">
            <a href="mailto:anilaiqbal2121@gmail.com" className="group flex w-fit items-center gap-2 hover:text-[#f3a06f]">anilaiqbal2121@gmail.com <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/anila-iqbal-570814247" target="_blank" rel="noopener noreferrer" className="group flex w-fit items-center gap-2 hover:text-[#f3a06f]">LinkedIn <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></a>
            <a href="https://anila-iqbal.vercel.app/" target="_blank" rel="noopener noreferrer" className="group flex w-fit items-center gap-2 hover:text-[#f3a06f]">Portfolio <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></a>
            <p className="pt-2 text-white/45">Mohali, Punjab, India</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-9">
          <div className="space-y-5">
            <label className="block text-sm font-medium text-white/85">Name<input type="text" name="name" placeholder="Your name" required className="mt-2 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#f3a06f]" /></label>
            <label className="block text-sm font-medium text-white/85">Email<input type="email" name="email" placeholder="you@example.com" required className="mt-2 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#f3a06f]" /></label>
            <label className="block text-sm font-medium text-white/85">Message<textarea name="message" placeholder="What are you building?" rows="4" required className="mt-2 w-full resize-y border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#f3a06f]" /></label>
            <button type="submit" disabled={status === "loading"} className="inline-flex items-center gap-3 bg-[#f3a06f] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60">{status === "loading" ? "Sending..." : status === "success" ? "Message sent" : "Send message"}<ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
