"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function ToDoctors() {
  const router = useRouter();
  return (
    <div className="relative w-full h-full ">
      <Image
        src="/Vet_Dog.jpg"
        alt="to-doctor"
        width={1440}
        height={533}
        className="w-full h-full object-cover min-h-[400px] max-h-[700px] "
        priority
      />

      <div className="absolute top-0 left-0 w-full h-full text-white  bg-[#143236]/70  ">
        <div className="flex flex-col items-center justify-center h-full  mx-auto text-4xl gap-8 px-10 md:px-0 max-w-[451px]">
          <h1 className="text-white text-3xl lg:text-5xl font-bold whitespace-nowrap font-volkhov">
            Para Veterinários
          </h1>
          <p className="text-center text-sm lg:text-lg font-light">
            Nunca foi tão fácil solicitar seus exames!
            <br /> Para preencher a requisição, basta clicar no botão abaixo e
            realizar o seu login!
          </p>

          <Button
            onClick={() => router.push("/exam-portal")}
            className="bg-exa-pink hover:bg-exa-pink/90 hover:shadow-2xl font-semibold rounded-[10px] text-[#1e1e1e] transition-all duration-300  min-h-[40px] md:min-h-[60px] text-[18px]"
          >
            Requisição de exames
          </Button>
        </div>
      </div>
    </div>
  );
}
