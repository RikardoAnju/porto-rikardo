"use client";

import { useEffect, useRef, useState } from "react";

export const LOADER_DONE_EVENT = "loader-done";
const DURATION = 2200;

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drive the progress UI straight from rAF (no React re-render per frame).
  useEffect(() => {
    let raf = 0;
    let startTime = 0;
    let doneTimer: ReturnType<typeof setTimeout>;
    const frame = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / DURATION);
      const p = 1 - Math.pow(1 - t, 3); // ease-out cubic
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (glowRef.current) glowRef.current.style.transform = `translateX(${p * 256 - 64}px)`;
      if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`;
      dotRefs.current.forEach((d, i) => {
        if (d) d.style.opacity = p * 100 > i * 33 ? "1" : "0.3";
      });
      if (t < 1) raf = requestAnimationFrame(frame);
      else doneTimer = setTimeout(() => setHidden(true), 300);
    };
    raf = requestAnimationFrame(frame);
    // rAF is paused in background tabs; this guarantees the loader still ends.
    const safety = setTimeout(() => setHidden(true), DURATION + 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(doneTimer);
      clearTimeout(safety);
    };
  }, []);

  // Tell the page the loader is leaving so content can animate in as it fades.
  useEffect(() => {
    if (!hidden) return;
    window.dispatchEvent(new Event(LOADER_DONE_EVENT));
    const t = setTimeout(() => setRemoved(true), 600);
    return () => clearTimeout(t);
  }, [hidden]);

  useEffect(() => {
    // Prevent scrolling while the loader is visible.
    document.body.style.overflow = removed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [removed]);

  if (removed) return null;

  return (
    <div
      aria-hidden={hidden}
      role="status"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-12 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 transition-opacity duration-500 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        @keyframes pulse-blob {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes compass-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes needle-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ring-expand {
          0%, 100% { r: 50px; opacity: 0.3; }
          50% { r: 65px; opacity: 0; }
        }
        .animate-float { animation: float-up 2.5s ease-in-out infinite; }
        .animate-pulse-blob { animation: pulse-blob 2s ease-in-out infinite; }
        .animate-compass { animation: compass-spin 8s linear infinite; }
        .animate-needle { animation: needle-rotate 6s linear infinite; }
        .animate-ring { animation: ring-expand 2s ease-out infinite; }
      `}</style>

      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.25),transparent_70%)] opacity-100 dark:opacity-5" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.25),transparent_70%)] opacity-100 dark:opacity-5" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main animated container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Compass Rose Design */}
        <div className="relative h-64 w-64">
          {/* SVG Compass Rose */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Outer circle */}
            <circle cx="120" cy="120" r="110" stroke="url(#roseGradient)" strokeWidth="1.5" opacity="0.5" />

            {/* Inner circle */}
            <circle cx="120" cy="120" r="80" stroke="url(#roseGradient)" strokeWidth="0.8" opacity="0.3" />

            {/* Compass Rose Petals */}
            {/* North - Blue petal (pointing up) */}
            <path d="M 120 25 L 140 75 L 120 70 L 100 75 Z" fill="#6366f1" opacity="0.9" />

            {/* East - Cyan petal (pointing right) */}
            <path d="M 215 120 L 165 140 L 170 120 L 165 100 Z" fill="#67e8f9" opacity="0.7" />

            {/* South - Blue petal (pointing down) */}
            <path d="M 120 215 L 100 165 L 120 170 L 140 165 Z" fill="#6366f1" opacity="0.5" />

            {/* West - Cyan petal (pointing left) */}
            <path d="M 25 120 L 75 100 L 70 120 L 75 140 Z" fill="#67e8f9" opacity="0.6" />

            {/* Cardinal direction marks - Primary (N, E, S, W) */}
            <g stroke="url(#roseGradient)" strokeWidth="2.5" opacity="0.8">
              {/* North */}
              <line x1="120" y1="10" x2="120" y2="30" />
              {/* East */}
              <line x1="230" y1="120" x2="210" y2="120" />
              {/* South */}
              <line x1="120" y1="230" x2="120" y2="210" />
              {/* West */}
              <line x1="10" y1="120" x2="30" y2="120" />
            </g>

            {/* Intercardinal marks - shorter */}
            <g stroke="url(#roseGradient)" strokeWidth="1.2" opacity="0.4">
              {/* NE, SE, SW, NW */}
              <line x1="185" y1="55" x2="175" y2="65" />
              <line x1="185" y1="185" x2="175" y2="175" />
              <line x1="55" y1="185" x2="65" y2="175" />
              <line x1="55" y1="55" x2="65" y2="65" />
            </g>

            {/* Rotating outer ring */}
            <g className="animate-compass" opacity="0.3">
              <circle cx="120" cy="120" r="115" fill="none" stroke="url(#roseGradient)" strokeWidth="1" strokeDasharray="4,4" />
            </g>

            {/* Gradient definition */}
            <defs>
              <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Smooth rotating needle */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main needle - clean and smooth */}
            <div className="animate-needle">
              {/* North pointing needle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-28 origin-bottom rounded-full bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 opacity-100 shadow-lg shadow-indigo-500/50" />
              {/* South pointing needle - tail */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 origin-top rounded-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent opacity-60" />
            </div>
          </div>

          {/* Center circle with cardinal labels */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Cardinal direction labels */}
            <div className="absolute text-center pointer-events-none">
              <div className="absolute -top-36 left-1/2 -translate-x-1/2 text-sm font-bold text-indigo-600 dark:text-indigo-400">N</div>
              <div className="absolute -right-36 top-1/2 -translate-y-1/2 text-sm font-bold text-indigo-500 dark:text-cyan-400">E</div>
              <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 text-sm font-bold text-indigo-400 dark:text-cyan-300">S</div>
              <div className="absolute -left-36 top-1/2 -translate-y-1/2 text-sm font-bold text-indigo-500 dark:text-cyan-400">W</div>
            </div>

            {/* Center hub/center dot */}
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-xl shadow-indigo-500/70 border-2 border-white dark:border-slate-950 z-20" />
          </div>

          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-20 w-20 rounded-full border-2 border-indigo-400/25 dark:border-indigo-600/25" style={{ animation: "pulse 3s ease-in-out infinite" }} />
            <div className="absolute h-14 w-14 rounded-full border border-cyan-400/30 dark:border-cyan-600/30" style={{ animation: "pulse 2.5s ease-in-out infinite", animationDelay: "0.3s" }} />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400"
              style={{
                left: `${25 + i * 25}%`,
                top: "50%",
                animation: `float-up ${2.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress section */}
      <div className="relative w-64 flex flex-col gap-4">
        {/* Animated progress bar */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-indigo-200/40 to-cyan-200/40 dark:from-indigo-900/30 dark:to-cyan-900/30 shadow-inner">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Glow effect */}
          <div
            ref={glowRef}
            className="absolute left-0 top-0 h-full w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 will-change-transform"
            style={{ transform: "translateX(-64px)" }}
          />
        </div>

        {/* Status text */}
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-semibold">
            Initializing
          </span>
          <span ref={pctRef} className="text-indigo-600 dark:text-cyan-400 font-semibold">
            0%
          </span>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-opacity duration-300"
              style={{ opacity: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
