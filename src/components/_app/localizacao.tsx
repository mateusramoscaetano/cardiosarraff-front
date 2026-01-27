"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/_app/ui/card";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { Button } from "@/components/_app/ui/button";
import { MapPin, Truck } from "lucide-react";
import Link from "next/link";

const localizacoes = [
  {
    nome: "CLINIVET - Boa Vista",
    endereco: "R. Holanda, 894 - Boa Vista, Curitiba - PR, 82540-040",
    telefone: "(41) 3257-4326",
    mapLink: "https://www.google.com/maps/place/R.+Holanda,+894+-+Boa+Vista,+Curitiba+-+PR,+82540-040",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.2!3d-25.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce8b8b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2sR.%20Holanda%2C%20894%20-%20Boa%20Vista%2C%20Curitiba%20-%20PR%2C%2082540-040!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr",
  },
];

export function Localizacao() {
  return (
    <section id="localizacao" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nossa Localização"
          description="Estamos localizados no melhor lugar para atendê-lo"
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {localizacoes.map((local, index) => (
            <Card
              key={index}
              className="border-2 border-[#5C4373] hover:border-[#4A3560] transition-all duration-300 hover:shadow-xl overflow-hidden group w-full bg-white"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden mb-4 md:mb-6">
                <iframe
                  src={local.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-transform duration-500 group-hover:scale-105"
                ></iframe>
              </div>
              <CardHeader className="pt-0 px-4 md:px-6">
                <CardTitle className="flex items-center text-[#5C4373] group-hover:text-[#4A3560] transition-colors duration-300 text-lg md:text-xl">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  {local.nome}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-sm md:text-base text-gray-600 mb-2">{local.endereco}</p>
                <p className="text-[#5C4373] font-semibold mb-3 md:mb-4 text-base md:text-lg">{local.telefone}</p>
                <a
                  href={local.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C4373] hover:text-[#4A3560] text-xs md:text-sm font-semibold transition-colors duration-300 inline-flex items-center gap-1"
                >
                  Ver no Google Maps
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
          <Card className="border-2 border-[#5C4373] hover:border-[#4A3560] transition-all duration-300 hover:shadow-2xl overflow-hidden group w-full flex flex-col items-center justify-center relative bg-white hover:scale-[1.02] min-h-[400px] md:min-h-[500px]">
            <div className="flex flex-col items-center justify-center text-center w-full p-4 md:p-6">
              <div className="flex items-center justify-center mb-4 md:mb-6">
                <div className="p-4 md:p-6 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300 group-hover:scale-110">
                  <Truck className="h-8 w-8 md:h-12 md:w-12 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-[#5C4373] text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Atendimento Volante
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 text-lg md:text-xl font-medium leading-relaxed px-4">
                Nós vamos até você!
              </p>
              <Link
                href="https://wa.me/5541991910080"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs mx-auto"
              >
                <Button variant="primary" className="w-full text-base md:text-lg py-4 md:py-6 font-bold shadow-lg hover:shadow-xl">
                  Marque sua Consulta
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}