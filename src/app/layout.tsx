import type { Metadata } from "next";
import { Poppins, Volkhov } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "./theme-provider";
import localFont from "next/font/local";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "../components/google-tag-manager";

const poppings = Poppins({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const productSans = localFont({
  src: "../fonts/ProductSansRegular.ttf",
  display: "swap",
});

const volkov = localFont({
  src: "../fonts/Volkhov-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cardio Sarraff",
  description: "Cardio Sarraff",
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
        className={`${poppings.className} ${productSans.className} ${volkov.className} notranslate`}
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
