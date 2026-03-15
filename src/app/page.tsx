"use client";

import { Navbar, Hero, Footer } from "@/components/layout";
import { Gallery } from "@/components/gallery";
import { AboutSection } from "@/components/about";
import { ContactBanner } from "@/components/contact";
import { ExhibitionsSection } from "@/components/career";
import { SectionDivider } from "@/components/shared";
import { globalStyles } from "@/styles";

export default function Home() {
  return (
    <>
      <style>{globalStyles}</style>
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
