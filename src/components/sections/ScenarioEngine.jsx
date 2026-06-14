import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

const levers = [
  { key: "clean", label: "Clean Energy", desc: "Renewables, PPAs, and grid decarbonization", color: "#0D9488", weight: 1.0 },
  { key: "efficiency", label: "Efficiency", desc: "Process optimization and lower energy intensity", color: "#10B981", weight: 0.85 },
  { key: "supply", label: "Supply Chain", desc: "Supplier engagement and Scope 3 reduction", color: "#6366F1", weight: 0.7 },
  { key: "nature", label: "Nature & Resilience", desc: "Flood protection, adaptation, biodiversity", color: "#D9A01E", weight: 0.55 },
  { key: "reporting", label: "Reporting Controls", desc: "Audit trails, governance, and disclosure", color: "#EA580C", weight: 0.6 },
];

function useCounter(target) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    let raf;
    const step = () => {
      setVal((v) => {
        const diff = target - v;
        if (Math.abs(diff) < 0.4) return target;
        return v + diff * 0.18;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return val;
}

// Generative resilience waveform path
function buildWave(score, jagged) {
  const pts = [];
  const N = 24;
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * 300;
    const base = 70 - (score / 100) * 45;
    const noise = Math.sin(i * 0.9) * jagged * 8 + Math.sin(i * 2.3) * jagged * 4;
    const y = base + noise;
    pts.push([x, y]);
  }
  return pts.reduce((acc, [x, y], i) => (i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`), "");
}

export default function ScenarioEngine() {
  const [vals, setVals] = useState({ clean: 60, efficiency: 45, supply: 35, nature: 30, reporting: 50 });

  const setLever = (key, v) => setVals((s) => ({ ...s, [key]: v }));

  const { readiness, reduction, jagged } = useMemo(() => {
    let weighted = 0;
    let total = 0;
    levers.forEach((l) => {
      weighted += vals[l.key] * l.weight;
      total += 100 * l.weight;
    });
    const score = Math.round((weighted / total) * 100);
    const spread =
      Math.max(...Object.values(vals)) - Math.min(...Object.values(vals));
    return { readiness: score, reduction: Math.round(score * 0.62), jagged: spread / 100 };
  }, [vals]);

  const animReadiness = Math.round(useCounter(readiness));
  const animReduction = Math.round(useCounter(reduction));

  const categories = [
    { label: "Emissions reduction", val: Math.round(vals.clean * 0.5 + vals.efficiency * 0.5), color: "#10B981" },
    { label: "Clean energy transition", val: vals.clean, color: "#0D9488" },
    { label: "Climate resilience", val: Math.round(vals.nature * 0.6 + vals.supply * 0.4), color: "#6366F1" },
    { label: "Disclosure readiness", val: vals.reporting, color: "#D9A01E" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left — budget levers */}
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Climate Action Allocation
        </p>
        <div className="mt-2 flex items-end justify-between">
          <h3 className="font-heading text-2xl font-bold">Tune your strategy</h3>
          <span className="rounded-full glass px-3 py-1 font-mono text-xs text-primary">
            2.0°C transition
          </span>
        </div>

        <div className="mt-8 space-y-7">
          {levers.map((l) => (
            <div key={l.key}>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm font-semibold">{l.label}</p>
                  <p className="text-xs text-muted-foreground">{l.desc}</p>
                </div>
                <span className="font-mono text-sm font-bold" style={{ color: l.color }}>
                  {vals[l.key]}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vals[l.key]}
                onChange={(e) => setLever(l.key, Number(e.target.value))}
                className="tilnest-slider w-full"
                style={{
                  background: `linear-gradient(90deg, ${l.color} ${vals[l.key]}%, rgba(15,118,110,0.12) ${vals[l.key]}%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right — live outcome */}
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Modeled Outcome
          </p>
          <span className="h-2 w-2 rounded-full bg-resilience animate-pulse" />
        </div>

        {/* Resilience waveform */}
        <div className="mt-6 rounded-xl border border-border bg-secondary/60 p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs text-muted-foreground">Readiness Score</p>
              <p className="font-heading text-5xl font-extrabold text-primary text-glow-cyan">
                {animReadiness}
                <span className="text-2xl">%</span>
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-muted-foreground">Est. emissions cut</p>
              <p className="font-heading text-3xl font-bold text-resilience">{animReduction}%</p>
            </div>
          </div>
          <svg viewBox="0 0 300 90" className="mt-4 h-24 w-full overflow-visible">
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#D9A01E" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>
            <motion.path
              d={buildWave(readiness, jagged)}
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ d: buildWave(readiness, jagged) }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Category bars */}
        <div className="mt-6 space-y-4">
          {categories.map((c) => (
            <div key={c.label}>
              <div className="mb-1.5 flex justify-between font-mono text-xs">
                <span className="text-muted-foreground">{c.label}</span>
                <span style={{ color: c.color }}>{c.val}/100</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: c.color }}
                  animate={{ width: `${c.val}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Recommendation</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {readiness >= 70
              ? "Strong posture. Clean energy and efficiency investments are driving down emissions while reporting controls improve audit confidence."
              : readiness >= 45
              ? "Solid foundation. Increasing supply chain and resilience allocation would reduce material exposure further."
              : "Elevated exposure. Prioritize clean energy and emissions visibility to close the largest readiness gaps first."}
          </p>
        </div>
      </div>
    </div>
  );
}