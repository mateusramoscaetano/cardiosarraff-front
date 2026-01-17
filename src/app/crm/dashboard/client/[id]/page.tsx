"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import ToastProvider from "@/app/toast-provider";
import { NavBarDashboard } from "../../../../../components/_dashboard/navbar-dashboard";
import { HeaderDashboard } from "../../../../../components/_dashboard/header-dashboard";
import { useContext, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { AuthContext, PageContext } from "@/contexts/type";
import { ClientDetailSection } from "../../../../../components/_dashboard/client-detail-section";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface IClientPageProps {}

export default function ClientPage({}: IClientPageProps) {
  const { user } = useUser();
  const router = useRouter();
  const { isLoading } = useContext(AuthContext);

  const { page, setPage } = useContext(PageContext);
  const queryClient = new QueryClient();

  const pathName = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/exam-portal");
    }
  }, [user, router, isLoading]);

  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <div className="w-full min-h-screen flex  text-white bg-white text-3xl dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700">
            <NavBarDashboard
              setPage={setPage}
              currentPage={page}
              disabled={true}
            />

            <div className="flex flex-col w-full">
              <HeaderDashboard user={user} />
              <ClientDetailSection />
            </div>
          </div>
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}
