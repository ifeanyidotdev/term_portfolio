
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import BioRewriterSection from '@/components/BioRewriterSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-2 md:px-8 md:py-4">
      <div className="w-full max-w-5xl mx-auto"> {/* Increased max-width for better content layout */}
        <Header />
        <main className="space-y-16 md:space-y-24 mt-8">
          <AboutSection />
          <ProjectsSection />
          <BioRewriterSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
