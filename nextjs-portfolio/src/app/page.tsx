import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubGraph from "@/components/GitHubGraph";
import Contact from "@/components/Contact";
import CursorSpotlight from "@/components/CursorSpotlight";
import MobileNav from "@/components/MobileNav";
import ShareButton from "@/components/ShareButton";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import PageLoader from "@/components/PageLoader";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      {/* Page Load Animation */}
      <PageLoader />

      {/* Fixed elements outside main flow */}
      <ParticleBackground />
      <CursorSpotlight />
      <SocialLinks />
      <Navbar />
      <MobileNav />
      <ShareButton />
      <BackToTop />
      <KeyboardShortcuts />

      {/* Main scrollable content */}
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <GitHubGraph />
        <Contact />
      </main>
    </>
  );
}
