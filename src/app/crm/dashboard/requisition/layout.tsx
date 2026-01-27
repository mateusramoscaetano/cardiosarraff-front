"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RequisitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className={inter.className}>{children}</div>
    </QueryClientProvider>
  );
}
