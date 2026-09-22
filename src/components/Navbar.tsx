"use client";

import { useEffect, useRef, useState } from "react";
import LanguageSwitch from "@/src/components/LanguageSwitch";
import { useLang } from "@/src/components/LanguageProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  // Tutup menu mobile saat klik di luar atau tekan Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
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
    <nav
      ref={navRef}
      className="sticky top-0 z-40 border-b border-indigo-200/40 bg-white/95 dark:border-indigo-900/30 dark:bg-slate-950/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid 3 kolom: menu selalu di kolom tengah (center sungguhan, bukan sekadar sisa ruang).
            Mobile: bahasa di kolom 1 (kiri), hamburger di kolom 3 (kanan).
            Desktop: kolom 1 kosong, menu di kolom 2, bahasa pindah ke kolom 3 (kanan). */}
        <div className="grid h-16 grid-cols-3 items-center">
          <div className="row-start-1 col-start-1 md:col-start-3 md:justify-self-end">
            <LanguageSwitch />
          </div>

          <div className="row-start-1 col-start-2 hidden justify-self-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 text-base font-medium text-slate-700 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/20 dark:hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="row-start-1 col-start-3 justify-self-end rounded-lg p-2 text-slate-700 transition-colors hover:bg-indigo-50 md:hidden dark:text-slate-300 dark:hover:bg-indigo-900/20"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile: panel yang MENIMPA konten (absolute), tidak mendorong halaman ke bawah. */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full border-b border-indigo-200/40 bg-white shadow-[0_16px_30px_rgba(15,23,42,0.10)] transition-[opacity,translate,visibility] duration-200 ease-out md:hidden dark:border-indigo-900/30 dark:bg-slate-950 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/20 dark:hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
