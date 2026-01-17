"use client";
import { BackButtonDetail } from "@/components/buttons/back-button-detail";
import { DialogDeleteEditPage } from "../dialogs/dialog-delete-edit-page";
import { useState } from "react";
import { DialogDeletePetPage } from "../dialogs/pet/dialog-delete-pet-page";
import { useUser } from "@/hooks/use-user";

interface IHeaderDetailProps {
  title: string;
  subtitle: string;
  page: "Cliente" | "Pet";
  id: string;
}

export function HeaderDetail({
  subtitle,
  title,
  page,
  id,
}: IHeaderDetailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();
  return (
    <>
      <div className="w-full flex flex-col xl:flex-row gap-4 sm:gap-0 mb-6 sm:mb-9 dark:text-gray-100 dark:bg-zinc-800">
        <div className="gap-3 sm:gap-5 flex w-full items-center">
          <BackButtonDetail />
          <div className="text-black w-full">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl break-words dark:text-gray-100">
              {title}
            </h1>
            <p className="font-medium text-xs sm:text-sm text-[#1e1e1e] break-words dark:text-gray-300">
              {subtitle}
            </p>
          </div>
        </div>
        {user?.user.role === "adm" && (
          <div className="flex w-full sm:w-auto items-center gap-6 justify-end">
            {page === "Cliente" ? (
              <DialogDeleteEditPage
                entity="Cliente excluído"
                onClose={() => setIsOpen(false)}
                page={page}
                id={id}
              />
            ) : (
              <DialogDeletePetPage
                entity="Pet excluído"
                onClose={() => setIsOpen(false)}
                page={page}
                id={id}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
