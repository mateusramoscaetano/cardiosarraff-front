import Image from "next/image";

interface IAboutUsTextBoxProps {}

export function AboutUsTextBox({}: IAboutUsTextBoxProps) {
  return (
    <>
      <div className="flex lg:w-[568px] 3sm:w-[300px] flex-col justify-center lg:ml-0 3sm:ml-0">
        <div className="text-primary font-bold"> ------ Quem somos</div>
        <div
          className="text-[40px] font-bold text-black 
        lg:w-[568px] 
        sm:w-[500px] 
        3sm:w-[300px]
        mb-5 leading-tight"
        >
          Amor e cuidado para o coraçãozinho do seu pet
        </div>
        <div className="text-black font-normal text-[13px] lg:w-[568px] 3sm:w-[300px] mb-10">
          Nosso compromisso é com o amor e a saúde dos corações peludos! <br />
          Oferecemos cuidados personalizados e tratamentos avançados para
          garantir que seu pet tenha um coraçãozinho cheio de amor e vitalidade.
        </div>
      </div>
    </>
  );
}
