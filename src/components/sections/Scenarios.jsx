import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import ParticleField from "@/components/visuals/ParticleField";
import ScenarioEngine from "@/components/sections/ScenarioEngine";

const pathways = [
  {
    id: "1.5",
    label: "1.5°C Pathway",
    sub: "Ambitious decarbonization",
    tone: "green",
    glow: "rgba(0,255,178,0.14)",
    risk: "Low",
    riskColor: "#00FFB2",
    note: "Organized data paths, lower risk intensity, and a managed transition with cooler exposure signals.",
  },
  {
    id: "2",
    label: "2°C Pathway",
    sub: "Moderate warming",
    tone: "cyan",
    glow: "rgba(0,240,255,0.14)",
    risk: "Elevated",
    riskColor: "#00F0FF",
    note: "Stronger heat signals, rising regulatory pressure, and more risk indicators across assets and supply.",
  },
  {
    id: "3",
    label: "3°C+ High-Risk",
    sub: "Severe warming",
    tone: "amber",
    glow: "rgba(255,184,0,0.16)",
    risk: "High",
    riskColor: "#FFB800",
    note: "Intense particles, storm movement, and amplified amber risk pulses with significant asset exposure.",
  },
  {
    id: "shock",
    label: "Transition Shock",
    sub: "Rapid policy change",
    tone: "amber",
    glow: "rgba(255,122,0,0.16)",
    risk: "Volatile",
    riskColor: "#FF7A00",
    note: "Fast-moving compliance signals, shifting supply-chain lines, and sudden business-impact indicators.",
  },
];

export default function Scenarios() {
  const [active, setActive] = useState("2");
  const current = pathways.find((p) => p.id === active);

  return (
    <section id="scenarios" className="relative overflow-hidden py-28 md:py-36">
      <motion.div
        className="absolute inset-0"
        animate={{ background: `radial-gradient(circle at 50% 30%, ${current.glow}, transparent 60%)` }}
        transition={{ duration: 0.8 }}
      />
      <ParticleField
        tone={current.tone}
        density={active === "3" || active === "shock" ? 1.4 : 0.8}
        className="absolute inset-0 h-full w-full opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Scenario Engine"
          title="See how different climate futures could affect your business"
          subtitle="Tilnest helps companies think beyond today's reporting needs and explore how future warming scenarios could change business risk."
        />

        {/* Pathway tabs */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              onMouseEnter={() => setActive(p.id)}
              className={`relative overflow-hidden rounded-xl p-5 text-left transition-all duration-300 ${
                active === p.id ? "glass-strong glow-cyan" : "glass hover:border-primary/40"
              }`}
            >
              <p className="font-heading text-lg font-bold">{p.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.sub}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: p.riskColor }} />
                <span className="font-mono text-xs" style={{ color: p.riskColor }}>
                  {p.risk} risk
                </span>
              </div>
              {active === p.id && (
                <motion.div
                  layoutId="scenarioActive"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-6 max-w-2xl text-sm text-muted-foreground"
          >
            <span className="font-mono uppercase tracking-wider" style={{ color: current.riskColor }}>
              {current.label}:
            </span>{" "}
            {current.note}
          </motion.p>
        </AnimatePresence>

        {/* Interactive engine */}
        <div className="mt-12">
          <ScenarioEngine />
        </div>
      </div>
    </section>
  );
}