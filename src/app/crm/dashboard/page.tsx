"use client";
import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { DashBoard } from "../../../components/_dashboard/dashboard";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { AuthContext } from "@/contexts/type";
import Image from "next/image";

export default function AppDashboard() {
  const queryClient = new QueryClient();
  const { user } = useUser();
  const { isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/exam-portal");
    }
  }, [user, router, isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <DashBoard />
    </QueryClientProvider>
  );
}
