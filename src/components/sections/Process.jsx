import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import { Database, Gauge, Microscope, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Database,
    title: "Collect",
    body: "Gather company, emissions, ESG, operational, and exposure data.",
  },
  {
    n: "02",
    icon: Gauge,
    title: "Measure",
    body: "Calculate emissions and create visibility across Scope 1, Scope 2, and relevant Scope 3 sources.",
  },
  {
    n: "03",
    icon: Microscope,
    title: "Analyze",
    body: "Run scenario, materiality, risk, opportunity, and readiness assessments.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Act",
    body: "Prioritize gaps, build a roadmap, and prepare for reporting, audits, and long-term resilience.",
  },
];

export default function Process() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Process"
          title="From data to climate-ready action"
          subtitle="A clear path from scattered inputs to decisions you can stand behind."
        />

        <div className="relative mt-16">
          {/* connecting glow line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
          <motion.div
            className="absolute left-0 top-12 hidden h-px bg-primary glow-cyan lg:block"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full glass-strong glow-cyan lg:mx-0">
                  <s.icon className="h-9 w-9 text-primary" />
                </div>
                <div className="mt-6 text-center lg:text-left">
                  <span className="font-mono text-xs text-primary">{s.n}</span>
                  <h3 className="mt-1 font-heading text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}