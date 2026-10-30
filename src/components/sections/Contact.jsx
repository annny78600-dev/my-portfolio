import { useState } from "react";
import { ArrowUpRight, Check, Copy, Linkedin, Mail, MapPin } from "lucide-react";
import Reveal from "../ui/Reveal";
import { profile } from "../../data/profile";

const FORM_ENDPOINT = "https://formspree.io/f/mgoykkzk";

const messages = {
  loading: "Sending your message…",
  success: "Thanks! Your message has been sent. I'll get back to you soon.",
  error: `Something went wrong. Please try again, or email me directly at ${profile.email}.`,
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-line bg-bg/60 px-4 py-3.5 text-base text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent focus-visible:outline-none";

const Contact = () => {
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Unable to send message");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line bg-bg py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-24">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="text-subtle">07</span>
            <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-fg sm:text-7xl">
            Let&apos;s build something <span className="text-accent">useful.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-8 text-muted">
            Have a role, a project, or a product idea in mind? Send a message and I&apos;ll get back to you.
          </p>

          <div className="mt-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-3 text-fg transition-colors hover:border-accent">
                <Mail size={17} className="text-accent" aria-hidden="true" />
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label={copied ? "Email address copied" : "Copy email address"}
              >
                {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
              </button>
            </div>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-3 text-fg transition-colors hover:border-accent">
              <Linkedin size={17} className="text-accent" aria-hidden="true" />
              linkedin.com/in/anila-iqbal
              <ArrowUpRight size={15} className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <p className="inline-flex items-center gap-3 px-5 py-3 text-muted">
              <MapPin size={17} className="text-accent" aria-hidden="true" />
              {profile.location}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-line bg-surface/80 p-6 shadow-soft backdrop-blur-md sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-fg">
                Name
                <input type="text" name="name" autoComplete="name" placeholder="Your name" required className={inputClass} />
              </label>
              <label className="block text-sm font-medium text-fg">
                Email
                <input type="email" name="email" autoComplete="email" placeholder="you@company.com" required className={inputClass} />
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium text-fg">
              Message
              <textarea name="message" rows={5} placeholder="Tell me about the role or project" required className={`${inputClass} resize-y`} />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? "Sending…" : "Send message"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <p role="status" aria-live="polite" className={`mt-4 min-h-6 text-sm ${status === "error" ? "text-red-500 dark:text-red-400" : "text-muted"}`}>
              {messages[status] ?? ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
