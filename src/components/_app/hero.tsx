"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image: "/cathero4.webp",
    title: "Excelência em Cardiologia Veterinária",
    description: "Consultas e exames com o carinho que o seu Pet merece!",
  },
  {
    image: "/cachorrohero01.webp",
    title: "Os Laudos do seu Pet a um Clique de Distância!",
    description: "Acesse através do portal de exames com o login fornecido pelo seu veterinário!",
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-visible">
      <div className="embla__viewport w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {heroSlides.map((slide, index) => {
            const isFirstSlide = index === 0;
            return (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative overflow-visible">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                  <div className="lg:hidden flex flex-col h-full gap-4">
                    <div className="relative z-10 flex items-center justify-center text-center bg-[#5C4373] px-4 py-6 min-h-[200px] order-1">
                      <div className="transition-all duration-1000 opacity-100 translate-y-0 w-full">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-sm sm:text-base text-purple-100 mb-4 max-w-3xl mx-auto leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative h-[350px] w-full bg-[#5C4373] overflow-visible order-2">
                      <div className="absolute top-0 left-0 right-0 w-full" style={{ height: isFirstSlide ? '130%' : '120%' }}>
                        <div className="absolute top-0 left-0 w-full h-full" style={{ transform: `scale(${isFirstSlide ? '1.3' : '1.2'})`, transformOrigin: 'top center' }}>
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-contain object-top scale-x-[-1]"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:grid lg:grid-cols-2 h-full gap-0">
                    <div className={`relative h-full w-full ${isFirstSlide ? 'lg:order-2' : 'lg:order-1'} bg-[#5C4373] overflow-visible`}>
                      <div className={`absolute ${isFirstSlide ? 'top-0 left-0' : 'bottom-0 left-1/2 -translate-x-1/2'} ${isFirstSlide ? 'w-full max-w-6xl' : 'w-full max-w-4xl'}`} style={{ height: isFirstSlide ? 'calc(100vh - 200px)' : '100%', maxHeight: isFirstSlide ? '800px' : '600px' }}>
                        <div className={`absolute ${isFirstSlide ? 'top-0' : 'bottom-0'} left-0 w-full h-full`}>
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className={`object-contain ${isFirstSlide ? 'object-top' : 'object-bottom'} ${isFirstSlide ? 'object-left scale-135 scale-x-[-1]' : 'object-center scale-x-[-1]'}`}
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`relative z-10 h-full flex items-center ${isFirstSlide ? 'justify-end text-right' : 'justify-start text-left'} ${isFirstSlide ? 'lg:order-1' : 'lg:order-2'} bg-[#5C4373] px-8 py-0`}>
                      <div className="transition-all duration-1000 opacity-100 translate-y-0 w-full">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-purple-100 mb-10 max-w-3xl leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 sm:p-3 transition-all duration-300 z-20 backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 sm:p-3 transition-all duration-300 z-20 backdrop-blur-sm"
        aria-label="Próximo slide"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6 text-white" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}