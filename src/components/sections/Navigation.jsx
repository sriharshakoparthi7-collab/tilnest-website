import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";

const links = [
  { label: "Story", href: "#story" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Readiness", href: "#readiness" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong glow-cyan" : "glass"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/20" />
            <span className="h-3 w-3 rounded-full bg-primary glow-cyan" />
          </span>
          <span className="font-heading text-lg font-extrabold tracking-tight">Tilnest</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openWaitlist}
            className="hidden rounded-full bg-primary px-5 py-2 font-mono text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:glow-cyan sm:block"
          >
            Join Waitlist
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong absolute top-20 left-4 right-4 rounded-2xl p-6 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                openWaitlist();
              }}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground"
            >
              Join Waitlist
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}