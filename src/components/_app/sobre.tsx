"use client";

import { Heart, Target, Award, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/_app/ui/card";
import { SectionTitle } from "@/components/_app/ui/section-title";
import Image from "next/image";

export function Sobre() {
  const stats = [
    {
      icon: Users,
      label: "Milhares de Corações Examinados",
      color: "text-[#5C4373]",
    },
    {
      icon: Heart,
      label: "Atendimento para Cães e Gatos",
      color: "text-[#5C4373]",
    },
    {
      icon: Star,
      label: "Atendimento 5 Estrelas",
      color: "text-[#5C4373]",
    },
  ];

  return (
    <section id="sobre" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-purple-50 relative">
      <div className="absolute top-1/2 left-0 right-0 w-screen -translate-y-1/2 pointer-events-none hidden md:block" style={{ marginLeft: 'calc(-50vw + 50%)', zIndex: 1 }}>
        <img
          src="/wave.svg"
          alt=""
          className="w-full h-auto opacity-100"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
        <SectionTitle
          title="Sobre a Cardio Sarraff"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 relative" style={{ zIndex: 10 }}>
          <Card className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group rounded-xl relative z-10">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-colors duration-300">
                  <Target className="h-6 w-6 md:h-8 md:w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Nossa Visão</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Sabemos a importância que os pets têm em nossas vidas, por isso visamos atendê-los com excelência, dedicação, empatia e amor, proporcionando conforto e prestando assistência e acolhimento às suas famílias.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group rounded-xl relative z-10">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-colors duration-300">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Nossa Missão</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Nossa missão é oferecer bem-estar e conforto aos pacientes por nós atendidos de forma qualificada, esclarecendo todas as dúvidas de seus tutores quanto ao diagnóstico e oferecer os melhores tratamentos, visando aumentar a sobrevida e a qualidade de vida.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group rounded-xl relative z-10 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-colors duration-300">
                  <Award className="h-6 w-6 md:h-8 md:w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Nossos Valores</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Honestidade, respeito e competência para com nossos pacientes, responsabilidade com nossos clientes e amigos, valorização de nossos parceiros e colaboradores são princípios que prezamos na Cardio Sarraff.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-[#5C4373]/10 text-[#5C4373] px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-[#5C4373]/20 hover:bg-[#5C4373] hover:text-white transition-all duration-300 group text-sm md:text-base w-full sm:w-auto min-w-[280px] sm:min-w-[300px] md:min-w-[320px] justify-center"
            >
              <stat.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="font-semibold whitespace-nowrap">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}