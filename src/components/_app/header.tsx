"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/_app/ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { scrollToSection } from "@/utils/ScrollToSection";
import { MenuButton } from "@/components/buttons/menu-button";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";

export function  Header() {
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (previous) {
      if (latest > previous && latest > 150) {
        setHidden(true);
        setShowDropdown(false);
      } else {
        setHidden(false);
      }
    }
  });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectSection = (sectionId: string, offset = 0) => {
    scrollToSection(sectionId, offset);
    setShowDropdown(false);
  };

  const hoverLi = {
    color: "#D1BAA2",
    cursor: "pointer",
  };

  const router = useRouter();

  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0, zIndex: 60 },
          hidden: { y: "-100%", zIndex: 1, backdropFilter: "blur(4px)" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`sticky top-0 left-0 right-0 transition-all duration-300 bg-primary ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-lg"
            : "bg-primary"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div
                onClick={handleScrollToTop}
                className="relative w-48 h-16 md:w-56 md:h-20 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <Image
                  src={
                    isScrolled
                      ? "/logohorizroxa.svg"
                      : "/logohorizontalbranca.svg"
                  }
                  alt="Cardio Sarraff"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {isMobile && (
              <div className="flex items-center z-40 relative">
                <MenuButton
                  icon={
                    <Menu
                      onClick={toggleDropdown}
                      className={"size-5 md:size-8"}
                    />
                  }
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      staggerChildren: 0.1,
                    }}
                    className="absolute top-16 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 min-w-[280px] p-6 overflow-hidden"
                    style={{
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl"></div>

                    <div className="relative z-10 space-y-4">
                      <div className="space-y-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          onClick={handleScrollToTop}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Início
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          onClick={() => selectSection("sobre", 133)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Sobre
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          onClick={() => selectSection("servicos", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Serviços
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 }}
                          onClick={() => selectSection("galeria", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Galeria
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          onClick={() => selectSection("equipe", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Equipe
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 }}
                          onClick={() => selectSection("localizacao", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Localização
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          onClick={() => selectSection("contato", 0)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300">
                            Contato
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.55, duration: 0.3 }}
                        className="h-px bg-gradient-to-r from-transparent via-[#5C4373]/20 to-transparent"
                      ></motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="pt-2 gap-2 flex flex-col"
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="w-full bg-white text-[#4A3560] font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-[#4A3560] hover:bg-slate-100"
                        >
                          Agendar
                        </motion.button>
                        <motion.button
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-[#5C4373] hover:bg-slate-100"
                          onClick={() => router.push('/exam-portal')}
                        >
                          Portal de Exames
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#5C4373]/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#5C4373]/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
                  </motion.div>
                )}
              </div>
            )}

            {!isMobile && (
              <>
                <div
                  className={`text-[18px] flex font-medium gap-8 xl:gap-12 transition-colors duration-300 xl:text-[16px] ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  <motion.div
                    whileHover={hoverLi}
                    onClick={handleScrollToTop}
                    className="cursor-pointer"
                  >
                    Início
                  </motion.div>
                  <motion.div
                    whileHover={hoverLi}
                    onClick={() => selectSection("sobre", 133)}
                    className="cursor-pointer"
                  >
                    Sobre
                  </motion.div>
                  <motion.div
                    whileHover={hoverLi}
                    onClick={() => selectSection("servicos", 100)}
                    className="cursor-pointer"
                  >
                    Serviços
                  </motion.div>
                  <motion.div
                  
                    onClick={() => selectSection("galeria", 100)}
                    className="cursor-pointer"
                  >
                    Galeria
                  </motion.div>
                  <motion.div
                    whileHover={hoverLi}
                    onClick={() => selectSection("equipe", 100)}
                    className="cursor-pointer"
                  >
                    Equipe
                  </motion.div>
                  <motion.div
                    whileHover={hoverLi}
                    onClick={() => selectSection("localizacao", 100)}
                    className="cursor-pointer"
                  >
                    Localização
                  </motion.div>
                  <motion.div
                    whileHover={hoverLi}
                    onClick={() => selectSection("contato", 0)}
                    className="cursor-pointer"
                  >
                    Contato
                  </motion.div>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => router.push('/')}
                    className={`!bg-white !border-2  ${
                      isScrolled
                        ? "!border-[#4A3560] hover:!bg-slate-100 !text-[#4A3560]"
                        : "!bg-transparent  hover:!bg-[#8B7AA3] hover:!text-white text-white"
                    }`}
                  >
                    Agendar
                  </Button>
                  <Button
                  onClick={() => router.push('/exam-portal')}
                    className={`!bg-white !text-[#5C4373] hover:!bg-[#8B7AA3] hover:!text-white  ${
                      isScrolled
                        ? "!bg-primary !text-white hover:!bg-[#8B7AA3] hover:!text-white"
                        : "!bg-white !text-[#5C4373] hover:!bg-[#8B7AA3] hover:!text-white"
                    }`}
                  >
                  Portal de Exames
                  </Button>
                </div>
              </>
            )}
          </div>
        </nav>
      </motion.div>
    </>
  );
}