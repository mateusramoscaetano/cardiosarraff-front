"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";
import SkipIcon from "../icons/skip-back";
import { SkipFowardIcon } from "../icons/skip-foward";
import { HeadBannerTextBox } from "../text-boxes/head-banner-text-box";
import { ReactNode } from "react";
import { HeadButton } from "../buttons/head-button";
import { motion } from "framer-motion";
import cn from "@/utils/cn";

interface ICarouselProps {}

export function Gallery({}: ICarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [inView, setInView] = useState<number>(0);

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

  return (
    <div className="embla 3sm:mb-[200px] lg:mb-[40px] w-full">
      <div
        className="embla__viewport w-full flex flex-col items-center justify-center"
        ref={emblaRef}
      >
        <div className="embla__container text-black ">
          <div className="embla__slide flex items-center justify-center">
            <Image
              src="/HEADBANNER-03B.jpg"
              width={3821}
              height={659}
              alt="head banner"
              className={`"embla_slide object-cover w-full" ${
                isMobile ? "h-[300px]" : "h-full"
              }`}
            />
          </div>

          <Image
            src={isMobile ? "/MOBILE-CACHORRO-01.jpg" : "/headebanner7.png"}
            width={3821}
            height={659}
            alt="head banner"
            className={`"embla_slide object-cover w-full" ${
              isMobile ? "h-[300px] object-test-position" : "h-full"
            }`}
          />
          <div className="embla__slide flex items-center justify-center">
            <Image
              src={isMobile ? "/MOBILE-GATO-01.jpg" : "/headebanner2.png"}
              width={3821}
              height={659}
              alt="head banner"
              className={`"embla_slide object-cover w-full" ${
                isMobile ? "h-[300px]" : "h-full"
              }`}
            />
          </div>
        </div>

        <div className=" flex gap-4">
          <button onClick={scrollPrev} className="embla__prev text-black">
            <SkipIcon />
          </button>
          <button onClick={scrollNext} className="embla__next text-black">
            <SkipFowardIcon />
          </button>
        </div>

        {inView === 1 && (
          <HeadBannerTextBox
            onClick={() => {
              const whatsappUrl = "https://wa.me/41988399740";
              window.open(whatsappUrl, "_blank");
            }}
            title={
              <div className="gap-0">
                <span
                  className="font-bold  leading-tight
            lg:w-[320px]
            lg:text-[40px] sm:text-[24px]
            "
                >
                  Coração feliz
                </span>
                <br />
                <span
                  className="font-bold  leading-tight
            lg:w-[320px]
            lg:text-[40px] sm:text-[24px]
            "
                >
                  é coração forte.
                </span>
              </div>
            }
            text="Garanta que cada batida do coração do seu pet seja sinônimo de saúde e felicidade, em cada fase da vida."
            color="white"
          />
        )}
        {inView === 2 && (
          <HeadBannerTextBox
            onClick={() => {
              const whatsappUrl = "https://wa.me/41988399740";
              window.open(whatsappUrl, "_blank");
            }}
            title={
              <span
                className="font-bold  leading-tight
        lg:w-[320px]
        lg:text-[40px] sm:text-[24px]
        "
              >
                Agende o exame <br /> do seu pet pelo WhatsaApp
              </span>
            }
            text="É fácil e rápido! Basta clicar no botão abaixo."
            color="primary"
            className="top-[280px] "
            label="Agende seu Exame"
          />
        )}
        {inView === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={cn("absolute text-black flex flex-col   ")}
          >
            <Image
              src="/Logo_Home.png"
              height={500}
              width={500}
              alt="logo white"
              className="lg:w-[500px] 2sm:w-[300px] 3sm:w-[250px]"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
