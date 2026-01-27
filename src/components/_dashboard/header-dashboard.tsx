"use client";

import { AuthUser } from "@/@types/auth";
import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { motion, AnimatePresence } from "framer-motion";

interface IHeaderDashboardProps {
  user: AuthUser | null;
}

export function HeaderDashboard({ user }: IHeaderDashboardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logoutRef = useRef<HTMLDivElement>(null);

  const { removeUser } = useUser();
  const queryClient = new QueryClient();
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      logoutRef.current &&
      !logoutRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Pequeno delay para garantir que o clique no botão seja processado primeiro
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleOutsideClick);
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [isOpen]);

  const logout = () => {
    removeUser();
    queryClient.clear();
    router.replace("/exam-portal");
  };

  function handleGoToExamPortal() {
    logout();
  }

  return (
    <>
      <div
        className="
      bg-zinc-100 dark:bg-background
      w-full h-16 flex justify-end items-center px-4 gap-3 border-[#f2f2f2] text-black "
      >
        <div
          className="text-sm font-medium text-[#1e1e1e] dark:text-gray-100 hidden sm:block mr-4"
          aria-labelledby="user-name"
        >
          {user?.user.name}
          <span id="user-name" style={{ display: "none" }}>
            Logged in user
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="dark:text-primary text-[#1e1e1e] cursor-pointer border-2 border-primary rounded-full p-1 transition-colors duration-200 hover:bg-primary/5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu do usuário"
        >
          <User size={32} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={logoutRef}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute top-16 right-0 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20 min-w-[140px] p-3 overflow-hidden z-[110]"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-xl"></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.05,
                    duration: 0.15,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  onClick={handleGoToExamPortal}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-[#5C4373]/5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-1.5 h-1.5 bg-[#5C4373] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-[#5C4373] text-sm font-medium group-hover:text-[#5C4373]/80 transition-colors duration-300 ">
                    Sair
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
