import Image from "next/image";
interface ICircleAspasIconsProps {}

export function CircleAspasIcons({}: ICircleAspasIconsProps) {
  return (
    <>
      <div
        className="rounded-full w-[54px] h-[54px] bg-primary flex items-center justify-center absolute
      -top-6
      "
      >
        <Image src="/objects.png" width={31} height={21} alt="inverted comma" />
      </div>
    </>
  );
}
