import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full min-h-screen items-center justify-center text-gray-600 bg-white flex flex-col gap-4  text-lg dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700">
      <Image src="/CARDIO-SARRAFF.svg" alt="logo" width={159} height={25} />
      Carregando...
    </div>
  );
}
