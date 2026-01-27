"use client";

import { Card, CardContent } from "@/components/_app/ui/card";
import { Button } from "@/components/_app/ui/button";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Contato() {
  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#5C4373] to-[#6B4F7F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Entre em Contato"
          description="Estamos prontos para atender você e seu pet"
          titleColor="text-white"
          descriptionColor="text-white"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="p-3 md:p-4 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Telefone</h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold text-base md:text-lg">CLINIVET</p>
                <a
                  href="tel:+554132574326"
                  className="text-[#5C4373] hover:text-[#4A3560] transition-colors duration-300 block text-base md:text-lg"
                >
                  (41) 3257-4326
                </a>
                <p className="font-semibold mt-3 md:mt-4 text-base md:text-lg">DOMICILIAR/VOLANTE</p>
                <a
                  href="tel:+5541991910080"
                  className="text-[#5C4373] hover:text-[#4A3560] transition-colors duration-300 block text-base md:text-lg"
                >
                  (41) 99191-0080
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="p-3 md:p-4 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Email</h3>
              <a
                href="mailto:contato@cardiosarraff.com.br"
                className="text-[#5C4373] hover:text-[#4A3560] transition-colors duration-300 break-all text-sm md:text-lg"
              >
                contato@cardiosarraff.com.br
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:shadow-xl transition-all duration-300 hover:scale-105 group sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="p-3 md:p-4 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300 flex items-center justify-center relative">
                  <div className="w-6 h-6 md:w-8 md:h-8 relative">
                    <Image
                      src="/wpplogoroxoat.svg"
                      alt="WhatsApp"
                      width={32}
                      height={32}
                      className="w-full h-full absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                    />
                    <Image
                      src="/wpplogoatt.svg"
                      alt="WhatsApp"
                      width={32}
                      height={32}
                      className="w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">WhatsApp</h3>
              <Link
                href="https://linktr.ee/cardiosarraff"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="w-full group text-sm md:text-base">
                  Entre em Contato
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}