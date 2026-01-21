"use client";

import { Card, CardContent } from "@/components/_app/ui/card";
import { Button } from "@/components/_app/ui/button";
import { SectionTitle } from "@/components/_app/ui/section-title";
import { Download, ArrowRight } from "lucide-react";

export function PortalExames() {
  return (
    <section id="portal-exames" className="py-20 bg-gradient-to-br from-[#5C4373] to-[#6B4F7F]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            smallText="Portal"
            title="Portal de Exames"
            description="Ter acesso aos seus laudos nunca foi tão fácil! Clique no botão abaixo e baixe os exames do seu Pet com a facilidade que só a Cardio Sarraff te oferece."
            smallTextColor="text-white"
            titleColor="text-white"
            descriptionColor="text-white"
          />

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-[#5C4373]/10 rounded-full">
                  <Download className="h-12 w-12 text-[#5C4373]" />
                </div>
                <Button
                  size="lg"
                  variant="primary"
                  className="group"
                >
                  Acessar Portal de Exames
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}