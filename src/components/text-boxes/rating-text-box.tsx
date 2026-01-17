import { HeadButton } from "../buttons/head-button";

interface IRatingTextBoxProps {}

export function RatingTextBox({}: IRatingTextBoxProps) {
  return (
    <>
      <div className="flex flex-col gap-10 p-4">
        <div className="text-primary font-bold"> ------ Avaliações</div>
        <span
          className="font-bold lg:text-[40px] sm:text-[24px] text-black 
        2.5sm:w-[457px]
        3sm:w-[320px]
        
        "
        >
          O Que Nossos Clientes Dizem?
        </span>
        <div
          className="text-black text-[13px] flex flex-col gap-10 
        2.5sm:w-[543px]
        3sm:w-[320px]

        "
        >
          <span className="">
            Seu feedback é muito importante para nós. Valorizamos sua opinião
            sobre sua experiência conosco. Por favor, considere deixar sua
            avaliação para compartilhar como foi sua jornada. Agradecemos por
            confiar em nós para cuidar do coração do seu pet.
          </span>
        </div>
        <div className="flex 3sm:justify-center 2.5sm:justify-start">
          <HeadButton
            className="3sm:w-[320px] 2.5sm:w-[350px] align-middle"
            color="primary"
            label="Deixe sua Avaliação"
            size="large"
          />
        </div>
      </div>
    </>
  );
}
