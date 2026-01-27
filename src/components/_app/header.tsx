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

interface NavLinkProps {
  sectionId: string;
  label: string;
  onClick: () => void;
  isScrolled: boolean;
  isActive: boolean;
}

function NavLink({ sectionId, label, onClick, isScrolled, isActive }: NavLinkProps) {
  const baseColor = isScrolled ? "#101010" : "#ffffff";
  const activeColor = isScrolled ? "#5C4373" : "#A88BC4";

  return (
    <motion.div
      onClick={onClick}
      className="relative cursor-pointer"
      whileHover="hover"
      animate={isActive ? "active" : "initial"}
      initial="initial"
      key={`${isScrolled}-${isActive}`}
    >
      <motion.span
        className="transition-colors duration-300"
        style={{ color: isActive ? activeColor : baseColor }}
        variants={{
          initial: { color: baseColor },
          hover: { color: activeColor },
          active: { color: activeColor },
        }}
      >
        {label}
      </motion.span>
      <motion.div
        className={`absolute bottom-0 left-1/2 h-0.5 origin-center ${
          isScrolled ? "bg-[#5C4373]" : "bg-white"
        }`}
        variants={{
          initial: { width: 0, x: "-50%" },
          hover: { width: "100%", x: "-50%" },
          active: { width: "100%", x: "-50%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export function  Header() {
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["sobre", "servicos", "galeria", "equipe", "localizacao", "contato"];
      const scrollPosition = window.scrollY + 200;

      let found = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            found = true;
            break;
          }
        }
      }

      if (!found && scrollPosition < 200) {
        setActiveSection("inicio");
      } else if (!found) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0, zIndex: 100 },
          hidden: { y: "-100%", zIndex: 1, backdropFilter: "blur(4px)" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`sticky top-0 left-0 right-0 transition-all duration-300 bg-primary ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-lg"
            : "bg-primary"
        }`}
        style={{ zIndex: 100 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div
                onClick={handleScrollToTop}
                className="relative w-32 h-12 sm:w-40 sm:h-14 md:w-48 md:h-16 lg:w-56 lg:h-20 transition-transform duration-300 hover:scale-105 cursor-pointer"
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
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1],
                      staggerChildren: 0.03,
                    }}
                    className="absolute top-14 sm:top-16 right-0 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 min-w-[240px] sm:min-w-[280px] p-4 sm:p-6 overflow-hidden"
                    style={{
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-xl"></div>

                    <div className="relative z-10 space-y-4">
                      <div className="space-y-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.05,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={handleScrollToTop}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Início
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.08,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={() => selectSection("sobre", 133)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Sobre
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.11,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={() => selectSection("servicos", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Serviços
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.14,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={() => selectSection("galeria", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Galeria
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.17,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={() => selectSection("equipe", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Equipe
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.2,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={() => selectSection("localizacao", 100)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Localização
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.23,
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          onClick={() => selectSection("contato", 0)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-2 h-2 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-[#5C4373] font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                            Contato
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ 
                          delay: 0.26,
                          duration: 0.15,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="h-px bg-gradient-to-r from-transparent via-[#5C4373]/20 to-transparent"
                      ></motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.29,
                          duration: 0.15,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="pt-2 gap-2 flex flex-col"
                      >
                        <Button
                          size="lg"
                          variant="secondary"
                          className="w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Agendar
                        </Button>
                        <Button
                          size="lg"
                          variant="primary"
                          className="w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                          onClick={() => router.push('/exam-portal')}
                        >
                          Portal de Exames
                        </Button>
                      </motion.div>
                    </div>

                  </motion.div>
                )}
              </div>
            )}

            {!isMobile && (
              <>
                <div className="text-base sm:text-lg lg:text-[18px] flex font-medium gap-3 sm:gap-4 xl:gap-6 xl:text-[16px]">
                  <NavLink
                    sectionId="inicio"
                    label="Início"
                    onClick={handleScrollToTop}
                    isScrolled={isScrolled}
                    isActive={activeSection === "inicio"}
                  />
                  <NavLink
                    sectionId="sobre"
                    label="Sobre"
                    onClick={() => selectSection("sobre", 133)}
                    isScrolled={isScrolled}
                    isActive={activeSection === "sobre"}
                  />
                  <NavLink
                    sectionId="servicos"
                    label="Serviços"
                    onClick={() => selectSection("servicos", 100)}
                    isScrolled={isScrolled}
                    isActive={activeSection === "servicos"}
                  />
                  <NavLink
                    sectionId="galeria"
                    label="Galeria"
                    onClick={() => selectSection("galeria", 100)}
                    isScrolled={isScrolled}
                    isActive={activeSection === "galeria"}
                  />
                  <NavLink
                    sectionId="equipe"
                    label="Equipe"
                    onClick={() => selectSection("equipe", 100)}
                    isScrolled={isScrolled}
                    isActive={activeSection === "equipe"}
                  />
                  <NavLink
                    sectionId="localizacao"
                    label="Localização"
                    onClick={() => selectSection("localizacao", 100)}
                    isScrolled={isScrolled}
                    isActive={activeSection === "localizacao"}
                  />
                  <NavLink
                    sectionId="contato"
                    label="Contato"
                    onClick={() => selectSection("contato", 0)}
                    isScrolled={isScrolled}
                    isActive={activeSection === "contato"}
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => router.push('/')}
                    variant={isScrolled ? "secondary" : "outline"}
                    className={isScrolled ? "" : "bg-transparent border-white text-white hover:bg-white hover:text-[#5C4373]"}
                  >
                    Agendar
                  </Button>
                  <Button
                    onClick={() => router.push('/exam-portal')}
                    variant={isScrolled ? "primary" : "secondary"}
                    className={isScrolled ? "" : "bg-white text-[#5C4373] hover:bg-[#8B7AA3] hover:text-white"}
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