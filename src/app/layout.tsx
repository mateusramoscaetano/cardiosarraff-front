import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "./theme-provider";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "../components/google-tag-manager";

const inter = Inter({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cardio Sarraff",
  description: "Cardio Sarraff",
  icons: {
    icon: "/favico.svg",
  },
   other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning translate="no">
  
      <body
        className={`${inter.className} notranslate`}
      >
        <GoogleTagManagerNoScript gtmId="GTM-W55W9RPD" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
