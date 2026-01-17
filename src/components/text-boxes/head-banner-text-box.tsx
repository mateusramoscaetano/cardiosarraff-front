import { ReactNode } from "react";
import { HeadButton } from "../buttons/head-button";
import { motion } from "framer-motion";
import cn from "@/utils/cn";

interface IHeadBannerTextBoxProps {
  title: ReactNode;
  text: string;
  color: "white" | "primary" | "white_black";
  className?: string;
  onClick?: () => void;
  label?: string;
}

export function HeadBannerTextBox({
  title,
  color,
  text,
  className,
  onClick,
  label,
}: IHeadBannerTextBoxProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={cn(
          "absolute text-black flex flex-col 3sm:gap-4 sm:gap-6 3sm:w-[150px] 3sm:left-[36px] 3sm:top-[150px] sm:w-[280px]  lg:w-[400px] lg:top-[150px] xl:left-[150px] xl:top-[200px] 2xl:left-[200px] 2xl:top-[250px] 3xl:left-[450px]  ",
          className
        )}
      >
        {title}
        <span className="font-normal lg:w-[310px] lg:text-sm 3sm:text-[12px]">
          {text}
        </span>
        <HeadButton
          color={color}
          size="normal"
          label={label ? label : "Download De Exames"}
          onClick={onClick}
          className="z-20"
        />
      </motion.div>
    </>
  );
}
