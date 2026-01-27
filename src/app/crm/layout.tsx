"use client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRequisitionPage = pathname?.includes("/requisition");

  return (
    <div className={`${inter.className} `}>
      {children}
    </div>
  );
}
