"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FacilityGallery() {
  // Array de fotos da instalação (substitua pelos caminhos reais das imagens)
  const facilityPhotos = [
    {
      src: "/clinic-icon.png", // Substitua pela foto real da recepção
      alt: "Recepção da Exavet",
      title: "Recepção",
    },
    {
      src: "/doctor-icon.png", // Substitua pela foto real da sala de exames
      alt: "Sala de Exames",
      title: "Sala de Exames",
    },
    {
      src: "/clinic-icon.png", // Substitua pela foto real do equipamento
      alt: "Equipamentos Modernos",
      title: "Equipamentos",
    },
    {
      src: "/doctor-icon.png", // Substitua pela foto real da área de espera
      alt: "Área de Espera",
      title: "Área de Espera",
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-16 bg-exa-pink/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-5xl font-volkhov font-bold text-primary mb-4">
          Nossas Instalações
        </h2>
        <p className="text-lg text-primary/80 max-w-2xl mx-auto">
          Conheça o ambiente moderno e acolhedor onde cuidamos do seu pet com
          excelência
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilityPhotos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-primary group-hover:text-exa-pink transition-colors duration-300">
                  {photo.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA para agendar visita */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <div className=" rounded-2xl p-8 ">
          <h3 className="text-2xl font-volkhov font-bold text-primary mb-4">
            Quer conhecer pessoalmente?
          </h3>
          <p className="text-lg text-primary/80 mb-6 max-w-2xl mx-auto">
            Agende uma visita às nossas instalações e veja de perto como
            cuidamos do seu pet
          </p>
          <button
            onClick={() => {
              const phoneNumber = "554130810360";
              const message =
                "Olá! Gostaria de agendar uma visita às instalações da Exavet.";
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
              )}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="bg-exa-pink hover:bg-exa-pink/90 text-primary font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Agendar Visita
          </button>
        </div>
      </motion.div>
    </div>
  );
}
