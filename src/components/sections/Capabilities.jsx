import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import { Calculator, ClipboardList, GitBranch, Layers, Target, ScanLine } from "lucide-react";

const cards = [
  {
    icon: Calculator,
    title: "GHG Calculator",
    body: "Measure Scope 1, Scope 2, and relevant Scope 3 emissions using structured company inputs.",
  },
  {
    icon: ClipboardList,
    title: "ESG Readiness",
    body: "Organize sustainability information into clear workflows for tracking, reporting, and stakeholder communication.",
  },
  {
    icon: GitBranch,
    title: "Climate Scenario Analysis",
    body: "Explore how different warming pathways may affect operations, assets, costs, and supply chains.",
  },
  {
    icon: Layers,
    title: "Materiality Assessment",
    body: "Identify which climate and sustainability issues matter most to the business and its stakeholders.",
  },
  {
    icon: Target,
    title: "Risk & Opportunity Mapping",
    body: "Map threats and opportunities so teams can prioritize the actions that matter first.",
  },
  {
    icon: ScanLine,
    title: "Climate Readiness Audit",
    body: "Assess whether a company is prepared, exposed, resilient, or vulnerable to climate change impacts.",
  },
];

function TiltCard({ card, index }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 10;
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`);
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const onLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlow((g) => ({ ...g, on: false }));
  };

  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: "transform 0.2s ease-out" }}
      className="group relative overflow-hidden rounded-2xl glass p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, rgba(0,240,255,0.14), transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,240,255,0.4)" }}
      />
      <div className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 transition-all duration-300 group-hover:glow-cyan">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-bold">{card.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="What Tilnest helps you understand"
          subtitle="A connected view of emissions, ESG readiness, climate risk, and business resilience."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <TiltCard key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}