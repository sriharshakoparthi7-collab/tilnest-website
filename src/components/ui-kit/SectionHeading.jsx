import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex max-w-2xl flex-col ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}