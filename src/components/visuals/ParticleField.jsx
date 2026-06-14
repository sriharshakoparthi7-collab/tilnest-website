import React, { useRef, useEffect } from "react";

/**
 * Lightweight canvas particle field with connecting lines.
 * `tone` = "cyan" | "amber" | "green". `density` scales count.
 */
export default function ParticleField({ tone = "cyan", density = 1, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    let particles = [];
    let w, h;

    const reduced = window.matchMedia(
      "(max-width: 768px), (prefers-reduced-motion: reduce)"
    ).matches;

    const tones = {
      cyan: [13, 148, 136],
      amber: [217, 160, 30],
      green: [16, 185, 129],
    };
    const [r, g, b] = tones[tone] || tones.cyan;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const base = reduced ? 24 : 60;
      const count = Math.floor((base * density * Math.min(w, 1400)) / 1400);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.6 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.55)`;
        ctx.fill();

        if (!reduced) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(${r},${g},${b},${0.16 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [tone, density]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}