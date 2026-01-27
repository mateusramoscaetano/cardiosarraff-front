"use client";

import { Avaliacoes } from "@/components/_app/avaliacoes";
import { Contato } from "@/components/_app/contato";
import { Equipe } from "@/components/_app/equipe";
import { Footer } from "@/components/_app/footer";
import { Galeria } from "@/components/_app/galeria";
import { Header } from "@/components/_app/header";
import { Hero } from "@/components/_app/hero";
import { Localizacao } from "@/components/_app/localizacao";
import { PortalExames } from "@/components/_app/portal-exames";
import { Servicos } from "@/components/_app/servicos";
import { Sobre } from "@/components/_app/sobre";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary ">
      <Header />

      <Hero />

      <Sobre />
      <Servicos />
      <Galeria />
      <PortalExames />
      <Equipe />
      <Avaliacoes />
      <Localizacao />
      <Contato />
      <Footer />
    </div>
  );
}
