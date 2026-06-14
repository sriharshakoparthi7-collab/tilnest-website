import React, { createContext, useContext, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";

const WaitlistContext = createContext(null);

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openWaitlist = useCallback(() => setOpen(true), []);
  const closeWaitlist = useCallback(() => setOpen(false), []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist }}>
      {children}
      <WaitlistModal open={open} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

function WaitlistModal({ open, onClose }) {
  const [form, setForm] = useState({ email: "", name: "", company: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      await base44.entities.WaitlistEntry.create(form);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm({ email: "", name: "", company: "" });
      setError("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass-strong relative z-10 w-full max-w-md rounded-2xl p-8 glow-cyan"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {status === "done" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-resilience/15 border border-resilience/40">
                  <Check className="h-8 w-8 text-resilience" />
                </div>
                <h3 className="font-heading text-2xl font-bold">You're on the list</h3>
                <p className="mt-2 text-muted-foreground">
                  We'll reach out when early access opens. Thank you for your interest in Tilnest.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  Early Access
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold">Join the Waitlist</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Be among the first companies to turn climate uncertainty into measurable action.
                </p>
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <Field
                    label="Work email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="you@company.com"
                    required
                  />
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Optional"
                  />
                  <Field
                    label="Company"
                    value={form.company}
                    onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                    placeholder="Optional"
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:glow-cyan disabled:opacity-60"
                  >
                    {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {status === "loading" ? "Joining..." : "Request Access"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}