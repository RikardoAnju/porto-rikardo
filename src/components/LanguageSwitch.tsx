"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLang } from "@/src/components/LanguageProvider";
import type { Lang } from "@/src/data/content";

const options: Lang[] = ["id", "en"];

/** Tombol bahasa "ID ▾" dengan menu pilihan ID / EN. */
export default function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup saat klik di luar atau tekan Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language.label}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/20 dark:hover:text-cyan-300"
      >
        {lang.toUpperCase()}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.language.label}
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-indigo-100 bg-white py-1 shadow-[0_12px_35px_rgba(15,23,42,0.15)] dark:border-indigo-900/40 dark:bg-slate-900"
        >
          {options.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <button
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-indigo-50 dark:text-slate-200 dark:hover:bg-indigo-900/30"
              >
                <span>
                  <span className="font-semibold">{l.toUpperCase()}</span>
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    {t.language[l]}
                  </span>
                </span>
                {l === lang && <Check className="h-4 w-4 text-indigo-600 dark:text-cyan-300" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
