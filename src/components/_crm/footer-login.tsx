import Image from "next/image";

interface IFooterLoginProps {}

export function FooterLogin({}: IFooterLoginProps) {
  return (
    <>
      <div className="w-full relative min-h-[100px] bg-primary mx-auto gap-8 px-8 flex  justify-center  ">
        <div className="flex mt-7 gap-8">
          <a
            href="https://linktr.ee/cardiosarraff"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/whats-icon.png"
              width={28}
              height={28}
              alt="whats icon"
              className="cursor pointer"
            />
          </a>
          <a
            href="https://www.instagram.com/cardiosarraff/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram-icon.png"
              width={28}
              height={28}
              alt="instagram icon"
              className="cursor pointer"
            />
          </a>
          <a href="mailto:contato@cardiosarraff.com.br">
            <Image
              src="/mail-icon.png"
              width={34.76}
              height={25.6}
              alt="mail icon"
              className="cursor pointer"
            />
          </a>
        </div>
        <div className="absolute  bottom-3 w-full flex justify-center">
          <Image
            src="/made-by-nestlab.png"
            width={135}
            height={17}
            alt="nestlab icon"
          />
        </div>
      </div>
    </>
  );
}
