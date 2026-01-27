import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IDeleteButtonDetailProps {
  title: string;
}

export function DeleteButtonDetail({ title }: IDeleteButtonDetailProps) {
  return (
    <>
      <Button
        type="button"
        className="rounded-xl bg-error-bg justify-center hover:bg-error-bg p-1 text-white gap-2 text-sm  w-[160px] h-10 font-medium"
      >
        {title}
        <Image
          src="/delete-icon-detail.png"
          width={22}
          height={22}
          alt="arrow"
          className="w-auto "
        />
      </Button>
    </>
  );
}
