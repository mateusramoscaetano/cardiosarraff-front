import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IBackButtonDetailProps {}

export function BackButtonDetail({}: IBackButtonDetailProps) {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.back()}
        className="rounded-[1.28rem] bg-white border-2 border-primary/70 p-1
         text-primary gap-2 text-sm  w-[120px] h-10 font-medium hover:text-white hover-parent
         dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:hover:bg-primary dark:hover:text-white"
      >
        <Image
          src="/right-arrow.png"
          width={13}
          height={13}
          alt="arrow"
          className="hover-image w-auto rotate-180"
        />
        Voltar
      </Button>
    </>
  );
}
