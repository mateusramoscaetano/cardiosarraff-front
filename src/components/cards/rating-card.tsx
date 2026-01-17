import { CircleAspasIcons } from "../icons/circle-aspas-icon";
import { DotsRating } from "../icons/dots-rating";
import { UserCard } from "./user-card";

interface IRatingCardProps {
  name: string;
  image: string;
  text: string;
}

export function RatingCard({ name, image, text }: IRatingCardProps) {
  return (
    <>
      <div
        className="flex flex-col 
      sm:w-[538px] sm:h-[258px] 
      2.5sm:w-[500px] 2.5sm:h-[258px]
      2sm:w-[400px] 2sm:h-[270px]
      3sm:w-[320px] 3sm:h-[300px]

      bg-[#f1f4f5] p-10 relative rounded-[24px] border-black"
      >
        <div className="mt-8">{text}</div>
        <UserCard className="mt-8" name={name} image={image} />
        <CircleAspasIcons />
        <DotsRating />
      </div>
    </>
  );
}
