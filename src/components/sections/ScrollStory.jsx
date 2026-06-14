import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ClimateGlobe from "@/components/visuals/ClimateGlobe";
import ParticleField from "@/components/visuals/ParticleField";

const scenes = [
  {
    tag: "Scene 01 — A Changing Climate",
    text: "A changing climate is reshaping operations, assets, supply chains, regulation, and market expectations.",
    tone: "amber",
  },
  {
    tag: "Scene 02 — Signals Become Risks",
    text: "Physical risks, transition risks, regulatory pressure, and stakeholder expectations are now board-level concerns.",
    tone: "amber",
  },
  {
    tag: "Scene 03 — Data Enters Tilnest",
    text: "Tilnest brings scattered sustainability and operational data into one structured climate-intelligence layer.",
    tone: "cyan",
  },
  {
    tag: "Scene 04 — Analysis Becomes Insight",
    text: "Measure emissions, model scenarios, identify material risks, and understand where your business stands.",
    tone: "cyan",
  },
  {
    tag: "Scene 05 — From Risk to Readiness",
    text: "Tilnest helps companies move from uncertainty to preparedness — with clear priorities and practical next steps.",
    tone: "green",
  },
];

const modules = ["GHG Calculator", "ESG Readiness", "Scenario Analysis", "Materiality", "Readiness Audit"];

export default function ScrollStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [
      "radial-gradient(circle at 70% 50%, rgba(217,160,30,0.10), transparent 60%)",
      "radial-gradient(circle at 50% 50%, rgba(13,148,136,0.09), transparent 60%)",
      "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.10), transparent 60%)",
    ]
  );
  const modulesOpacity = useTransform(scrollYProgress, [0.6, 0.72, 0.82], [0, 1, 1]);

  const [mode, setMode] = React.useState("chaos");
  const [intensity, setIntensity] = React.useState(0.9);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(scenes.length - 1, Math.floor(v * scenes.length));
      setActive(idx);
      setMode(v > 0.55 ? "order" : "chaos");
      setIntensity(0.95 - v * 0.7);
    });
  }, [scrollYProgress]);

  return (
    <section id="story" ref={ref} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Background mood shift */}
        <motion.div
          className="absolute inset-0"
          style={{ background: bg }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParticleField
          tone={active < 2 ? "amber" : active < 4 ? "cyan" : "green"}
          density={1}
          className="absolute inset-0 h-full w-full opacity-50"
        />

        {/* Central globe */}
        <ClimateGlobe
          mode={mode}
          intensity={intensity}
          className="absolute left-1/2 top-1/2 h-[90vh] w-[90vh] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-100"
        />

        {/* Orbiting modules — appear in scene 4 */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          style={{ opacity: modulesOpacity }}
        >
          <div className="relative h-[460px] w-[460px]">
            {modules.map((m, i) => {
              const angle = (i / modules.length) * Math.PI * 2;
              const x = Math.cos(angle) * 230;
              const y = Math.sin(angle) * 230;
              return (
                <div
                  key={m}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full glass px-4 py-2 font-mono text-xs text-primary glow-cyan"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  {m}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Text overlay */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          {scenes.map((s, i) => (
            <motion.div
              key={i}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6"
              animate={{
                opacity: active === i ? 1 : 0,
                y: active === i ? 0 : 20,
                filter: active === i ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.5 }}
              style={{ pointerEvents: active === i ? "auto" : "none" }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                {s.tag}
              </span>
              <p className="mt-5 font-heading text-2xl font-bold leading-[1.2] text-balance sm:text-4xl md:text-5xl">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="absolute right-6 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          {scenes.map((_, i) => (
            <div
              key={i}
              className={`h-8 w-[3px] rounded-full transition-all duration-500 ${
                active === i ? "bg-primary glow-cyan" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}