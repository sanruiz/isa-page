import { Navbar, Hero, Footer } from "@/components/layout";
import { Gallery } from "@/components/gallery";
import { AboutSection } from "@/components/about";
import { ContactBanner } from "@/components/contact";
import { ExhibitionsSection } from "@/components/career";
import { SectionDivider } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionDivider label="Selected Works" number="01" />
      <Gallery />
      <AboutSection />
      <ExhibitionsSection />
      <ContactBanner />
      <Footer />
    </>
  );
}
