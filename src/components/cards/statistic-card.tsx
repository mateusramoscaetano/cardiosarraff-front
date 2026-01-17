import Image from "next/image";
interface IStatisticCardProps {
  source: string;
  alt: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  number: string;
}

export function StatisticCard({
  source,
  alt,
  height,
  width,
  number,
}: IStatisticCardProps) {
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Image src={source} width={width} height={height} alt={alt} />
        <span className="font-bold text-[40px] text-black">{number}</span>
      </div>
    </>
  );
}
