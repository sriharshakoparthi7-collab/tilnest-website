import React from "react";
import { motion } from "framer-motion";
import ClimateGlobe from "@/components/visuals/ClimateGlobe";
import ParticleField from "@/components/visuals/ParticleField";
import GlowButton from "@/components/ui-kit/GlowButton";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <ParticleField tone="amber" density={0.8} className="absolute inset-0 h-full w-full opacity-60" />
      <ClimateGlobe
        mode="chaos"
        intensity={0.8}
        className="absolute right-[-12%] top-1/2 hidden h-[120vh] w-[70vw] -translate-y-1/2 md:block"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Climate Intelligence Platform
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
            Climate risk{" "}
            <span className="text-primary">is</span>{" "}
            business risk.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/90">
            Tilnest helps companies measure emissions, assess climate exposure, and build
            strategies for a more resilient future.
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            From GHG calculation to scenario analysis and climate-readiness audits, Tilnest turns
            complex sustainability data into decision-ready insight.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <GlowButton onClick={openWaitlist}>Join the Waitlist</GlowButton>
            <GlowButton variant="ghost" onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Tilnest
            </GlowButton>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}