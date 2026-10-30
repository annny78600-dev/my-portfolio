import { ArrowRight, Bot, Cable, CheckCircle2 } from "lucide-react";

const workflows = [
  {
    label: "OmniDimension",
    title: "Re-engage leads and route interested prospects",
    description: "Integrated AI calling workflows to re-engage older leads and connect interested leads with their assigned counsellors.",
    steps: ["Older leads", "AI calling", "Counsellor handoff"],
  },
  {
    label: "CRM integrations",
    title: "Keep campaign and call activity connected",
    description: "Connected campaign data and Callyzer call-tracking events to CRM workflows through webhooks.",
    steps: ["Campaign data", "Webhook events", "Lead follow-up"],
  },
];

const Automation = () => (
  <section id="automation" className="overflow-hidden bg-[#171814] px-6 py-24 text-[#f4f2e9] sm:px-10 lg:px-16">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3a06f]">AI automation</p>
          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">Useful AI belongs inside a real workflow.</h2>
        </div>
          <p className="max-w-lg text-base leading-7 text-white/65">My AI-related project experience is integrating calling workflows and automations into business processes. I use AI coding assistants for development support; I do not build or train language models.</p>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {workflows.map((workflow) => (
          <article key={workflow.label} className="border border-white/15 p-7 sm:p-9">
            <div className="flex items-center justify-between text-[#f3a06f]"><span className="text-xs font-semibold uppercase tracking-[0.2em]">{workflow.label}</span><Bot size={21} aria-hidden="true" /></div>
            <h3 className="mt-12 max-w-md text-2xl font-semibold tracking-[-0.02em]">{workflow.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/60">{workflow.description}</p>
            <div className="mt-10 flex flex-wrap items-center gap-2 text-xs font-medium text-white/80">
              {workflow.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 border border-white/20 px-3 py-2"><CheckCircle2 size={14} className="text-[#f3a06f]" aria-hidden="true" />{step}</span>
                  {index < workflow.steps.length - 1 && <Cable size={15} className="hidden text-white/35 sm:block" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-3 text-sm text-white/50"><ArrowRight size={16} className="text-[#f3a06f]" aria-hidden="true" /> Workflow integrations are presented within the scope of my project contributions.</div>
    </div>
  </section>
);

export default Automation;
