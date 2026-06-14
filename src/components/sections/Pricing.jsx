import React from "react";
import { motion } from "framer-motion";
import GlowButton from "@/components/ui-kit/GlowButton";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";
import { Sparkles } from "lucide-react";

export default function Pricing() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="pricing" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center glow-cyan md:p-14"
        >
          <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative z-10">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Pricing
            </span>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl">
              Coming Soon
            </h2>
            <p className="mx-auto mt-5 max-w-md text-muted-foreground">
              We are shaping flexible options for companies at different stages of their climate
              journey. Join the waitlist to try Tilnest first.
            </p>
            <div className="mt-8 flex justify-center">
              <GlowButton onClick={openWaitlist}>Join the Waitlist</GlowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}