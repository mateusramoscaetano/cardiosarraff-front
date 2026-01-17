"use client";

import { ReactNode, useState } from "react";
import { ClientContext, PageContext } from "./type";

interface Props {
  children: ReactNode;
}

export const ClientProvider = ({ children }: Props) => {
  const [id, setId] = useState<string | undefined>("");

  return (
    <ClientContext.Provider value={{ id, setId }}>
      {children}
    </ClientContext.Provider>
  );
};
