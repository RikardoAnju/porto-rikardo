import Loader from "@/src/components/Loader";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Sections from "@/src/components/Sections";
import { LanguageProvider } from "@/src/components/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 font-sans dark:from-slate-950 dark:to-indigo-950">
        <Loader />
        <Navbar />

        <Hero />

        <Sections />
      </div>
    </LanguageProvider>
  );
}
