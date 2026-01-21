"use client";

import { Card, CardContent } from "@/components/_app/ui/card";
import { Button } from "@/components/_app/ui/button";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Contato() {
  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-[#5C4373] to-[#6B4F7F]">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Contato"
          title="Entre em Contato"
          description="Estamos prontos para atender você e seu pet"
          smallTextColor="text-white"
          titleColor="text-white"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300">
                  <Phone className="h-8 w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Telefone</h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">CLINIVET</p>
                <a
                  href="tel:+554132574326"
                  className="text-[#5C4373] hover:text-[#4A3560] transition-colors duration-300 block"
                >
                  (41) 3257-4326
                </a>
                <p className="font-semibold mt-4">DOMICILIAR/VOLANTE</p>
                <a
                  href="tel:+5541991910080"
                  className="text-[#5C4373] hover:text-[#4A3560] transition-colors duration-300 block"
                >
                  (41) 99191-0080
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300">
                  <Mail className="h-8 w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
              <a
                href="mailto:contato@cardiosarraff.com.br"
                className="text-[#5C4373] hover:text-[#4A3560] transition-colors duration-300 break-all"
              >
                contato@cardiosarraff.com.br
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#5C4373]/10 rounded-full group-hover:bg-[#5C4373] transition-all duration-300">
                  <MessageCircle className="h-8 w-8 text-[#5C4373] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp</h3>
              <Link
                href="https://linktr.ee/cardiosarraff"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="w-full group">
                  Clique aqui para entrar em contato
                  <MessageCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}