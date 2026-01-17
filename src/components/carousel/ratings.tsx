"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { RatingCard } from "../cards/rating-card";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

interface IRatingsProps {}

export function Ratings({}: IRatingsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    axis: "y",
    watchDrag: isMobile ? false : true,
  });
  const [, setInView] = useState<number>(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", (event: EmblaCarouselType) => {
        const activeSlideIndex = event.selectedScrollSnap();
        setInView(activeSlideIndex);
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="embla  2.5sm:w-[538px] 3sm:w-[350px] min-h-full">
        <div
          className="embla__viewport w-full h-[800px] relative"
          ref={emblaRef}
        >
          <div className="embla__container text-black flex flex-col h-full">
            <div className="embla__slide flex items-center justify-center flex-col gap-y-20">
              <RatingCard
                name="Lucas Kordiaka"
                image="/lucas.jpg"
                text="Ótimo atendimento, profissionais dedicados e prestativos."
              />
              <RatingCard
                name="Bruna Rotermel"
                image="/bru.jpg"
                text="Excelente cuidado com os pets idosos, recomendo para todos."
              />
            </div>
            <div className="embla__slide flex items-center justify-center flex-col gap-y-20">
              <RatingCard
                name="Mateus Ramos"
                image="/eu.jpg"
                text="A equipe da Cora é simplesmente incrível! Sempre tão atenciosos e cuidadosos com meu gatinho. Recomendo de olhos fechados!"
              />
              <RatingCard
                name="Andressa Adami"
                image="/amor.png"
                text="Atendimento humanizado na Cora é algo que valorizo muito. Tratam minha Belinha com respeito e cuidado."
              />
            </div>
            <div className="embla__slide flex items-center justify-center flex-col gap-y-20">
              <RatingCard
                name="Débora Matwiczki"
                image="/debora.jpg"
                text="O melhor, Gabriel ama muito o que faz, a gente vê no olhar dele ❤"
              />
              <RatingCard
                name="Barbara Grillón"
                image="/irma.jpg"
                text="Dr Gabriel é um profissional incrível, atende todos os meus cachorrinhos! Amo!"
              />
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="embla__prev text-black absolute left-1/2 
            2sm:top-10
            3sm:top-0
            "
          >
            <CircleArrowUp color="#E4722C" />
          </button>
          <button
            onClick={scrollNext}
            className="embla__next text-black absolute left-1/2 
            2sm:bottom-10
            3sm:bottom-6"
          >
            <CircleArrowDown color="#E4722C" />
          </button>
        </div>
      </div>
    </>
  );
}
