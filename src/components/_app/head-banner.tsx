"use client";
import Image from "next/image";
import { HeadButton } from "../buttons/head-button";
import { useEffect, useState } from "react";

interface IHeadBannerProps {}

export function HeadBanner({}: IHeadBannerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Left Section - Text Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-28">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-12 lg:py-0">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Sub-headline */}
            <p className="text-gray-500 text-sm lg:text-base mb-4 font-medium">
              Seu melhor amigo em boas mãos!
            </p>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl  font-bold text-primary mb-6 leading-tight">
              Cuidar do seu Pet começa com um bom diagnóstico.
            </h1>

            {/* Descriptive Text */}
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-8 max-w-lg">
              Tecnologia de ponta aliada ao cuidado que seu pet merece.
            </p>

            {/* Call-to-Action Button */}
            <HeadButton color="primary" size="large" label="Saiba Mais" />
          </div>
        </div>

        {/* Right Section - Images */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl z-20">
            <Image
              src="/cat-dog.png"
              alt="Cat and dog"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Overlay Green Shape - Positioned to cover both header and banner */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Main green background shape - starts from top */}
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-primary"></div>

          {/* Decorative overlay shape */}
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
            <Image
              src="/Decore.png"
              alt="Decorative shapes"
              fill
              className="object-cover opacity-20"
            />
          </div>

          {/* Organic curved shape separator - more pronounced curve */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-40 lg:h-56">
            <svg
              viewBox="0 0 1200 300"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,300 C200,150 400,200 600,180 C800,160 1000,200 1200,300 L1200,300 L0,300 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
