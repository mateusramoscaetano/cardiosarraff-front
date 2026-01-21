"use client";

import ToastProvider from "@/app/toast-provider";

import { useContext, useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { PageContext } from "@/contexts/type";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { usePathname, useRouter } from "next/navigation";
import { HeaderDashboard } from "@/components/_dashboard/header-dashboard";
import { ClientDetailExamPortal } from "@/components/_exam-portal/client-detail-exam-portal";
import { Footer } from "@/components/_app/footer";
import { scrollToSection } from "@/utils/ScrollToSection";
import Image from "next/image";
import { MenuButton } from "@/components/buttons/menu-button";
import { Menu } from "lucide-react";
import { useAuthClientLogin } from "@/hooks/use-auth-client-login";
import { useAuthLogin } from "@/hooks/use-auth-login";
import { useAuth } from "@/hooks/use-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { FooterLogin } from "@/components/_crm/footer-login";

interface IExamPortalPageProps {}

export default function ExamPortalPage({}: IExamPortalPageProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  const { removeUser, user } = useUser();

  const hoverLi = {
    color: "#E4722C",
    cursor: "pointer",
  };
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
    if (showDropdown) {
      setShowDropdown(false);
    }
  };

  const logout = () => {
    removeUser();
    queryClient.clear();

    router.push("/exam-portal");
  };

  function handleGoToExamPortal() {
    router.back();
    logout();
  }

  const pathName = usePathname();

  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <div className="w-full min-h-screen flex justify-between  text-white bg-white dark:bg-zinc-900 text-3xl">
            <div className="flex flex-col w-full mt-4 justify-between">
              <motion.div
                variants={{
                  visible: { y: 0, zIndex: 100 },
                  hidden: { y: "-100%", zIndex: 1 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="
        3sm:px-14
        2sm:px-14
        sm:px-14
        md:px-14
        lg:px-24 
        
        w-full h-28 flex flex-row items-center justify-between sticky top-0 bg-white dark:bg-zinc-900 border-b dark:border-zinc-700 p-4"
              >
                <div
                  onClick={handleScrollToTop}
                  className="hover:cursor-pointer"
                >
                  <Image
                    src="/CARDIO-SARRAFF.svg"
                    width={159}
                    height={25}
                    alt="cora-logo"
                  />
                </div>

                <div className="flex items-center z-40">
                  <MenuButton
                    icon={<Menu onClick={toggleDropdown} />}
                    onClick={() => setShowDropdown(!showDropdown)}
                  />

                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute  text-white mt-4 p-4 rounded-md 
                    top-12 right-12 border-zinc-900 h-20 w-58 mb-1"
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.25 },
                        }}
                        whileTap={{ scale: 1 }}
                        className="w-58 h-4 bg-primary rounded-lg p-3 text-[13px] font-bold text-white flex items-center justify-center tracking-normal overflow-hidden"
                        onClick={handleGoToExamPortal}
                      >
                        Sair
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <ClientDetailExamPortal />
              <FooterLogin />
            </div>
          </div>
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}
