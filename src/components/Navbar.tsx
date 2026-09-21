"use client";

import { useState } from "react";
import LanguageSwitch from "@/src/components/LanguageSwitch";
import { useLang } from "@/src/components/LanguageProvider";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLang();

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-indigo-200/40 bg-white/95 dark:border-indigo-900/30 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-end md:justify-center">
          {/* Desktop Navigation (tengah) */}
          <div className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/20 dark:hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Kanan: pilihan bahasa (+ tombol menu di mobile) */}
          <div className="flex items-center gap-1 md:absolute md:right-0">
            <LanguageSwitch />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-700 transition-all hover:bg-indigo-50 md:hidden dark:text-slate-300 dark:hover:bg-indigo-900/20"
              aria-label={t.nav.menu}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className={`h-6 w-6 transition-transform ${mobileMenuOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-indigo-200/40 py-2 md:hidden dark:border-indigo-900/30">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/20 dark:hover:text-cyan-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
