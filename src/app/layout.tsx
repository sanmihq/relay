import type { Metadata } from "next";
import "./globals.css";
import fonts from "@/fonts/fonts";
import { appConfig } from "@/config/appConfig";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Providers } from "./provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts.geist.className} bg-[#f8fafc] antialiased dark:bg-[#020617]`}
      >
        <Providers>
          <Toaster richColors closeButton style={{ fontFamily: "inherit" }} />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
