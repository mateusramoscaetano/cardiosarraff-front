"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Poppins } from "next/font/google";

const poppings = Poppins({
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
      <div className={poppings.className}>{children}</div>
    </QueryClientProvider>
  );
}
