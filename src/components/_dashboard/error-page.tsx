import Image from "next/image";
import { Footer } from "../_app/footer";
import { Header } from "../_app/header";
import { ErrorPageTextBox } from "../text-boxes/error-page-text-box";
import { FooterLogin } from "../_crm/footer-login";

interface IErrorPageProps {}

export function ErrorPage({}: IErrorPageProps) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center  bg-primary">
        <Header />
        <div className=" flex w-full relative h-[700px] flex-col items-center justify-center bg-primary p-10 text-white dark:border-r">
          <Image
            src="/logindoctor.png"
            layout="fill"
            alt="Authentication"
            className="inset-0 object-cover w-full h-full relative"
          />
        </div>
        <FooterLogin />
        <ErrorPageTextBox />
      </main>
    </>
  );
}
