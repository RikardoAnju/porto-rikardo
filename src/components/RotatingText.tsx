"use client";

import { useEffect, useState, type ReactNode } from "react";

// Dipakai bersama semua rotator: pergantian diberi jarak minimal supaya tidak pernah
// terjadi berbarengan (setiap pergantian mendapat "slot" waktunya sendiri).
const MIN_GAP = 900;
let lastSwapAt = 0;

type Props = {
  items: ReactNode[];
  /** ms antar pergantian */
  interval?: number;
  /** ms acak (+/-) ditambahkan ke tiap interval, supaya beberapa rotator tidak pernah sejajar */
  jitter?: number;
  /** ms sebelum pergantian pertama, supaya banyak rotator tidak berganti bersamaan */
  delay?: number;
  /**
   * true: tiap item adalah KARTU utuh (punya latar/bayangan sendiri).
   * Kartu lama naik + memudar, kartu baru naik dari bawah menggantikannya.
   * false: fade + geser kecil, cocok untuk teks judul.
   */
  swap?: boolean;
  /**
   * true: items harus string. Tiap HURUF bergulir satu per satu (bertahap):
   * huruf lama naik keluar, huruf baru naik masuk dari bawah.
   */
  letters?: boolean;
  className?: string;
};

/**
 * Semua item ditumpuk di satu sel grid, jadi ukurannya = item terbesar
 * (tidak ada layout shift) dan animasinya hanya opacity/translate/scale.
 */
export default function RotatingText({
  items,
  interval = 2800,
  jitter = 0,
  delay = 0,
  swap = false,
  letters = false,
  className,
}: Props) {
  const [{ index, prev }, setState] = useState({ index: 0, prev: -1 });

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    const next = () => interval + (jitter ? (Math.random() * 2 - 1) * jitter : 0);
    const tick = () => {
      const now = Date.now();
      const at = Math.max(now, lastSwapAt + MIN_GAP);
      lastSwapAt = at;
      timer = setTimeout(() => {
        // Jangan berganti saat tab tidak terlihat.
        if (!document.hidden) {
          setState((s) => ({ index: (s.index + 1) % items.length, prev: s.index }));
        }
        timer = setTimeout(tick, next());
      }, at - now);
    };
    const start = setTimeout(() => {
      timer = setTimeout(tick, next());
    }, delay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [items.length, interval, jitter, delay]);

  if (letters) {
    const words = items as string[];
    return (
      <span
        className={`inline-grid ${className ?? ""}`}
        role="text"
        aria-label={words[index]}
      >
        {words.map((word, wi) => {
          const state = wi === index ? "active" : wi === prev ? "prev" : "next";
          return (
            <span
              key={word}
              aria-hidden
              className="col-start-1 row-start-1 whitespace-nowrap"
            >
              {[...word].map((ch, ci) => (
                <span
                  key={ci}
                  className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
                >
                  <span
                    className="inline-block transition-[translate,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      translate:
                        state === "active"
                          ? "0 0"
                          : state === "prev"
                            ? "0 -115%"
                            : "0 115%",
                      // masuk: menyusul satu per satu; keluar: lebih cepat;
                      // yang sudah keluar langsung pindah ke posisi tunggu (tanpa transisi)
                      opacity: state === "active" ? 1 : 0,
                      transitionDelay: `${state === "active" ? 100 + ci * 40 : state === "prev" ? ci * 20 : 0}ms`,
                      transitionDuration:
                        state === "next" ? "0ms" : state === "prev" ? "450ms" : undefined,
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                </span>
              ))}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className={`inline-grid ${className ?? ""}`} aria-live="polite">
      {items.map((item, i) => {
        const state = i === index ? "active" : i === prev ? "prev" : "next";
        return swap ? (
          <span
            key={i}
            aria-hidden={i !== index}
            data-state={state}
            className="swap-card col-start-1 row-start-1 flex"
            style={i === index ? undefined : { pointerEvents: "none" }}
          >
            {item}
          </span>
        ) : (
          <span
            key={i}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 transition-[opacity,translate] duration-500 ease-out ${
              i === index
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            {item}
          </span>
        );
      })}
    </span>
  );
}
