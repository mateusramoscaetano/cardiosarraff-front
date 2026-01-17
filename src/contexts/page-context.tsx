"use client";

import { ReactNode, useState } from "react";
import { PageContext } from "./type";

interface Props {
  children: ReactNode;
}

export const PageProvider = ({ children }: Props) => {
  const [page, setPage] = useState<string | undefined>("report");

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
