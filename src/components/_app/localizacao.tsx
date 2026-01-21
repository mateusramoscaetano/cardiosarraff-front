"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/_app/ui/card";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { MapPin } from "lucide-react";

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
    <section id="localizacao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Localização"
          title="Nossa Localização"
          description="Estamos localizados no melhor lugar para atendê-lo"
        />

        <div className="max-w-4xl mx-auto">
          {localizacoes.map((local, index) => (
            <Card
              key={index}
              className="border-2 border-transparent hover:border-[#5C4373] transition-all duration-300 hover:shadow-xl overflow-hidden group w-full"
            >
              <div className="relative h-80 overflow-hidden mb-6">
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
              <CardHeader className="pt-0">
                <CardTitle className="flex items-center text-[#5C4373] group-hover:text-[#4A3560] transition-colors duration-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  {local.nome}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{local.endereco}</p>
                <p className="text-[#5C4373] font-semibold mb-4">{local.telefone}</p>
                <a
                  href={local.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C4373] hover:text-[#4A3560] text-sm font-semibold transition-colors duration-300 inline-flex items-center gap-1"
                >
                  Ver no Google Maps
                  <MapPin className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}