"use client";

import Image from "next/image";
import { SectionTitle } from "@/components/_app/ui/section-title";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const equipe = [
  {
    nome: "Dra. Ana Paula Sarraff",
    foto: "/draana.jpg",
    descricao: "A Dra. Ana é pioneira em Ecocardiografia Veterinária no Paraná. Formada pela UFPR, possui Residência em Clínica Médica e Cirúrgica de Animais de Companhia pela UEL, Mestrado em Ciências Veterinárias na USP e Doutorado em Ciências Veterinárias pela PUCPR. Foi professora do curso de Medicina Veterinária da PUCPR durante 21 anos. Possui título de Especialista em Cardiologia Veterinária pela SBCV.",
  },
  {
    nome: "Dra. Marcela Wolf",
    foto: "/marcelaat.jpeg",
    descricao: "A Dra. Marcela é formada pela PUCMG, possui Residência em Clínica Médica e Cirúrgica pelo Centro Universitário de Jaguariaúna, Especialização em Clínica Médica de Animais de Companhia pela Equalis, Especialização em Cardiologia Veterinária pela Anclivepa SP, Mestrado e Doutorado em Ciências Veterinárias pela UFPR. Possui título de Especialista em Cardiologia Veterinária pela SBCV.",
  },
  {
    nome: "Dra. Isabella Ferro Pascual Parames",
    foto: "/isab.jpg",
    descricao: "A Dra. Isabella é formada pela PUCPR, possui pós-graduação em Clínica Médica de Pequenos Animais pela PUCPR, Capacitação em Ecocardiograma em Cães e Gatos pelo Instituto Naya-SP e Especialização em Cardiologia Veterinária pela Anclivepa-SP.",
  },
  {
    nome: "Dra. Bruna Natali",
    foto: "/bruna.png",
    descricao: "A Dra. Bruna é formada pela UFPR, possui Residência multiprofissional em saúde em Clínica Médica de Pequenos Animais e Mestrado em Ciências Veterinárias pela UFPR. Atualmente é segunda diretora internacional da Sociedade Brasileira de Cardiologia Veterinária.",
  },
  {
    nome: "Dr. Matheus Klaumann",
    foto: "/matheus.jpg",
    descricao: "O Dr. Matheus é formado pela UTP. Possui Aprimoramento em Clínica Médica de Pequenos Animais pela PUCPR. Realiza Especialização em Cardiologia de Cães e Gatos pela ANCLIVEPA-SP e Mestrado com ênfase em Cardiologia Veterinária pela UFPR.",
  },
];

export function Equipe() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="equipe" className="py-12 sm:py-16 md:py-20 bg-white overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <SectionTitle
          title="Nossos veterinários"
          description="Uma equipe apaixonada pela medicina veterinária, pronta para oferecer o melhor atendimento."
        />
        <div className="relative max-w-6xl mx-auto mt-8 sm:mt-12 py-8 sm:py-12 overflow-visible">
          <div className="embla__viewport overflow-visible" ref={emblaRef} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className="embla__container flex">
              {equipe.map((membro, index) => (
                <div
                  key={index}
                  className="embla__slide min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 sm:px-3"
                  style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group h-full flex flex-col">
                    <div className="relative h-96 sm:h-80 md:h-96 w-full flex-shrink-0">
                      <Image
                        src={membro.foto}
                        alt={membro.nome}
                        fill
                        className={membro.nome === "Dr. Matheus Klaumann" ? "object-cover" : "object-cover object-center"}
                        style={membro.nome === "Dr. Matheus Klaumann" ? { objectPosition: "center 85%" } : undefined}
                      />
                    </div>
                    <div className="relative flex-1 bg-gradient-to-b from-[#5C4373]/95 via-[#5C4373] to-[#5C4373] p-4 sm:p-6 flex flex-col">
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3 leading-tight">
                        {membro.nome}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed flex-grow">
                        {membro.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-[#5C4373] transition-all duration-300 z-10 border-2 border-[#5C4373] group hidden sm:flex"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-[#5C4373] transition-all duration-300 z-10 border-2 border-[#5C4373] group hidden sm:flex"
            aria-label="Próximo slide"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
          </button>

          <div className="flex justify-center gap-4 mt-6 sm:hidden">
            <button
              onClick={scrollPrev}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-[#5C4373] transition-all duration-300 border-2 border-[#5C4373] group"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} className="text-[#5C4373] group-hover:text-white transition-colors duration-300" />
            </button>
            <button
              onClick={scrollNext}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-[#5C4373] transition-all duration-300 border-2 border-[#5C4373] group"
              aria-label="Próximo slide"
            >
              <ChevronRight size={24} className="text-[#5C4373] group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}