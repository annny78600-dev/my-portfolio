import { ArrowUp } from "lucide-react";
import { profile, sections } from "../../data/profile";

// `linkPrefix` lets pages other than the home page point section links back to "/".
const Footer = ({ linkPrefix = "" }) => (
  <footer className="border-t border-line bg-bg">
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_auto] lg:px-24">
      <div>
        <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-fg">{profile.name}</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          Software Developer specialising in React.js and Next.js, based in {profile.location}.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted">
          {sections.filter((section) => section.id !== "home").map((section) => (
            <li key={section.id}>
              <a href={`${linkPrefix}#${section.id}`} className="transition-colors hover:text-accent">{section.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col items-start gap-3 text-sm text-muted md:items-end">
        <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
        <a href={`${linkPrefix}#home`} className="mt-2 inline-flex items-center gap-2 text-fg transition-colors hover:text-accent">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
    <div className="border-t border-line">
      <p className="mx-auto max-w-[1440px] px-5 py-6 font-mono text-xs text-subtle sm:px-8 lg:px-24">
        © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS, GSAP &amp; Framer Motion.
      </p>
    </div>
  </footer>
);

export default Footer;
