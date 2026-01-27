import Image from "next/image";
import { motion } from "framer-motion";

interface IHeadCardProps {
  source: string;
  alt: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  title?: string;
  text: string;
}

export function HeadCard({
  source,
  alt,
  height,
  width,
  title,
  text,
}: IHeadCardProps) {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="
        xl:w-[367px] xl:h-[137px]
        lg:w-[300px] lg:h-[100px]
        md:w-[367px] md:h-[137px]
       

        
        rounded-xl drop-shadow-md bg-white flex items-center flex-row p-4 gap-y-4 gap-x-6"
      >
        <div className={`w-${width} h-${height}`}>
          <Image src={source} width={width} height={height} alt={alt} />
        </div>
        <div>
          <div className="text-[18px] font-bold text-primary">{title}</div>
          <div className="text-[13px] text-black w-[183px]">{text}</div>
        </div>
      </motion.div>
    </>
  );
}
