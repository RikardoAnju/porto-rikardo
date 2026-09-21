/**
 * Daftar project. INI CONTOH, ganti dengan project asli Anda.
 * type: "Web" atau "Mobile" (tampil sebagai label di kartu).
 * description: isi kedua bahasa (id = Indonesia, en = English).
 * link: URL demo/GitHub, kosongkan ("") kalau belum ada.
 */
export type Project = {
  title: string;
  type: "Web" | "Mobile";
  description: { id: string; en: string };
  tech: string[];
  link: string;
};

const placeholderWeb = {
  id: "Tulis satu-dua kalimat: apa project ini dan apa peran Anda.",
  en: "Write one or two sentences: what this project is and what your role was.",
};
const placeholderMobile = {
  id: "Tulis satu-dua kalimat: apa aplikasi ini dan apa peran Anda.",
  en: "Write one or two sentences: what this app is and what your role was.",
};

export const projects: Project[] = [
  {
    title: "Nama Project Web 1",
    type: "Web",
    description: placeholderWeb,
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "",
  },
  {
    title: "Nama Project Web 2",
    type: "Web",
    description: placeholderWeb,
    tech: ["Laravel", "PHP", "MySQL"],
    link: "",
  },
  {
    title: "Nama Aplikasi Mobile 1",
    type: "Mobile",
    description: placeholderMobile,
    tech: ["Flutter", "Dart", "Firebase"],
    link: "",
  },
  {
    title: "Nama Aplikasi Mobile 2",
    type: "Mobile",
    description: placeholderMobile,
    tech: ["Flutter", "Supabase"],
    link: "",
  },
];
