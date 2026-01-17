import Image from "next/image";
import { ComponentProps } from "react";

interface INavbarDashboardButtonProps extends ComponentProps<"button"> {
  label: string;
  icon: string;
  onClick: () => void;
  isActive: boolean;
  id: string;
}

export function NavbarDashboardButton({
  label,
  icon,
  onClick,
  isActive,
  id,
}: INavbarDashboardButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`w-full h-11 flex py-3 px-6 text-sm
        text-white rounded-3xl border-none 
        ${isActive ? "bg-accent" : "hover:bg-accent"}
        justify-start items-center 
        gap-4 mb-2`}
    >
      <Image
        src={icon}
        width={18}
        height={18}
        alt="document icon"
        className="w-[18px] h-[18px]"
      />
      {label}
    </button>
  );
}
