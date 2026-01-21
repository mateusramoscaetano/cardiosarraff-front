"use client";
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
      {children}
    </div>
  );
}
