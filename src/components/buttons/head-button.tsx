import React, { ButtonHTMLAttributes, forwardRef } from "react";
import cn from "@/utils/cn";
import Image from "next/image";

interface IHeadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "small" | "normal" | "large" | "slim";
  color?: "primary" | "white" | "white_black";
  className?: string;
  labelClassName?: string;
}

export const HeadButton = forwardRef<HTMLButtonElement, IHeadButtonProps>(
  (
    {
      label,
      size = "normal",
      color = "primary",
      className,
      labelClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          "hover:opacity-80 rounded-xl flex truncate  items-center justify-center gap-2",
          {
            "2.5sm:h-10 2.5sm:w-[203px] 2sm:h-6 2sm:w-[180px] 3sm:h-6 3sm:w-[180px] font-medium 2.5sm:text-[13px] 2sm:text-[9px] 3sm:text-[9px]":
              size === "normal",
            "h-[35px] w-[270px] font-medium text-[10px] sm:text-[13px]":
              size === "slim",
            "h-10 w-[203px]": size === "large",
          },
          {
            "bg-primary text-white": color === "primary",
            "bg-white text-primary": color === "white",
            "bg-[#f1f1f1] text-black drop-shadow-md": color === "white_black",
          },
          className
        )}
      >
        {label}
        {color === "primary" && (
          <Image
            src="/arrow-cursor-2--mouse-select-cursor.png"
            width={18}
            height={18}
            alt="arrow"
          />
        )}
        {color === "white" && (
          <Image src="/right-arrow.png" width={13} height={13} alt="arrow" />
        )}
      </button>
    );
  }
);

HeadButton.displayName = "HeadButton";

export default HeadButton;
