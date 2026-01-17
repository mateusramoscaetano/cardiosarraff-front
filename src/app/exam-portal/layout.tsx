"use client";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";

export default function ExamPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  const isRequisitionPage =
    pathname?.includes("/crm/dashboard") && pathname?.includes("/requisition");

  return (
    <div className="font-productSans">
      {!isRequisitionPage && <ThemeToggle />}
      {children}
    </div>
  );
}
