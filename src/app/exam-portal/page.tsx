"use client";

import Image from "next/image";
import cn from "@/utils/cn";
import Link from "next/link";

import { FooterLogin } from "../../components/_crm/footer-login";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginExamPortal } from "@/components/_exam-portal/login-exam-section";
import { ExamPortalTextBox } from "@/components/text-boxes/exam-portal-text-box";

export default function LoginPageClient() {
  const queryCLient = new QueryClient();

  return (
    <QueryClientProvider client={queryCLient}>
      <div className="min-h-screen relative lg:grid lg:grid-cols-2 lg:px-0">
        <div className="w-full flex flex-col min-h-screen pt-20 dark:bg-zinc-800/80 bg-white text-black dark:text-gray-100 relative lg:min-h-screen lg:items-center lg:justify-center lg:pt-0">
          <div className="flex flex-col items-center w-full px-4 lg:px-0 flex-1 justify-center">
            <Link
              href="/"
              className={cn(
                "flex justify-center mb-6 lg:absolute lg:left-10 lg:top-10 lg:mb-0 lg:z-20"
              )}
            >
              <Image
                src="/CARDIO-SARRAFF.svg"
                width={159}
                height={25}
                alt="cora-logo"
              />
            </Link>

            <LoginExamPortal />
          </div>

          <div className="mt-auto w-full lg:absolute lg:bottom-0 lg:left-0">
            <FooterLogin />
          </div>
        </div>

        <div className="relative hidden lg:block min-h-screen overflow-hidden bg-white">
          <Image
            src="/portalcatdog.jpg"
            fill
            alt="Pets no portal de exames"
            className="object-cover"
            priority
          />
        </div>

        <ExamPortalTextBox />
      </div>
    </QueryClientProvider>
  );
}
