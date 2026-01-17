"use client";

import { ClientCookiesProvider } from "./cookies";
import { AuthProvider } from "@/contexts/auth-context";
import { PageProvider } from "@/contexts/page-context";
import { ClientProvider } from "@/contexts/client-context";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ClientCookiesProvider value={[]}>
      <AuthProvider>
        <PageProvider>
          <ClientProvider>{children}</ClientProvider>
        </PageProvider>
      </AuthProvider>
    </ClientCookiesProvider>
  );
}
