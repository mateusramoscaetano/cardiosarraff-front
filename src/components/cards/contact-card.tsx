import Image from "next/image";

interface IContactCardProps {
  alt: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  source: string;
  text: string;
}

export function ContactCard({
  source,
  alt,
  height,
  width,
  text,
}: IContactCardProps) {
  return (
    <>
      <div className="w-[250px] min-h-full flex flex-col items-center justify-center rounded-full gap-2">
        <div className="rounded-full w-[86px] h-[86px] bg-[#EF8E53] flex items-center justify-center">
          <Image src={source} width={width} height={height} alt={alt} />
        </div>
        <div className=" flex items-center justify-center font-medium text-[14px] text-white w-full">
          {text}
        </div>
      </div>
    </>
  );
}
