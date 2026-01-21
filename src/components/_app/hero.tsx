"use client";

import Image from "next/image";
import { Button } from "@/components/_app/ui/button";
import { Heart, Calendar } from "lucide-react";

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5C4373] via-[#6B4F7F] to-[#5C4373] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/galeria/galeria01.jpg')] bg-cover bg-center opacity-10"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#5C4373]/90 to-[#5C4373]/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="transition-all duration-1000 opacity-100 translate-y-0 animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="relative w-64 h-32 md:w-80 md:h-40 transition-transform duration-300 hover:scale-105">
              <Image
                src="/logohorizontalbranca.svg"
                alt="Cardio Sarraff"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Excelência em
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              Cardiologia Veterinária
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Consultas e exames com o carinho que o seu Pet merece!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#5C4373] hover:bg-white hover:text-[#5C4373] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Consulta
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#5C4373] hover:scale-105 transition-all duration-300"
            >
              <Heart className="mr-2 h-5 w-5" />
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}