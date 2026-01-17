import Image from "next/image";
import { Button } from "../buttons/button-shad";

export function HeroSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "554130810360";
    const message = "Olá! Gostaria de saber mais sobre os serviços da Exavet.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full min-h-screen md:min-h-full md:justify-between xl:min-h-screen xl:justify-center flex flex-col md:flex-row-reverse items-center md:items-start lg:items-center justify-center mt-6 md:mt-24 pl-4 max-w-[1440px] mx-auto">
      <Image
        src="/GATO_CACHORRO_NOVO_EXA.png"
        alt="hero_section"
        width={1000}
        height={1000}
        priority
        className="z-10 max-w-[408px] h-auto lg:max-w-[508px] xl:max-w-[842px] lg:h-auto mr-6 md:mr-0"
      />

      <div className="flex flex-col items-start justify-center px-4 gap-2  md:gap-6 lg:pl-20 xl:pl-52 max-w-[650px] w-full h-full xl:mb-16">
        <span className="text-primary text-base xl:text-lg font-productSans font-medium">
          Centro de Diagnóstico Veterinário
        </span>

        <h1 className="text-5xl xl:text-7xl font-volkhov font-bold text-primary w-full antialiased xl:min-w-[528px] ">
          Para quem precisa ver além.
        </h1>

        <p className="text-primary text-xs font-productSans md:max-w-[250px] xl:text-sm xl:max-w-[380px]">
          Tecnologia de ponta aliada ao cuidado que seu pet merece.
        </p>

        <Button
          onClick={handleWhatsAppClick}
          className="bg-primary text-white text-base font-medium font-productSans min-w-[172px] h-[40px] md:h-[50px] lg:h-[60px] transition-colors duration-300 flex items-center gap-2"
        >
          <Image
            src="/icons/whats.svg"
            alt="whatsapp"
            width={24}
            height={24}
            className="w-8 h-8 text-white fill-current"
          />
          Fale Conosco via WhatsApp
        </Button>
      </div>
    </div>
  );
}
