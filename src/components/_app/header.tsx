"use client";

import Image from "next/image";
import { HeadButton } from "../buttons/head-button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/utils/ScrollToSection";
import { MenuButton } from "../buttons/menu-button";
import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface IHeaderProps {}

export function Header({}: IHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const hoverLi = {
    color: "#D1BAA2",
    cursor: "pointer",
  };
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<{
    sectionId: string;
    offset: number;
  } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1097);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Check if scrolled down from top
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
    // Se não estivermos na página inicial, redirecionar para lá
  };

  const selectSection = (sectionId: string, offset = 0) => {
    scrollToSection(sectionId, offset);
    setShowDropdown(!showDropdown);
  };

  function handleGoToExamPortal() {
    router.push("/exam-portal");
  }

  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0, zIndex: 20 },
          hidden: { y: "-100%", zIndex: 1, backdropFilter: "blur(4px)" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`
        3sm:px-4
        2sm:px-8
        sm:px-8
        md:px-8
        lg:px-24 
        
        w-full h-12 py-8 lg:py-12 flex flex-row items-center justify-between fixed top-0 font-productSans z-50 transition-all duration-300
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
        ${isScrolled ? "text-primary" : "text-white"}
        `}
      >
        <div onClick={handleScrollToTop} className="hover:cursor-pointer">
          <Image src="/Logo_Home.png" width={191} height={30} alt="cora-logo" />
        </div>

        {isMobile && (
          <div className="flex items-center z-40">
            <MenuButton
              icon={
                <Menu onClick={toggleDropdown} className={"size-5 md:size-8"} />
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
                className="absolute top-16 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 
                          min-w-[280px] p-6 overflow-hidden"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={handleScrollToTop}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-primary font-medium group-hover:text-primary/80 transition-colors duration-300">
                        Início
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => selectSection("about", 133)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-primary font-medium group-hover:text-primary/80 transition-colors duration-300">
                        Sobre
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => selectSection("service", 100)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-2 h-2 bg-exa-pink rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-primary font-medium group-hover:text-exa-pink transition-colors duration-300">
                        Serviços
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => selectSection("contact", 0)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-2 h-2 bg-exa-pink rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-primary font-medium group-hover:text-exa-pink transition-colors duration-300">
                        Contato
                      </span>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  ></motion.div>

                  {/* Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-2"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-4 px-6 rounded-xl
                               shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5
                               border border-primary/20"
                      onClick={handleGoToExamPortal}
                    >
                      Exames e Requisições
                    </motion.button>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-exa-pink/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
              </motion.div>
            )}
          </div>
        )}

        {!isMobile && (
          <>
            <div
              className={`text-[18px] flex font-medium gap-12 xl:gap-32 font-productSans transition-colors duration-300 text-primary`}
            >
              <motion.div whileHover={hoverLi} onClick={handleScrollToTop}>
                Início
              </motion.div>
              <motion.div
                whileHover={hoverLi}
                onClick={() => selectSection("about", 133)}
              >
                Sobre
              </motion.div>
              <motion.div
                className={isScrolled ? "text-exa-pink" : "text-exa-pink"}
                whileHover={hoverLi}
                onClick={() => selectSection("service", 100)}
              >
                Serviços
              </motion.div>
              <motion.div
                className={isScrolled ? "text-exa-pink" : "text-exa-pink"}
                whileHover={hoverLi}
                onClick={() => selectSection("contact", 0)}
              >
                Contato
              </motion.div>
            </div>
            <div>
              <Button
                className="bg-exa-pink rounded-[10px] min-w-[120px] min-h-[60px] text-[18px] hover:bg-exa-pink/90 transition-colors duration-300 text-[#1e1e1e] font-semibold"
                onClick={handleGoToExamPortal}
              >
                Exames e Requisições
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}
