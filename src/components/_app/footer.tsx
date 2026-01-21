"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#5C4373] via-[#6B4F7F] to-[#5C4373] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <div className="relative w-56 h-24">
                <Image
                  src="/logohorizontalbranca.svg"
                  alt="Cardio Sarraff"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Excelência em Cardiologia Veterinária. Consultas e exames com o carinho que o seu Pet merece!
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/cardiologiasarraff"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/cardiosarraff/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#sobre"
                  className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#equipe"
                  className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Nossa Equipe
                </a>
              </li>
              <li>
                <a
                  href="#localizacao"
                  className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Localização
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contato</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">CLINIVET:</span>
                <span>(41) 3257-4326</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-white">Domiciliar/Volante:</span>
                <span>(41) 99191-0080</span>
              </li>
              <li className="mt-6 flex items-center gap-2">
                <span className="font-semibold text-white">Email:</span>
                <span>contato@cardiosarraff.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 flex items-center justify-center gap-2 mb-2">
            Feito com <Heart className="h-4 w-4 text-red-400" /> para os pets
          </p>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Cardio Sarraff. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}