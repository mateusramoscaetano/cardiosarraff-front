"use client";
import { useRouter } from "next/navigation";
import HeadButton from "../buttons/head-button";
import { useUser } from "@/hooks/use-user";
import { QueryClient } from "react-query";

interface IErrorPageTextBoxProps {}

export function ErrorPageTextBox({}: IErrorPageTextBoxProps) {
  const router = useRouter();
  const { removeUser, user } = useUser();
  const queryClient = new QueryClient();

  const logout = () => {
    removeUser();
    queryClient.clear();

    router.push("/exam-portal");
  };

  function handleClick() {
    logout();
    router.push("/exam-portal");
  }

  return (
    <>
      <div className="absolute top-44 px-12">
        <div className="font-bold text-[18px] text-black mb-4">
          Opa! A gestão de laudos está disponível apenas para computador!
        </div>
        <div className="text-[#1e1e1e] text-[13px] mb-5">
          Clique no botão abaixo e volte para a página inicial!
        </div>
        <div className="flex items-center justify-center">
          <HeadButton
            label="Acesso do Cliente"
            size="large"
            className="text-[13px]"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
