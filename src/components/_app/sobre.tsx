"use client";

import { Heart, Target, Award, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/_app/ui/card";
import { SectionTitle } from "@/components/_app/ui/section-title";

export function Sobre() {
  const stats = [
    {
      icon: Users,
      number: "Milhares",
      label: "Corações Examinados",
      color: "text-[#5C4373]",
    },
    {
      icon: Heart,
      label: "Atendimento para Cães e Gatos",
      color: "text-[#5C4373]",
    },
    {
      icon: Star,
      number: "5",
      label: "Atendimento 5 Estrelas",
      color: "text-[#5C4373]",
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Sobre"
          title="Sobre a Cardio Sarraff"
        />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-colors duration-300">
                  <Target className="h-8 w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Sabemos a importância que os pets têm em nossas vidas, por isso visamos atendê-los com excelência, dedicação, empatia e amor, proporcionando conforto e prestando assistência e acolhimento às suas famílias.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-colors duration-300">
                  <Heart className="h-8 w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Nossa missão é oferecer bem-estar e conforto aos pacientes por nós atendidos de forma qualificada, esclarecendo todas as dúvidas de seus tutores quanto ao diagnóstico e oferecer os melhores tratamentos, visando aumentar a sobrevida e a qualidade de vida.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-colors duration-300">
                  <Award className="h-8 w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
              <p className="text-gray-600 leading-relaxed">
                Honestidade, respeito e competência para com nossos pacientes, responsabilidade com nossos clientes e amigos, valorização de nossos parceiros e colaboradores são princípios que prezamos na Cardio Sarraff.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-[#5C4373]/10 text-[#5C4373] px-6 py-3 rounded-full border-2 border-[#5C4373]/20 hover:bg-[#5C4373] hover:text-white transition-all duration-300 group"
            >
              <stat.icon className="h-5 w-5" />
              {stat.number && (
                <span className="font-bold">{stat.number}</span>
              )}
              <span className="font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}