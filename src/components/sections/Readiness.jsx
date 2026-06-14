import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { category: "Governance", score: 78 },
  { category: "Emissions", score: 65 },
  { category: "Risk ID", score: 82 },
  { category: "Scenario", score: 58 },
  { category: "Adaptation", score: 71 },
  { category: "Reporting", score: 85 },
  { category: "Data Quality", score: 60 },
  { category: "Resilience", score: 74 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-3 py-2 text-sm">
        <p className="font-mono font-semibold text-primary">{payload[0].payload.category}</p>
        <p className="text-foreground">{payload[0].value} / 100</p>
      </div>
    );
  }
  return null;
};

export default function Readiness() {
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
          {/* Spider Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-6 glow-cyan w-full max-w-[460px]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Readiness Profile
              </span>
              <span className="font-heading text-2xl font-extrabold text-primary">72<span className="text-sm font-normal text-muted-foreground">/100</span></span>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={data} outerRadius="78%">
                <PolarGrid stroke="rgba(13,148,136,0.15)" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontFamily: "var(--font-mono)" }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.18}
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4, strokeWidth: 0 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category list */}
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            {data.map((c, i) => (
              <motion.div
                key={c.category}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass flex flex-col gap-1.5 rounded-lg px-3 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/80">{c.category}</span>
                  <span className="font-mono text-xs font-semibold text-primary">{c.score}</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.score}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}