"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { SectionTitle } from "@/components/_app/ui/section-title";

const imagens = [
  "/galeria/galeria01.jpg",
  "/galeria/galeria02.jpg",
  "/galeria/galeria03.jpg",
  "/galeria/galeria04.jpg",
  "/galeria/galeria05.jpg",
  "/galeria/galeria06.jpg",
];

export function Galeria() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="galeria" className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Galeria"
          title="Galeria de Fotos"
          description="Conheça um pouco do nosso ambiente e estrutura"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagens.map((imagem, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedImage(imagem)}
            >
              <Image
                src={imagem}
                alt={`Galeria ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#5C4373]/0 group-hover:bg-[#5C4373]/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#5C4373] transition-colors duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Imagem ampliada"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}