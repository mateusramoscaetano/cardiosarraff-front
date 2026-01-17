"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  const handleGoToExamPortal = () => {
    router.push("/exam-portal");
  };

  const handlePhoneClick = () => {
    window.open("tel:+554130810360", "_self");
  };

  const handleMapsClick = () => {
    const address =
      "R. Voluntários da Pátria, 1393, Centro, São José dos Pinhais - PR";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  const handleInstagramClick = () => {
    // Substitua pela URL real do Instagram da Exavet
    window.open("https://www.instagram.com/exavet.diagnostico", "_blank");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToContact = () => {
    router.push("/contact");
  };

  return (
    <footer className="w-full bg-primary text-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand/Slogan Section */}
          <div className="flex flex-col space-y-4 items-center md:justify-center xl:justify-start xl:items-end">
            <div className="flex items-center space-x-2">
              <Image
                src={"/Logo_Home.png"}
                width={100}
                height={100}
                alt="logo"
                className="w-auto h-auto"
              />
            </div>
            <p className="text-base text-white/90 max-w-xs">
              Cuidar bem é a nossa <br /> maior especialidade.
            </p>
          </div>

          {/* Navigation Menu Section */}
          <div className="flex flex-col space-y-4 items-center">
            <nav className="flex gap-4 lg:gap-4 md:flex-col md:items-start xl:pl-20">
              <h3 className="text-lg font-semibold text-white text-center">
                Menu
              </h3>
              <button
                onClick={handleScrollToTop}
                className=" text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("about");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className=" text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("service");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className=" text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Serviços
              </button>
              <button
                onClick={handleGoToContact}
                className=" text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Contato
              </button>
            </nav>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col space-y-4 items-center">
            <div className="flex flex-col space-y-3 gap-3">
              {/* Instagram */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleInstagramClick}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-300 flex items-center gap-2"
                >
                  <Image
                    src={"/icons/instagram.svg"}
                    width={22}
                    height={22}
                    alt="instagram"
                  />
                  <span className="text-base text-white/90">
                    Acesse nosso Instagram
                  </span>
                </button>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleMapsClick}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                >
                  <Image
                    src={"/icons/maps.svg"}
                    width={22}
                    height={22}
                    alt="maps"
                  />
                </button>
                <button
                  onClick={handleMapsClick}
                  className="text-base text-white/90 hover:text-white transition-colors cursor-pointer text-left"
                >
                  R. Voluntários da Pátria 1393
                  <br />
                  Centro - São José dos Pinhais
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePhoneClick}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                >
                  <Image
                    src={"/icons/phone.svg"}
                    width={22}
                    height={22}
                    alt="phone"
                  />
                </button>
                <button
                  onClick={handlePhoneClick}
                  className="text-base text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  41 3081-0360
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col space-y-4 items-center md:justify-center xl:justify-start">
            <div className="flex flex-col space-y-3 items-center md:justify-center xl:justify-start">
              <Button
                onClick={handleGoToExamPortal}
                className="bg-exa-pink w-full text-base text-[#1e1e1e] min-w-[204px] max-w-[204px] h-[40px] lg:h-[60px] hover:bg-exa-pink/90 rounded-lg font-semibold"
              >
                Download de Exames
              </Button>
              <Button
                onClick={handleGoToExamPortal}
                className="bg-exa-pink text-base font-semibold w-full text-[#1e1e1e] min-w-[204px] max-w-[204px] h-[40px] lg:h-[60px] hover:bg-exa-pink/90 rounded-lg"
              >
                Requisição de Exames
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex justify-center">
            <p className="text-sm text-white/70">Desenvolvido por Nestlab</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
