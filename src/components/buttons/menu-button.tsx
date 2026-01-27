"use client";
import { motion } from "framer-motion";
import { Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuButtonProps {
  icon: string | React.ReactElement<typeof Icon>;
  onClick?: () => void;
}

export function MenuButton({ icon, onClick }: MenuButtonProps) {
  return (
    <>
      <motion.button
        aria-label="Menu"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 1 }}
        className="w-8 h-8 md:w-16 md:h-16 bg-primary rounded-xl  font-bold text-white tracking-normal overflow-hidden flex items-center justify-center "
      >
        {icon}
      </motion.button>
    </>
  );
}
