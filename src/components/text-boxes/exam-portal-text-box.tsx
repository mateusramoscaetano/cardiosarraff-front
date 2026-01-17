"use client";
import { useEffect, useState } from "react";

interface IExamPortalTextBoxProps {}

export function ExamPortalTextBox({}: IExamPortalTextBoxProps) {
  return (
    <>
      <div className="absolute right-0 xl:right-40 2xl:right-80 top-[80px]  w-full px-11 max-w-[560px]">
        <div className="font-bold text-primary mb-4">---- Portal de exames</div>
        <div className="font-bold lg:text-[30px] 3sm:text-[16px] text-[#1e1e1e] dark:text-gray-100 lg:dark:text-[#1e1e1e]">
          Baixe seu exame em poucos cliques!
        </div>
        <div className="text-[11px] 2sm:text-[13px] dark:text-gray-300 text-[#1e1e1e] lg:dark:text-[#1e1e1e] ">
          Nunca foi tão fácil ter acesso aos exames do seu pet!
          <br /> Basta acessar ao lado com o login e senha fornecidos pelo seu
          Médico Veterinário!
        </div>
      </div>
    </>
  );
}
