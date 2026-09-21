"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { content, type Lang } from "@/src/data/content";

const STORAGE_KEY = "lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof content)[Lang];
};

const LanguageContext = createContext<Ctx | null>(null);

// Bahasa disimpan di localStorage dan dibaca lewat useSyncExternalStore:
// render server & hydrasi selalu "id", lalu otomatis beralih ke pilihan tersimpan.
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb); // sinkron antar tab
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "id";
  } catch {
    return "id"; // localStorage bisa diblokir
  }
}

const getServerSnapshot = (): Lang => "id";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* abaikan */
    }
    listeners.forEach((cb) => cb());
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam <LanguageProvider>");
  return ctx;
}
