"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#5C4373] via-[#6B4F7F] to-[#5C4373] text-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <div className="mb-4 md:mb-6 flex justify-center sm:justify-start">
              <div className="relative w-40 sm:w-48 md:w-56 h-16 sm:h-20 md:h-24">
                <Image
                  src="/logohorizontalbranca.svg"
                  alt="Cardio Sarraff"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6 leading-relaxed">
              Excelência em Cardiologia Veterinária. Consultas e exames com o carinho que o seu Pet merece!
            </p>
            <div className="flex gap-3 md:gap-4 justify-center sm:justify-start">
              <Link
                href="https://www.facebook.com/cardiologiasarraff"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/cardiosarraff/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a
                  href="#sobre"
                  className="text-sm md:text-base lg:text-lg text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-sm md:text-base lg:text-lg text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#equipe"
                  className="text-sm md:text-base lg:text-lg text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Nossa Equipe
                </a>
              </li>
              <li>
                <a
                  href="#localizacao"
                  className="text-sm md:text-base lg:text-lg text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Localização
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-sm md:text-base lg:text-lg text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">Contato</h3>
            <ul className="space-y-3 md:space-y-4 text-white/80">
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white text-base md:text-lg">CLINIVET</span>
                <a href="tel:+554132574326" className="text-base md:text-lg hover:text-white transition-colors duration-300">
                  (41) 3257-4326
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white text-base md:text-lg">Domiciliar/Volante</span>
                <a href="tel:+5541991910080" className="text-base md:text-lg hover:text-white transition-colors duration-300">
                  (41) 99191-0080
                </a>
              </li>
              <li className="flex flex-col gap-1 mt-4 md:mt-6">
                <span className="font-semibold text-white text-base md:text-lg">Email</span>
                <a href="mailto:contato@cardiosarraff.com.br" className="text-sm md:text-base lg:text-lg hover:text-white transition-colors duration-300 break-all">
                  contato@cardiosarraff.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 md:pt-8 mt-8 md:mt-12 text-center">
          <p className="text-white/80 flex items-center justify-center gap-2 mb-2 md:mb-3 text-sm md:text-base lg:text-lg">
            Feito com <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-400" /> para os pets
          </p>
          <p className="text-white/60 text-xs md:text-sm lg:text-base">
            © {new Date().getFullYear()} Cardio Sarraff. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}