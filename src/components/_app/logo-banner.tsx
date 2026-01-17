import Image from "next/image";

export function LogoBanner() {
  return (
    <div className="w-full h-full min-h-[200px] sm:min-h-[150px] sm:max-h-[150px] max-h-[200px] flex items-center justify-center overflow-hidden">
      <Image
        src="/logo-banner.png"
        alt="logo-banner"
        width={2560}
        height={400}
        className="min-w-[1000px] h-auto object-cover "
      />
    </div>
  );
}
