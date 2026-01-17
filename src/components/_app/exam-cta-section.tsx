"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function ExamCtaSection() {
  const router = useRouter();
  function handleGoToExamPortal() {
    router.push("/exam-portal");
  }

  return (
    <div className="w-full h-full flex   bg-exa-pink min-h-[600px] sm:min-h-[300px] sm:max-h-[300px] relative">
      <div className="w-full h-full  max-w-[1440px] flex items-center   mx-auto text-primary font-productSans  px-4">
        <div className="w-full h-full sm:min-h-[300px] flex flex-col items-start justify-center pt-6 sm:pt-0 gap-4 lg:gap-6 lg:pl-20 xl:ml-28 max-w-[513px] sm:max-w-[300px] lg:max-w-[513px] ">
          <h1 className="text-3xl lg:text-5xl font-bold font-volkhov">
            Baixe seu exame em poucos cliques
          </h1>
          <p className="text-sm font-productSans lg:whitespace-nowrap">
            Acesse nosso portal de exames e tenha acesso aos laudos do seu pet!
          </p>
          <Button
            className="bg-primary rounded-[10px] min-h-[60px] text-[18px]"
            onClick={handleGoToExamPortal}
          >
            Download de Exames
          </Button>
        </div>

        <Image
          src="/CATDOG-A-1.png"
          alt="catdog"
          width={766}
          height={1000}
          className="w-full h-auto max-w-[397px] lg:max-w-[455px] xl:right-40 absolute bottom-0 right-0 2sm:right-5"
        />
      </div>
    </div>
  );
}
