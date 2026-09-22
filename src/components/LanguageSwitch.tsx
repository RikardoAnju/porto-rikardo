"use client";

import { useLang } from "@/src/components/LanguageProvider";
import type { Lang } from "@/src/data/content";

const options: Lang[] = ["id", "en"];

/** Toggle bahasa: dua tombol "ID" / "EN" bersebelahan, yang aktif berlatar penuh. */
export default function LanguageSwitch() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="radiogroup"
      aria-label={t.language.label}
      className="inline-flex items-center gap-0.5 rounded-full bg-indigo-50 p-1 dark:bg-slate-800/80"
    >
      {options.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(l)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
              active
                ? "bg-indigo-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
                : "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-cyan-300"
            }`}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
