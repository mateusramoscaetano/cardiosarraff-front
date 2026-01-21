"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/_app/ui/card";
import { SectionTitle } from "@/components/_app/ui/section-title";

const equipe = [
  {
    nome: "Ana Sarraff",
    foto: "/fotoana.png",
    descricao: "Foi professora do curso de Medicina Veterinária da PUCPR durante 21 anos. Possui título de Especialista em Cardiologia Veterinária pela SBCV. É pioneira em Ecocardiografia Veterinária no Paraná, com formação pela UFPR, Residência em Clínica Médica e Cirúrgica de Animais de Companhia pela UEL, Mestrado em Ciências Veterinárias na USP e Doutorado em Ciências Veterinárias pela PUCPR.",
  },
  {
    nome: "Dra. Marcela Wolf",
    foto: "/fotomarcela.png",
    descricao: "A Dra. Marcela é formada pela PUCMG, possui Residência em Clínica Médica e Cirúrgica pelo Centro Universitário de Jaguariaúna, Especialização em Clínica Médica de Animais de Companhia pela Equalis, Especialização em Cardiologia Veterinária pela Anclivepa SP, Mestrado e Doutorado em Ciências Veterinárias pela UFPR. Possui título de Especialista em Cardiologia Veterinária pela SBCV.",
  },
];

export function Equipe() {
  return (
    <section id="equipe" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Equipe"
          title="Nossos veterinários"
          description="Uma equipe apaixonada pela medicina veterinária, pronta para oferecer o melhor atendimento."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {equipe.map((membro, index) => (
            <Card
              key={index}
              className="!bg-[#5C4373] border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group rounded-2xl flex flex-col p-0"
            >
              <div className="relative h-64 overflow-hidden rounded-t-2xl mb-6">
                <Image
                  src={membro.foto}
                  alt={membro.nome}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="!bg-[#5C4373] p-6 pt-0 flex-grow flex flex-col">
                <h3 className="text-white font-bold text-lg mb-3 leading-tight">
                  {membro.nome}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed flex-grow">
                  {membro.descricao}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}