import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import { Brain, Compass, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Brain,
    title: "Clear Climate Intelligence",
    body: "Turn complex sustainability and climate data into simple, decision-ready insight.",
  },
  {
    icon: Compass,
    title: "Risk and Opportunity View",
    body: "Understand both exposure and opportunity across operations, regulation, supply chains, and strategy.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Preparedness",
    body: "Help companies prepare for audits, reporting needs, climate change, and long-term business resilience.",
  },
];

const signals = ["GHG", "Scope 3", "ESG", "Risk", "Policy", "Energy", "Assets", "Audit"];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Tilnest"
            title="Climate strategy, made measurable."
          />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Tilnest is building climate-intelligence tools for companies that need to understand
              emissions, climate risk, ESG readiness, and long-term resilience.
            </p>
            <p>
              We believe climate strategy should not be buried inside spreadsheets, disconnected
              reports, or complex frameworks. It should be clear, measurable, and useful for
              decision-making.
            </p>
            <p>
              Our mission is to help companies see their climate exposure, understand what matters
              most, and prepare for a future shaped by regulation, stakeholder expectations, and
              physical climate impacts.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-1">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass flex items-start gap-4 rounded-xl p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — climate data bars */}
        <div className="relative flex h-[420px] w-full items-end justify-center gap-3 px-4 pb-8">
          <div className="absolute inset-x-0 bottom-8 h-px bg-border" />
          <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Climate Strategy Progress
          </div>
          {signals.map((s, i) => {
            const heights = [72, 55, 83, 60, 91, 48, 76, 65];
            const h = heights[i];
            return (
              <div key={s} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <motion.div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary/60 to-primary relative overflow-hidden"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h * 2.6}px` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: "easeInOut" }}
                  />
                </motion.div>
                <span className="font-mono text-[9px] text-muted-foreground text-center leading-tight">{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}