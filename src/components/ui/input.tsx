import cn from "@/utils/cn";
import * as React from "react";
import { Search } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  buttonSize?: "sm" | "md" | "lg";
  lineColor?: "pink" | "blue";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      onInput,
      icon = true,
      buttonSize = "md",
      lineColor,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative")}>
        {icon && (
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            color="#b9b9b9"
          />
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-xs text-black dark:text-gray-100",
            { "pl-10": icon },
            {
              "h-5 border-exa-pink rounded-xl border-t-transparent border-r-transparent border-l-transparent":
                buttonSize === "sm",
            },
            { "h-9": buttonSize === "md" },
            { "h-12": buttonSize === "lg" },
            {
              "border-pink-card border-t-transparent border-r-transparent border-l-transparent":
                lineColor === "pink",
            },
            {
              "border-primary border-t-transparent border-r-transparent border-l-transparent":
                lineColor === "blue",
            },
            className
          )}
          ref={ref}
          onInput={onInput}
          autoComplete="off"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
