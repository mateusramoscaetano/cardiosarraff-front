"use client";

import { useUser } from "@/hooks/use-user";
import ToastProvider from "@/app/toast-provider";
import { HeaderDashboard } from "./header-dashboard";
import { ReportSection } from "./report-section";
import { ClientSection } from "./client-section";
import { ClinicSection } from "./clinic-section";
import { DoctorSection } from "./doctor-section";
import { useContext, useEffect } from "react";
import { PageContext, AuthContext } from "@/contexts/type";
import { NavBarDashboard } from "./navbar-dashboard";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IDashBoardProps {}

export function DashBoard({}: IDashBoardProps) {
  const { user } = useUser();
  const { page, setPage } = useContext(PageContext);

  return (
    <>
      <ToastProvider>
        <div className="w-full min-h-screen flex text-white bg-white text-3xl dark:bg-zinc-800">
          <NavBarDashboard
            currentPage={page}
            setPage={setPage}
            disabled={false}
          />

          <div className="flex flex-col w-full">
            <HeaderDashboard user={user} />
            {page === "report" && <ReportSection />}
            {page === "client" && <ClientSection />}
            {page === "clinic" && <ClinicSection />}
            {page === "doctor" && <DoctorSection />}
          </div>
        </div>
      </ToastProvider>
    </>
  );
}
