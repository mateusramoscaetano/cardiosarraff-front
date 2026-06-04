interface IExamPortalTextBoxProps {}

export function ExamPortalTextBox({}: IExamPortalTextBoxProps) {
  return (
    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 right-0 xl:right-40 2xl:right-80 top-[120px] lg:top-[80px] w-full px-11 max-w-[560px] text-center lg:text-left z-10">
      <div className="font-bold text-primary mb-4">Portal de exames</div>
      <div className="font-bold lg:text-[30px] text-[#1e1e1e]">
        Baixe seu exame em poucos cliques!
      </div>
      <div className="text-[13px] text-[#1e1e1e] mt-2">
        Nunca foi tão fácil ter acesso aos exames do seu pet!
        <br />
        Basta acessar ao lado com o login e senha fornecidos pelo seu Médico
        Veterinário!
      </div>
    </div>
  );
}
