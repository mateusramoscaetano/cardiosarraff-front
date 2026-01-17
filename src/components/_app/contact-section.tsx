"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "554130810360";
    const message = "Olá! Gostaria de saber mais sobre os serviços da Exavet.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneClick = () => {
    window.open("tel:+554130810360", "_self");
  };

  const handleMapsClick = () => {
    const address =
      "R. Voluntários da Pátria, 1393, Centro, São José dos Pinhais - PR";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div id="contact" className="relative w-full mx-auto px-4 text-primary">
      <div className="bg-white w-full rounded-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 px-8 py-16 h-full w-full">
          {/* Coluna Esquerda - Informações */}
          <div className="text-primary lg:w-1/2 max-w-[469px] flex justify-start min-h-[400px] lg:min-h-[600px] font-volkhov flex-col">
            <div className="flex flex-col items-start">
              <h2 className="text-3xl lg:text-5xl mb-6 leading-tight font-volkhov font-semibold">
                Fale com a gente!
              </h2>
              <span className="text-lg mb-4 leading-relaxed font-productSans text-primary">
                Estamos prontos para atender seu pet da melhor maneira!
              </span>

              <div className="space-y-4 mb-8 font-productSans leading-relaxed text-lg text-primary">
                <div className="flex items-center gap-3">
                  <Phone />
                  <button
                    onClick={handlePhoneClick}
                    className="text-lg text-primary hover:text-exa-pink transition-colors duration-300 cursor-pointer"
                  >
                    (41) 3081-0360
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <Mail />
                  <a
                    href="mailto:contato@exavet.com.br"
                    className="text-lg text-primary hover:text-exa-pink transition-colors duration-300"
                  >
                    contato@exavet.com.br
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin />
                  <button
                    onClick={handleMapsClick}
                    className="text-lg text-primary hover:text-exa-pink transition-colors duration-300 cursor-pointer text-left"
                  >
                    R. Voluntários da Pátria, 1393 <br />
                    Centro | São José dos Pinhais
                  </button>
                </div>
              </div>

              {/* Botão CTA para WhatsApp */}
              <Button
                onClick={handleWhatsAppClick}
                className="bg-primary text-base hover:bg-primary/90 text-white font-productSans min-w-[172px] h-[40px] md:h-[50px] lg:h-[60px] transition-colors duration-300"
              >
                Fale conosco via WhatsApp
              </Button>
            </div>
          </div>

          {/* Coluna Direita - Mapa integrado */}
          <div className="lg:w-1/2 max-w-[540px] w-full">
            <div className="space-y-4">
              <h3 className="text-2xl font-volkhov font-bold text-primary text-center lg:text-left">
                Nossa Localização
              </h3>

              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.13793852593!2d-49.26471732508789!3d-25.42800548378352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce512f9628cc1%3A0x1c5ccd29c1a1b777!2sR.%20Volunt%C3%A1rios%20da%20P%C3%A1tria%2C%201393%20-%20Centro%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Pinhais%20-%20PR%2C%2083015-000!5e0!3m2!1spt-BR!2sbr!4v1722890100000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Exavet"
                ></iframe>
              </div>

              <div className="text-center lg:text-left">
                <Button
                  onClick={handleMapsClick}
                  variant="ghost"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Ver no Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
