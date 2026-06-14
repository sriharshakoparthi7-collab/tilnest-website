import React from "react";
import { motion } from "framer-motion";
import ClimateGlobe from "@/components/visuals/ClimateGlobe";
import ParticleField from "@/components/visuals/ParticleField";
import GlowButton from "@/components/ui-kit/GlowButton";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";

const footerLinks = [
  { label: "Story", href: "#story" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Readiness", href: "#readiness" },
  { label: "Contact", href: "#contact" },
];

export default function FinalCTA() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="relative overflow-hidden">
      {/* CTA */}
      <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-resilience/[0.03] to-transparent" />
        <ParticleField tone="green" density={0.7} className="absolute inset-0 h-full w-full opacity-40" />
        <ClimateGlobe
          mode="order"
          intensity={0.2}
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-70"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-resilience">
            From uncertainty to intelligence
          </span>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
            Make climate uncertainty{" "}
            <span className="text-primary text-glow-cyan">measurable.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Tilnest helps companies understand their exposure, prepare for change, and build
            climate-resilient strategies.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <GlowButton onClick={openWaitlist}>Join the Waitlist</GlowButton>
            <GlowButton
              variant="ghost"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Us
            </GlowButton>
          </div>
        </motion.div>
      </div>

      {/* Footer — data horizon */}
      <footer className="relative border-t border-border/50 py-14">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-primary/20" />
                <span className="h-3 w-3 rounded-full bg-primary glow-cyan" />
              </span>
              <span className="font-heading text-lg font-extrabold tracking-tight">Tilnest</span>
            </a>

            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
              {footerLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-8 text-center md:flex-row md:text-left">
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Tilnest. Climate intelligence for business resilience.
            </p>
            <p className="font-mono text-xs text-muted-foreground/60">
              From risk to readiness.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}