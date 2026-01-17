"use client";
import ToastProvider from "@/app/toast-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavBarDashboard } from "../../../../../../components/_dashboard/navbar-dashboard";
import { AuthContext, PageContext } from "@/contexts/type";
import { useContext, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { HeaderDashboard } from "../../../../../../components/_dashboard/header-dashboard";
import { PetDetailSection } from "../../../../../../components/_dashboard/pet-detail-section";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PetDetailPage() {
  const { user } = useUser();
  const router = useRouter();
  const { isLoading } = useContext(AuthContext);

  const { page, setPage } = useContext(PageContext);
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/exam-portal");
    }
  }, [user, router, isLoading]);

  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <div className="w-full min-h-screen flex  text-white bg-white text-3xl dark:bg-zinc-800">
            <NavBarDashboard
              setPage={setPage}
              currentPage={page}
              disabled={true}
            />

            <div className="flex flex-col w-full">
              <HeaderDashboard user={user} />
              <PetDetailSection />
            </div>
          </div>
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}
