import Image from "next/image";

interface IUserCardProps {
  name: string;
  className?: string;
  image: string;
}

export function UserCard({ name, className, image }: IUserCardProps) {
  return (
    <>
      <div className={`flex gap-4  items-center justify-start ${className}`}>
        <div className="w-[54px] h-[54px] flex items-center justify-center rounded-full bg-primary">
          <Image
            src={image}
            width={54}
            height={54}
            alt="user icon"
            className="rounded-full"
          />
        </div>
        <span className="text-[13px] font-semibold text-black">{name}</span>
      </div>
    </>
  );
}
