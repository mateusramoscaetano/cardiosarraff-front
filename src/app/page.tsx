"use client";

import { AboutUs } from "@/components/_app/about-us";
import { ContactSection } from "@/components/_app/contact-section";
import { ExamCtaSection } from "@/components/_app/exam-cta-section";
import { FacilityGallery } from "@/components/_app/facility-gallery";
import { Footer } from "@/components/_app/footer";
import { GoogleReviews } from "@/components/_app/google-reviews";
import { HeadBanner } from "@/components/_app/head-banner";
import { Header } from "@/components/_app/header";
import { HeroSection } from "@/components/_app/hero-section";
import { LogoBanner } from "@/components/_app/logo-banner";
import { Products } from "@/components/_app/products";
import { ToDoctors } from "@/components/_app/to-doctors";
import { WhatsAppButton } from "@/components/_app/whatsapp-button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white font-productSans relative overflow-x-hidden">
      <Image
        src="/Decore.png"
        alt="bg_home"
        width={766}
        height={1000}
        className="absolute top-0 -right-48 w-[405px] h-auto md:w-[580px] lg:w-[766px] xl:w-[850px] 2xl:w-[950px] xl:h-auto"
      />

      <Header />

      <HeroSection />
      <AboutUs />

      <Products />

      <ExamCtaSection />
      <LogoBanner />
      <ToDoctors />
      <ContactSection />
      <Footer />

      {/* Botão de WhatsApp flutuante */}
      <WhatsAppButton />
    </main>
  );
}
