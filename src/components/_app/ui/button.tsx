
import cn from "@/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105 hover:shadow-lg";

    const variants = {
      primary: "bg-[#5C4373] text-white hover:bg-[#4A3560] focus-visible:ring-[#5C4373]",
      secondary: "bg-white text-[#5C4373] border-2 border-[#5C4373] hover:bg-[#5C4373] hover:text-white focus-visible:ring-[#5C4373]",
      outline: "bg-white text-[#5C4373] border-2 border-[#5C4373] hover:bg-[#5C4373] hover:text-white focus-visible:ring-[#5C4373]",
    };

    const sizes = {
      sm: "h-8 px-4 text-xs",
      md: "h-10 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";