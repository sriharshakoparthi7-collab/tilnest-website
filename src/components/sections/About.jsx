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

        {/* Right — intelligence core */}
        <div className="relative flex h-[420px] items-center justify-center">
          <div className="absolute h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute h-80 w-80 rounded-full border border-primary/15"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute h-64 w-64 rounded-full border border-resilience/15"
          />
          {/* Core */}
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full glass-strong glow-cyan">
            <span className="font-heading text-sm font-bold text-primary">Tilnest</span>
          </div>
          {/* Floating signals */}
          {signals.map((s, i) => {
            const angle = (i / signals.length) * Math.PI * 2;
            const radius = i % 2 === 0 ? 150 : 110;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={s}
                className="absolute rounded-full glass px-3 py-1 font-mono text-[11px] text-foreground/80"
                style={{ left: "50%", top: "50%" }}
                animate={{
                  x: [x, x * 0.85, x],
                  y: [y, y * 0.85, y],
                }}
                transition={{ repeat: Infinity, duration: 4 + i * 0.3, ease: "easeInOut" }}
              >
                <span className="-ml-1/2 block -translate-x-1/2 -translate-y-1/2">{s}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}