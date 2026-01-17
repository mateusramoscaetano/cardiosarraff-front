import Image from "next/image";

export function AboutUs() {
  return (
    <div
      id="about"
      className="  w-full h-full flex flex-col bg-exa-pink/10 py-10 max-w-[1440px] items-center justify-between mx-auto text-primary font-productSans mt-24  sm:mt-52 xl:mt-40 gap-4  lg:flex-row-reverse relative"
    >
      <Image
        src="/plus.png"
        alt="bg_home"
        width={766}
        height={1000}
        className="w-24 h-24 ml-8 absolute top-10 lg:top-4 left-0 lg:ml-20 hidden sm:block"
      />

      <Image
        src="/dog-cat.png"
        alt="bg_home"
        width={766}
        height={1000}
        className="w-full h-auto lg:max-w-[757px] "
      />

      <div className="flex flex-col items-start justify-center gap-4 px-4 pl-8 lg:pl-20">
        <h1 className="text-base font-medium">Sobre nós</h1>
        <h2 className="text-3xl lg:text-5xl font-volkhov font-bold text-primary w-full antialiased ">
          Cuidar bem é a nossa <br /> maior especialidade.
        </h2>
        <p className="text-base font-productSans max-w-[474px]">
         Somos o primeiro centro de diagnóstico veterinário de São José dos Pinhais, com ambiente moderno, criado para oferecer um
          atendimento completo, seguro e acolhedor. Com estrutura de ponta e uma
          equipe apaixonada por cuidar, unimos tecnologia e sensibilidade para
          garantir o bem-estar do seu pet em todas as etapas.
        </p>
      </div>

      <Image
        src="/plus.png"
        alt="bg_home"
        width={766}
        height={1000}
        className="w-20 h-20 mr-8 absolute bottom-4 right-0"
      />
    </div>
  );
}
