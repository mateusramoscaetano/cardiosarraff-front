"use client";

import { AuthUser } from "@/@types/auth";
import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { QueryClient, useQueryClient } from "react-query";

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
      !logoutRef.current.contains(event.target as Node) &&
      event.target !== logoutRef.current
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      w-full h-16 flex justify-end pr-20 md:pr-24 items-center px-2 sm:px-3 md:px-6  gap-2 sm:gap-4 border-[#f2f2f2] text-black "
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
        <User
          className="dark:text-primary text-[#1e1e1e] cursor-pointer border-2 border-primary rounded-full p-1"
          size={32}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            onClick={handleGoToExamPortal}
            ref={logoutRef}
            className="absolute text-sm cursor-pointer text-white font-medium 
          justify-center flex items-center right-3 top-14 z-50 w-24 h-10 max-w-lg  
          gap-4 border bg-primary p-2 shadow-lg duration-200 data-[state=open]:animate-in 
          sm:rounded-lg"
            aria-labelledby="logout-menu"
          >
            <button aria-label="Logout">Sair</button>
            <LogOut color="#fff" />
          </div>
        )}
      </div>
    </>
  );
}
