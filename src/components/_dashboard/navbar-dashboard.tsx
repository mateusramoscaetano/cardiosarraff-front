import Image from "next/image";
import { NavbarDashboardButton } from "./navbar-dashboard-button";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import cn from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="2xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="2xl:hidden fixed left-0 top-0 bg-primary w-64 min-h-screen px-3 pt-4 pb-4 z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="w-full mb-8 mt-4"
              >
                <Image src="/CARDIO-SARRAFF-white.svg" width={159} height={25} alt="logo" />
              </motion.div>
              <nav>
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  className="font-semibold text-sm mb-[22px] text-white"
                >
                  Navegar
                </motion.p>
                {user?.user.role === "adm" ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.2 }}
                    >
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                    >
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.2 }}
                    >
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
                    </motion.div>
                  </>
                ) : user?.user.role === "doctor" ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.2 }}
                    >
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                    >
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
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
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
                  </motion.div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="hidden 2xl:block bg-primary w-fit min-w-[200px] min-h-screen px-3 pt-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="w-full mt-4 mb-12"
        >
          <Image src="/CARDIO-SARRAFF-white.svg" width={159} height={25} alt="logo" />
        </motion.div>
        <nav>
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="font-semibold text-sm mb-[22px] text-center text-white"
          >
            Navegar
          </motion.p>
          {user?.user.role === "adm" || user?.user.role === "doctor" ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.2 }}
              >
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
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
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
            </motion.div>
          )}
        </nav>
      </motion.div>
    </>
  );
}
