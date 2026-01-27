"use client";

import Image from "next/image";
import { Button } from "@/components/_app/ui/button";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function PortalExames() {
  const router = useRouter();

  return (
    <section id="portal-exames" className="relative pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12 bg-gradient-to-br from-[#5C4373] to-[#6B4F7F] overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] -mt-16 sm:-mt-24 md:-mt-32 overflow-visible order-2 lg:order-1">
            <Image
              src="/catdogat2.webp"
              alt="Portal de Exames"
              fill
              className="object-contain object-left-bottom rounded-xl scale-110 sm:scale-125 md:scale-150 origin-left-bottom"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-6 relative z-10 justify-center py-4 md:py-8 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Portal de Exames
            </h2>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              Ter acesso aos seus laudos nunca foi tão fácil! Clique no botão abaixo e baixe os exames do seu Pet com a facilidade que só a Cardio Sarraff te oferece.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="w-full lg:w-auto text-sm md:text-base"
              onClick={() => router.push('/exam-portal')}
            >
              Portal de Exames
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}