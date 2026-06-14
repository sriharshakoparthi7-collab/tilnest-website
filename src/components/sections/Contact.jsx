import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import { Check, Loader2, Mail, Handshake } from "lucide-react";

const interests = [
  "GHG Calculator",
  "ESG Readiness",
  "Scenario Analysis",
  "Materiality Assessment",
  "Climate Readiness Audit",
  "Partnership / Consulting",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    interest: "GHG Calculator",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter your name and a valid work email.");
      return;
    }
    setStatus("loading");
    try {
      await base44.entities.ContactSubmission.create(form);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Contact Tilnest"
            subtitle="Want to understand your company's emissions, climate exposure, or readiness? Reach out and we'll help you explore where to begin."
          />

          <div className="mt-8 space-y-4">
            <div className="glass flex items-start gap-4 rounded-xl p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Handshake className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold">Partnerships & pilots</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  For partnerships, pilots, and early access enquiries, contact Tilnest.
                </p>
              </div>
            </div>
            <a
              href="mailto:hello@tilnest.com"
              className="glass flex items-center gap-4 rounded-xl p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <span className="font-mono text-sm text-foreground/90">hello@tilnest.com</span>
            </a>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-2xl p-7 md:p-8"
        >
          {status === "done" ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-resilience/15 border border-resilience/40">
                <Check className="h-8 w-8 text-resilience" />
              </div>
              <h3 className="font-heading text-2xl font-bold">Request received</h3>
              <p className="mt-2 text-muted-foreground">
                Thanks for reaching out. The Tilnest team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={(v) => set("name", v)} required />
                <Field label="Company" value={form.company} onChange={(v) => set("company", v)} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Work email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                <Field label="Role" value={form.role} onChange={(v) => set("role", v)} />
              </div>

              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  What are you interested in?
                </span>
                <select
                  value={form.interest}
                  onChange={(e) => set("interest", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary"
                >
                  {interests.map((i) => (
                    <option key={i} value={i} className="bg-card">
                      {i}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Tell us a little about your goals..."
                  className="w-full resize-none rounded-lg border border-border bg-secondary/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary"
                />
              </label>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:glow-cyan disabled:opacity-60"
              >
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "loading" ? "Sending..." : "Request Early Access"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-foreground outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}