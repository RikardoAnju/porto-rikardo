"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LOADER_DONE_EVENT } from "@/src/components/Loader";
import RotatingText from "@/src/components/RotatingText";
import { techs } from "@/src/data/content";
import { useLang } from "@/src/components/LanguageProvider";
import {
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";

// One-shot entrance (CSS only, plays once when the loader leaves). Nothing
// keeps animating afterwards, so idle scrolling stays cheap.
const rise = (delay = 0) =>
  ({ style: { "--d": `${delay}s` } }) as { style: React.CSSProperties };

const surface =
  "rounded-2xl border border-white/70 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.12)] dark:border-indigo-900/40 dark:bg-slate-900";


export default function Hero() {
  const { t } = useLang();
  // Start the entrance as the loader fades out (fallback if it never fires).
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    window.addEventListener(LOADER_DONE_EVENT, go);
    const fallback = setTimeout(go, 4000);
    return () => {
      window.removeEventListener(LOADER_DONE_EVENT, go);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="home"
      data-ready={ready}
      className="relative overflow-hidden px-4 pb-16 pt-12 sm:pb-24 sm:pt-20"
    >
      {/* Soft background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.28),transparent_70%)]" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.28),transparent_70%)]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="hero-rise" {...rise(0)}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-cyan-300">
            <Sparkles className="h-4 w-4" />
            {t.hero.badge}
          </span>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Rikardo
            </span>
            <br />
            <RotatingText items={t.hero.roles} letters interval={4800} jitter={400} className="whitespace-nowrap" />
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px] dark:text-slate-300">
            {t.hero.intro}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl"
            >
              {t.hero.ctaProjects}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-indigo-600 px-8 py-3.5 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-indigo-900/20"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        {/* Right: photo + floating cards */}
        <div
          className="hero-rise relative mx-auto h-[480px] w-full max-w-[560px] sm:h-[560px]"
          {...rise(0.1)}
        >
          {/* Organic blob */}
          <div className="absolute left-1/2 top-0 h-[88%] w-[72%] -translate-x-1/2 rounded-[45%_55%_60%_40%/55%_45%_55%_45%] bg-gradient-to-br from-indigo-300 via-indigo-200 to-cyan-200 dark:from-indigo-700/50 dark:via-indigo-800/40 dark:to-cyan-700/30" />

          {/* Foto: bagian bawah memudar halus agar tidak terlihat terpotong */}
          <div className="absolute inset-x-0 bottom-0 top-6 flex items-end justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]">
            <Image
              src="/foto.webp"
              alt="Rikardo Anju"
              width={433}
              height={577}
              priority
              unoptimized
              className="h-full w-auto object-contain object-bottom"
            />
          </div>

          {/* Kartu kiri: bidang yang ditekuni. Tiap item = 1 kartu utuh */}
          <div
            {...rise(0.4)}
            className="hero-rise absolute left-0 top-[24%] hidden w-56 xl:-left-10 xl:block"
          >
            <RotatingText
              swap
              className="w-full"
              delay={1200}
              interval={4100}
              jitter={600}
              items={t.focusAreas.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className={`${surface} flex w-full items-center gap-2.5 p-2.5`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                      {title}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {desc}
                    </span>
                  </span>
                </div>
              ))}
            />
          </div>

          {/* Kartu kanan: nilai/cara kerja. Tiap item = 1 kartu utuh */}
          <div
            {...rise(0.5)}
            className="hero-rise absolute right-0 top-[37%] hidden w-44 xl:-right-14 xl:block"
          >
            <RotatingText
              swap
              className="w-full"
              delay={2000}
              interval={3300}
              jitter={500}
              items={t.values.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className={`${surface} flex w-full flex-col items-center justify-center gap-2 px-3 py-3 text-center`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {text}
                  </p>
                </div>
              ))}
            />
          </div>

          {/* Pill kanan atas: teknologi yang dipakai. Tiap item = 1 pill utuh */}
          <div
            {...rise(0.6)}
            className="hero-rise absolute right-0 top-2 whitespace-nowrap xl:[right:calc(-1*min(5rem,(100vw_-_72rem)/2_-_0.75rem))]"
          >
            <RotatingText
              swap
              delay={2800}
              interval={2700}
              jitter={400}
              items={techs.map((t) => (
                <div
                  key={t.name}
                  className={`${surface} flex w-full items-center gap-3 rounded-full py-2.5 pl-2.5 pr-6`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${t.color} ${t.text}`}
                  >
                    {t.short}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {t.name}
                  </span>
                </div>
              ))}
            />
          </div>
        </div>
      </div>

      {/* Floating contact button */}
      <a
        href="mailto:intellect.ayocuci@gmail.com"
        aria-label={t.hero.emailAria}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/40 transition-transform hover:scale-110 active:scale-95"
      >
        <Mail className="h-6 w-6" />
      </a>
    </section>
  );
}
