/**
 * Semua teks halaman dalam 2 bahasa (Indonesia & English).
 * Ubah/tambah teks di sini. Jumlah item di array harus SAMA di kedua bahasa.
 */
import {
  Database,
  Globe,
  Heart,
  Lightbulb,
  Server,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Lang = "id" | "en";

// ---------- Tidak perlu diterjemahkan ----------

// Pill kanan atas: teknologi yang dipakai, berganti satu per satu.
// short = singkatan di lingkaran, color = warna lingkaran, text = warna huruf.
export const techs = [
  { name: "JavaScript", short: "JS", color: "bg-yellow-400", text: "text-slate-900" },
  { name: "Flutter", short: "Fl", color: "bg-sky-500", text: "text-white" },
  { name: "Next.js", short: "Nx", color: "bg-slate-900", text: "text-white" },
  { name: "Laravel", short: "La", color: "bg-red-500", text: "text-white" },
  { name: "JWT Authentication", short: "JW", color: "bg-fuchsia-600", text: "text-white" },
  { name: "Git & GitHub", short: "Gh", color: "bg-slate-700", text: "text-white" },
  { name: "Postman", short: "Pm", color: "bg-orange-500", text: "text-white" },
  { name: "Supabase", short: "Sb", color: "bg-emerald-500", text: "text-white" },
  { name: "Firebase", short: "Fb", color: "bg-amber-500", text: "text-white" },
  { name: "TypeScript", short: "TS", color: "bg-blue-600", text: "text-white" },
  { name: "Dart", short: "Dt", color: "bg-cyan-600", text: "text-white" },
  { name: "PHP", short: "Ph", color: "bg-indigo-500", text: "text-white" },
  { name: "MySQL", short: "My", color: "bg-sky-700", text: "text-white" },
  { name: "Golang", short: "Go", color: "bg-cyan-500", text: "text-white" },
  { name: "REST API", short: "API", color: "bg-violet-600", text: "text-white" },
];

const focusIcons: LucideIcon[] = [Globe, Smartphone, Server, Database];
const valueIcons: LucideIcon[] = [Lightbulb, Users, Sparkles, Heart];

const zipIcons = <T extends object>(icons: LucideIcon[], items: T[]) =>
  items.map((item, i) => ({ icon: icons[i], ...item }));

// ---------- Teks per bahasa ----------

const id = {
  nav: { home: "Home", projects: "Projects", contact: "Contact", menu: "Buka menu" },
  language: { label: "Bahasa", id: "Indonesia", en: "English" },
  hero: {
    badge: "Selamat datang di portfolio saya",
    intro:
      "Saya adalah seorang pengembang perangkat lunak yang memiliki minat besar dalam bidang teknologi informasi, khususnya pengembangan web, mobile, dan backend. Aktif mengembangkan berbagai aplikasi digital menggunakan teknologi modern serta memiliki pengalaman dalam membangun prototype, API, dan aplikasi berbasis kebutuhan pengguna. Selalu tertarik untuk belajar teknologi baru dan menghasilkan solusi yang bermanfaat.",
    // Kata yang berganti di judul ("Hi, I'm Rikardo ...")
    roles: ["Web Developer", "Mobile Developer", "Backend Developer", "Fullstack Developer"],
    ctaProjects: "Lihat Project",
    ctaContact: "Hubungi Saya",
    emailAria: "Kirim email",
  },
  // Kartu kiri: bidang yang ditekuni, berganti.
  focusAreas: zipIcons(focusIcons, [
    { title: "Pengembangan Web", desc: "Aplikasi web modern" },
    { title: "Pengembangan Mobile", desc: "Aplikasi Android & iOS" },
    { title: "Backend & API", desc: "REST API dan autentikasi" },
    { title: "Database", desc: "MySQL dan layanan cloud" },
  ]),
  // Kartu kanan tengah: nilai/cara kerja, berganti.
  values: zipIcons(valueIcons, [
    { text: "Membangun Prototype" },
    { text: "Berbasis Kebutuhan Pengguna" },
    { text: "Teknologi Modern" },
    { text: "Solusi yang Bermanfaat" },
  ]),
  projects: {
    title: "Project Saya",
    subtitle: "Beberapa project web dan aplikasi mobile yang pernah saya kerjakan.",
    view: "Lihat Project",
  },
  contact: {
    title: "Mari Terhubung",
    text: "Tertarik berkolaborasi, punya pertanyaan, atau sekadar ingin menyapa? Kirim pesan kapan saja, saya senang berdiskusi.",
    email: "Kirim Email",
    cv: "Unduh CV",
  },
  footer: "Dibuat dengan Next.js dan Tailwind CSS.",
};

const en: typeof id = {
  nav: { home: "Home", projects: "Projects", contact: "Contact", menu: "Open menu" },
  language: { label: "Language", id: "Indonesia", en: "English" },
  hero: {
    badge: "Welcome to my portfolio",
    intro:
      "I am a software developer with a strong interest in information technology, especially web, mobile, and backend development. I actively build digital applications with modern technologies and have experience creating prototypes, APIs, and applications based on user needs. I am always eager to learn new technologies and deliver useful solutions.",
    roles: ["Web Developer", "Mobile Developer", "Backend Developer", "Fullstack Developer"],
    ctaProjects: "View Projects",
    ctaContact: "Contact Me",
    emailAria: "Send email",
  },
  focusAreas: zipIcons(focusIcons, [
    { title: "Web Development", desc: "Modern web applications" },
    { title: "Mobile Development", desc: "Android & iOS apps" },
    { title: "Backend & API", desc: "REST API and authentication" },
    { title: "Database", desc: "MySQL and cloud services" },
  ]),
  values: zipIcons(valueIcons, [
    { text: "Building Prototypes" },
    { text: "Based on User Needs" },
    { text: "Modern Technology" },
    { text: "Useful Solutions" },
  ]),
  projects: {
    title: "My Projects",
    subtitle: "A few web and mobile projects I have worked on.",
    view: "View Project",
  },
  contact: {
    title: "Let's Connect",
    text: "Interested in collaborating, have a question, or just want to say hi? Send a message anytime, I'd be happy to talk.",
    email: "Send Email",
    cv: "Download CV",
  },
  footer: "Built with Next.js and Tailwind CSS.",
};

export const content: Record<Lang, typeof id> = { id, en };
