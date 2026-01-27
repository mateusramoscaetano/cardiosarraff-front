"use client";

import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import cn from "@/utils/cn";
import Link from "next/link";

import { FooterLogin } from "../../components/_crm/footer-login";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginExamPortal } from "@/components/_exam-portal/login-exam-section";
import { ExamPortalTextBox } from "@/components/text-boxes/exam-portal-text-box";
import { useEffect, useState } from "react";

interface ILoginPageClientProps {}

export default function LoginPageClient({}: ILoginPageClientProps) {
  const queryCLient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryCLient}>
        <div className="min-h-screen relative flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:px-0">
          <Link
            href="/"
            className={cn("absolute left-1/2 -translate-x-1/2 top-4 md:left-10 md:translate-x-0 md:top-10 z-20")}
          >
            <Image
              src="/CARDIO-SARRAFF.svg"
              width={159}
              height={25}
              alt="cora-logo"
            />
          </Link>

          <div className="w-full flex flex-col  items-center justify-center min-h-screen relative dark:bg-zinc-800/80 bg-white text-black dark:text-gray-100">
            <LoginExamPortal />

            <div className="absolute bottom-0 w-full">
              <FooterLogin />
            </div>
          </div>

          <div className="lg:flex relative hidden min-h-full flex-col items-center justify-center bg-primary dark:bg-zinc-800 p-10 text-white dark:border-r dark:border-zinc-700">
            <Image
              src="/portalcatdog.jpg"
              layout="fill"
              alt="Authentication"
              className="inset-0 object-cover w-1/2 h-full relative"
            />
          </div>
          <ExamPortalTextBox />
        </div>
      </QueryClientProvider>
    </>
  );
}
