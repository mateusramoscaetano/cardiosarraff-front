"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/_app/ui/card";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { Stethoscope, Activity, HeartPulse, Clock, Gauge, ChevronDown } from "lucide-react";

const servicos = [
  {
    icon: Stethoscope,
    title: "Consultas Cardiológicas",
    description: "O diagnóstico correto e a terapêutica adequada para seu pet podem ser realizados a partir de consultas com nossos cardiologistas especializados em conjunto de exames complementares. Animais com idade avançada devem realizar acompanhamento anual já que são mais susceptíveis a doenças cardíacas e o diagnóstico precoce pode oferecer maior qualidade de vida.",
  },
  {
    icon: HeartPulse,
    title: "Ecocardiografia",
    description: "O ecocardiograma é a ultrassonografia do coração e traz informações sobre sua estrutura interna, aspecto das válvulas, tamanho das câmaras cardíacas, espessura do músculo cardíaco, análise do fluxo sanguíneo, bem como análise da função sistólica e diastólica. Permite a identificação de doenças cardíacas congênitas ou adquiridas, efusões pleurais e pericárdicas, tumores e alterações decorrentes da hipertensão pulmonar.",
  },
  {
    icon: Activity,
    title: "Eletrocardiograma",
    description: "O eletrocardiograma é um exame que avalia a função elétrica do coração, que identifica a frequência cardíaca, o ritmo cardíaco e a presença de arritmias. Pode ser solicitado como parte da avaliação pré-anestésica, controle anual de saúde, ou como exame complementar nos pacientes cardiopatas.",
  },
  {
    icon: Clock,
    title: "Holter 24H",
    description: "Assim como o eletrocardiograma, o holter é um exame que avalia a função elétrica do coração, no entanto, avalia o ritmo no período de 24 horas. Dessa forma, arritmias que não são detectadas no traçado realizado no consultório, podem ser identificadas em durante outras atividades do animal (durante o sono, exercícios,...) durante o dia e a noite.",
  },
  {
    icon: Gauge,
    title: "Pressão Arterial",
    description: "A avaliação não invasiva da pressão arterial sistêmica, realizada a partir do aparelho Doppler ou método oscilométrico, é importante para identificar pacientes hipotensos ou hipertensos. Cães e gatos podem ser hipertensos devido a doenças renais ou endócrinas e, de forma secundária, poderá causar lesão em órgãos-alvo como o coração.",
  },
];

export function Servicos() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="servicos" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Conheça nossos serviços"
          description="Somos especialistas em Cardiologia Veterinária. Conheça abaixo um pouco de nossos serviços."
        />
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="space-y-3 md:space-y-4">
            {servicos.map((servico, index) => {
              const isOpen = openIndex === index;
              const IconComponent = servico.icon;

              return (
                <Card
                  key={index}
                  className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl group overflow-hidden cursor-pointer"
                  onClick={() => toggleCard(index)}
                >
                  <CardHeader className="pb-2 px-4 md:px-6 pt-3 md:pt-4">
                    <div className="flex items-center justify-between gap-3 md:gap-4">
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                          <div className="p-2 md:p-3 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                        <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#5C4373] transition-colors duration-300">
                          {servico.title}
                        </CardTitle>
                      </div>
                      <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0">
                        <ChevronDown
                          className={`h-5 w-5 md:h-6 md:w-6 text-[#5C4373] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <CardContent className="pt-0 pb-3 px-4 md:px-6 pl-[72px] md:pl-[88px]">
                      <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{servico.description}</p>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] hidden lg:block">
            <Image
              src="/bannerservicos.png"
              alt="Serviços Cardio Sarraff"
              fill
              className="object-contain hover:scale-105 transition-transform duration-500 rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}