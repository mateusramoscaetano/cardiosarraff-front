import Image from "next/image";
import { NavbarDashboardButton } from "./navbar-dashboard-button";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import cn from "@/utils/cn";

interface INavBarDashboardProps {
  setPage: Dispatch<SetStateAction<string | undefined>>;
  currentPage: string | undefined;
  disabled: boolean;
}

export function NavBarDashboard({
  setPage,
  currentPage,
  disabled,
}: INavBarDashboardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handlePage(page: string) {
    router.push("/crm/dashboard");
    setPage(page);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      {/* Botão de menu para mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          "2xl:hidden fixed top-3 left-4 z-50 bg-primary text-white rounded-full p-2 shadow-lg",
          {
            "bg-white text-primary": isMobileMenuOpen,
          }
        )}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="2xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40 ">
          <div className="bg-primary w-64 min-h-screen px-3 py-4 ">
            <div className="w-full mb-8 mt-16">
              <Image src="/CARDIO-SARRAFF-white.svg" width={159} height={25} alt="logo" />
            </div>
            <nav>
              <p className="font-semibold text-sm mb-[22px]  text-white">
                Navegar
              </p>
              {user?.user.role === "adm" ? (
                <>
                  <NavbarDashboardButton
                    id="report"
                    label="Laudos"
                    icon="/document-icon.png"
                    onClick={() => {
                      disabled ? handlePage("report") : setPage("report");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "report"}
                  />
                  <NavbarDashboardButton
                    id="client"
                    label="Clientes"
                    icon="/person-icon.png"
                    onClick={() => {
                      disabled ? handlePage("client") : setPage("client");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "client"}
                  />
                  <NavbarDashboardButton
                    id="clinic"
                    label="Clínicas"
                    icon="/clinic-icon.png"
                    onClick={() => {
                      disabled ? handlePage("clinic") : setPage("clinic");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "clinic"}
                  />
                  <NavbarDashboardButton
                    id="doctor"
                    label="Doutores"
                    icon="/doctor-icon.png"
                    onClick={() => {
                      disabled ? handlePage("doctor") : setPage("doctor");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "doctor"}
                  />
                </>
              ) : user?.user.role === "doctor" ? (
                <>
                  <NavbarDashboardButton
                    id="report"
                    label="Laudos"
                    icon="/document-icon.png"
                    onClick={() => {
                      disabled ? handlePage("report") : setPage("report");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "report"}
                  />
                  <NavbarDashboardButton
                    id="client"
                    label="Clientes"
                    icon="/person-icon.png"
                    onClick={() => {
                      disabled ? handlePage("client") : setPage("client");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "client"}
                  />
                  <NavbarDashboardButton
                    id="clinic"
                    label="Clínicas"
                    icon="/clinic-icon.png"
                    onClick={() => {
                      disabled ? handlePage("clinic") : setPage("clinic");
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={currentPage === "clinic"}
                  />
                </>
              ) : (
                <NavbarDashboardButton
                  id="report"
                  label="Laudos"
                  icon="/document-icon.png"
                  onClick={() => {
                    disabled ? handlePage("report") : setPage("report");
                    setIsMobileMenuOpen(false);
                  }}
                  isActive={currentPage === "report"}
                />
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Navbar visível apenas em md+ */}
      <div className="hidden 2xl:block bg-primary w-fit min-w-[200px] min-h-screen px-3">
        <div className="w-full mt-6 mb-12 ">
          <Image src="/CARDIO-SARRAFF-white.svg" width={159} height={25} alt="logo" />
        </div>  
        <nav>
          <p className="font-semibold text-sm mb-[22px] text-center">Navegar</p>
          {user?.user.role === "adm" || user?.user.role === "doctor" ? (
            <>
              <NavbarDashboardButton
                id="report"
                label="Laudos"
                icon="/document-icon.png"
                onClick={() => {
                  disabled ? handlePage("report") : setPage("report");
                  setIsMobileMenuOpen(false);
                }}
                isActive={currentPage === "report"}
              />
              <NavbarDashboardButton
                id="client"
                label="Clientes"
                icon="/person-icon.png"
                onClick={() => {
                  disabled ? handlePage("client") : setPage("client");
                  setIsMobileMenuOpen(false);
                }}
                isActive={currentPage === "client"}
              />
              <NavbarDashboardButton
                id="clinic"
                label="Clínicas"
                icon="/clinic-icon.png"
                onClick={() => {
                  disabled ? handlePage("clinic") : setPage("clinic");
                  setIsMobileMenuOpen(false);
                }}
                isActive={currentPage === "clinic"}
              />
              <NavbarDashboardButton
                id="doctor"
                label="Doutores"
                icon="/doctor-icon.png"
                onClick={() => {
                  disabled ? handlePage("doctor") : setPage("doctor");
                  setIsMobileMenuOpen(false);
                }}
                isActive={currentPage === "doctor"}
              />
            </>
          ) : (
            <NavbarDashboardButton
              id="report"
              label="Laudos"
              icon="/document-icon.png"
              onClick={() => {
                disabled ? handlePage("report") : setPage("report");
                setIsMobileMenuOpen(false);
              }}
              isActive={currentPage === "report"}
            />
          )}
        </nav>
      </div>
    </>
  );
}
