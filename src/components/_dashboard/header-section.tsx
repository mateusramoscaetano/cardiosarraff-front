"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { DialogCreateClient } from "../dialogs/client/dialog-create-client";
import { DialogCreateReport } from "../dialogs/report/dialog-create-report";
import { DialogCreateClinic } from "../dialogs/clinic/dialog-create-clinic";
import { DialogCreateDoctor } from "../dialogs/doctor/dialog-create-doctor";
import { useUser } from "@/hooks/use-user";
import { Button } from "../_app/ui/button";
import { useRouter } from "next/navigation";

interface IHeaderSectionProps {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  title: string;
  subtitle: string;
  placeholder: string;
  labelButton: string;
  page: string;
  hideSearch?: boolean;
}

export function HeaderSection({
  setSearch,
  labelButton,
  placeholder,
  subtitle,
  title,
  page,
  hideSearch = false,
}: IHeaderSectionProps) {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(searchValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;

    setSearchValue(value);
    if (value === "") {
      setSearch(undefined);
    }
  };

  function handleCreateRequisition() {
    router.push("/crm/dashboard/requisition");
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center mb-9 gap-4 md:gap-6">
      <div className="text-black md:flex-shrink-0">
        <h1 className="font-bold text-3xl dark:text-gray-100">{title}</h1>
        <p className="font-medium text-sm text-[#1e1e1e] dark:text-gray-300">
          {subtitle}
        </p>
      </div>
      {!hideSearch && (
        <div className="flex w-full items-center gap-2 md:w-auto md:flex-1 md:justify-end">
          <Input
            className="w-full md:w-fit border-none text-zinc-600 dark:text-gray-100 bg-[#f2f2f2] dark:bg-zinc-700 rounded-xl placeholder:text-[#b9b9b9] h-10"
            icon={true}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Button
            type="button"
            onClick={() => setSearch(searchValue || undefined)}
            className="md:hidden rounded-xl"
          >
            Buscar
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3 md:flex-shrink-0">
        {page === "client" && <DialogCreateClient isOnForm={false} />}
        {page === "report" &&
          (user?.user.role === "adm" || user?.user.role === "doctor") && (
            <>
              <DialogCreateReport isOnPetDetailPage={false} />
              <Button
                size="md"
                variant="primary"
                onClick={handleCreateRequisition}
                className="hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Nova Requisição
              </Button>
            </>
          )}
        {user?.user.role === "clinic" && (
          <Button
            size="md"
            variant="primary"
            onClick={handleCreateRequisition}
            className="hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Nova Requisição
          </Button>
        )}

        {page === "clinic" && <DialogCreateClinic isOnForm={false} />}
        {page === "doctor" && <DialogCreateDoctor isOnForm={false} />}
      </div>
    </div>
  );
}
