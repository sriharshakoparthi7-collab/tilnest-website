import React from "react";

export default function GlowButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-mono text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:scale-[1.03] hover:glow-cyan",
    ghost:
      "border border-primary/40 text-foreground hover:border-primary hover:glow-cyan hover:scale-[1.03] bg-white/[0.02]",
    green:
      "bg-resilience text-primary-foreground hover:scale-[1.03] hover:glow-green",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}