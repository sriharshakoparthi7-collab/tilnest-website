import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui-kit/SectionHeading";

const categories = [
  "Governance readiness",
  "Emissions visibility",
  "Risk identification",
  "Scenario planning",
  "Adaptation strategy",
  "Reporting readiness",
  "Data quality",
  "Operational resilience",
];

export default function Readiness() {
  const [angle, setAngle] = useState(0);
  const raf = useRef();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tick = () => {
      setAngle((a) => (a + 0.8) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <section id="readiness" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Readiness Scan"
          title="Know how climate-ready your company is"
          subtitle="Tilnest helps companies understand where they stand today and what needs to improve next."
        />

        <div className="mt-16 flex flex-col items-center gap-14 lg:flex-row lg:justify-center">
          {/* Radar scan */}
          <div className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[420px] sm:w-[420px]">
            {/* rings */}
            {[1, 0.72, 0.44].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-primary/15"
                style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
              />
            ))}
            {/* cross lines */}
            <div className="absolute h-full w-px bg-primary/10" />
            <div className="absolute h-px w-full bg-primary/10" />

            {/* sweeping scan beam */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from ${angle}deg, transparent 0deg, rgba(0,240,255,0.25) 30deg, transparent 60deg)`,
              }}
            />

            {/* category dots around perimeter */}
            {categories.map((c, i) => {
              const a = (i / categories.length) * 360;
              const lit = Math.abs(((angle - a + 540) % 360) - 180) > 150;
              const rad = (a * Math.PI) / 180;
              const x = Math.cos(rad) * 46;
              const y = Math.sin(rad) * 46;
              return (
                <div
                  key={c}
                  className="absolute"
                  style={{ left: `${50 + x}%`, top: `${50 + y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      lit ? "bg-primary glow-cyan scale-150" : "bg-primary/30"
                    }`}
                  />
                </div>
              );
            })}

            {/* center score */}
            <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full glass-strong glow-cyan sm:h-40 sm:w-40">
              <span className="font-heading text-4xl font-extrabold text-primary text-glow-cyan sm:text-5xl">
                72
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Readiness
              </span>
            </div>
          </div>

          {/* category list */}
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            {categories.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass flex items-center gap-2.5 rounded-lg px-3 py-2.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-foreground/80">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}