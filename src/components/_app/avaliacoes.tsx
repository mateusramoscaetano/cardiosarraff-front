"use client";

import { useEffect } from "react";
import { SectionTitle } from "@/components/_app/ui/section-title";

export function Avaliacoes() {
  useEffect(() => {
    // SOLUÇÃO ULTRA SIMPLES: esperar tudo carregar e deletar o link diretamente
    const init = () => {
      console.log('🚀 Iniciando sistema anti-Featurable...');

      const removeLink = () => {
        // Método mais direto possível: procurar qualquer link com "Powered by"
        const links = document.querySelectorAll('a');
        Array.from(links).forEach((link) => {
          const text = link.textContent || '';
          if (text.includes('Powered by')) {
            console.log('💥 DESTRUÍDO! Link Featurable eliminado!');
            link.remove();
            return true;
          }
        });
        return false;
      };

      // Carregar Featurable
      const script = document.createElement("script");
      script.src = "https://featurable.com/assets/v2/carousel_default.min.js";
      script.defer = true;
      script.charset = "UTF-8";
      document.head.appendChild(script);

      // Depois que carregar, tentar remover múltiplas vezes
      script.onload = () => {
        console.log('✅ Featurable carregado, iniciando caça ao link...');

        // Tentativas imediatas
        removeLink();

        // Tentativas espaçadas
        setTimeout(removeLink, 500);
        setTimeout(removeLink, 1000);
        setTimeout(removeLink, 2000);
        setTimeout(removeLink, 3000);
        setTimeout(removeLink, 5000);

        // Tentativas contínuas por mais tempo
        let count = 0;
        const interval = setInterval(() => {
          count++;
          if (removeLink() || count > 20) {
            clearInterval(interval);
            console.log(count <= 20 ? '🎉 Link eliminado!' : '❌ Não conseguiu eliminar o link');
          }
        }, 1000);
      };

      // Backup: tentar mesmo sem onload
      setTimeout(() => {
        removeLink();
        setTimeout(removeLink, 2000);
      }, 2000);
    };

    init();

    // Função global simples para remoção manual
    (window as any).removeFeaturableLink = () => {
      const links = document.querySelectorAll('a');
      Array.from(links).forEach((link) => {
        const text = link.textContent || '';
        if (text.includes('Powered by')) {
          link.remove();
          console.log('💥 Link removido manualmente!');
          return;
        }
      });
    };

    return () => {
      // Cleanup mínimo
      delete (window as any).removeFeaturableLink;
    };
  }, []);

  return (
    <section id="avaliacoes" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Avaliações"
          title="Avaliações"
          description="O que nossos clientes dizem sobre nós"
        />

        <div className="max-w-6xl mx-auto">
          <div
            id="featurable-0668a3b3-74c5-45e9-a810-b31338da3d4f"
            data-featurable-async
            data-location-code="pt-BR"
          ></div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="avaliacoes" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          smallText="Avaliações"
          title="Avaliações"
          description="O que nossos clientes dizem sobre nós"
        />

        <div className="max-w-6xl mx-auto">
          <div id="featurable-0668a3b3-74c5-45e9-a810-b31338da3d4f" data-featurable-async data-location-code="pt-BR"></div>
        </div>
      </div>
    </section>
  );
}