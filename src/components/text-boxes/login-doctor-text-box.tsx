interface ILoginDoctorTextBoxProps {}

export function LoginDoctorTextBox({}: ILoginDoctorTextBoxProps) {
  return (
    <>
      <div className="absolute right-0 xl:right-40 top-[80px]  w-full px-11 max-w-[560px]">
        <div className="font-bold   text-primary ">---- Portal de Exames</div>
        <div className="font-bold lg:text-[30px] 3sm:text-[16px] text-[#1e1e1e] dark:text-gray-100 lg:dark:text-[#1e1e1e]">
          Ola Dr (a), <br />
          faça seu login ao lado!
        </div>
      </div>
    </>
  );
}
