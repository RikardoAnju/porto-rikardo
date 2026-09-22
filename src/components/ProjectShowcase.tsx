"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";
import { useLang } from "@/src/components/LanguageProvider";
import { projects } from "@/src/data/projects";
import styles from "./ProjectShowcase.module.css";


const rise = (delay = 0) =>
  ({ style: { "--d": `${delay}s` } }) as { style: React.CSSProperties };

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Gaya AOS: animasi terjadi lagi setiap kali section masuk layar
  // (scroll turun maupun scroll naik balik), bukan cuma sekali.
  // Pengguna reduced-motion langsung dianggap "visible", tanpa observer.
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

const screens = [
  { src: "/projects/ayocuci-beranda-clean.webp", id: "Beranda", en: "Home", detail: { id: "Semua aktivitas, dalam satu tempat.", en: "Every activity, in one place." } },
  { src: "/projects/ayocuci-status.webp", id: "Pesanan", en: "Orders", detail: { id: "Pantau pesanan dari masuk hingga selesai.", en: "Track orders from arrival to completion." } },
  { src: "/projects/ayocuci-kehadiran.webp", id: "Kehadiran", en: "Attendance", detail: { id: "Kehadiran tim dengan informasi lokasi.", en: "Team attendance with location information." } },
  { src: "/projects/ayocuci-profile.webp", id: "Profil", en: "Profile", detail: { id: "Kelola tim dan pengaturan bisnis.", en: "Manage your team and business settings." } },
  { src: "/projects/ayocuci-playstore.webp", id: "Play Store", en: "Play Store", detail: { id: "Ayo Cuci di Google Play Store.", en: "Ayo Cuci on the Google Play Store." } },
];

export default function ProjectShowcase() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const project = projects[0];
  const screen = screens[active];
  const isId = lang === "id";
  const move = (step: number) => setActive((current) => (current + step + screens.length) % screens.length);
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section id="projects" ref={ref} data-ready={visible} className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className="hero-rise" {...rise(0)}>
            <p className={styles.eyebrow}><span /> {isId ? "KARYA PILIHAN" : "SELECTED WORK"}</p>
            <h2 id="projects-heading">{isId ? "Dari ide, jadi " : "From an idea to "}<span>{isId ? "solusi nyata." : "a real solution."}</span></h2>
          </div>
          <div className={`${styles.intro} hero-rise`} {...rise(0.1)}>
            <p>{isId ? "Eksplorasi project yang saya bangun untuk menjawab kebutuhan sehari-hari." : "Explore the projects I build to solve everyday needs."}</p>
          </div>
        </header>

        <article className={styles.project} aria-labelledby="ayocuci-title">
          <div className={`${styles.info} hero-rise`} {...rise(0.2)}>
            <div className={styles.meta}><span>01 / {isId ? "PROJECT PILIHAN" : "FEATURED PROJECT"}</span><Smartphone size={18} aria-hidden="true" /></div>
            <div className={styles.titleGroup}>
              <p className={styles.category}>{isId ? "STUDI KASUS · MOBILE APP" : "CASE STUDY · MOBILE APP"}</p>
              <h3 id="ayocuci-title">Ayo Cuci</h3>
              <p className={styles.tagline}>{isId ? "Project mobile yang saya bangun dan rilis di Play Store." : "A mobile project I built and shipped to the Play Store."}</p>
            </div>
            <p className={styles.description}>{isId ? "Ayo Cuci adalah aplikasi kasir dan manajemen untuk usaha laundry: mencatat pesanan dari masuk sampai selesai, memantau kehadiran karyawan, dan merangkum laporan keuangan dari beberapa outlet sekaligus. Saya membangun sisi mobile-nya dengan Flutter, terhubung ke backend Go yang saya kembangkan dan uji sendiri lewat Postman, termasuk login Google lewat Firebase." : "Ayo Cuci is a POS and management app for laundry businesses: logging orders from intake to completion, tracking employee attendance, and summarizing financial reports across multiple outlets. I built the mobile app with Flutter, connected to a Go backend I developed and tested with Postman, including Google Sign-In via Firebase."}</p>
            <div className={styles.features}>
              <div><span>01</span><p>{isId ? "Kasir & pesanan" : "POS & orders"}</p></div>
              <div><span>02</span><p>{isId ? "Manajemen karyawan" : "Employee management"}</p></div>
              <div><span>03</span><p>{isId ? "Laporan multi-outlet" : "Multi-outlet reports"}</p></div>
            </div>
            <div className={styles.stack}>
              <p>{isId ? "DIBANGUN DENGAN" : "BUILT WITH"}</p>
              <div>{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
            </div>
          </div>

          <div className={`${styles.gallery} hero-rise`} {...rise(0.35)}>
            <div className={styles.galleryTop}><span><span className={styles.dot} /> {isId ? "JELAJAHI APLIKASI" : "EXPLORE THE APP"}</span><span>{String(active + 1).padStart(2, "0")} / 05</span></div>
            <div className={styles.stage}>
              <span className={styles.watermark} aria-hidden="true">ayo<br />cuci.</span>
              <div className={styles.phone}>
                <Image key={screen.src} src={screen.src} alt={`Ayo Cuci — ${screen[lang]}`} fill unoptimized className={styles.screen} />
              </div>
              <span className={styles.stageNote} aria-hidden="true">{isId ? "DIBUAT OLEH" : "BUILT BY"}<br />RIKARDO ANJU</span>
            </div>
            <div className={styles.caption}>
              <div aria-live="polite" aria-atomic="true"><strong>{screen[lang]}</strong><p>{screen.detail[lang]}</p></div>
              <div className={styles.arrows}>
                <button type="button" onClick={() => move(-1)} aria-label={isId ? "Layar sebelumnya" : "Previous screen"}><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => move(1)} aria-label={isId ? "Layar berikutnya" : "Next screen"}><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className={styles.selectors} role="group" aria-label={isId ? "Pilih layar aplikasi" : "Choose an app screen"}>
              {screens.map((item, index) => <button key={item.src} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item[lang]}</button>)}
            </div>
          </div>
        </article>
    
      </div>
    </section>
  );
}
