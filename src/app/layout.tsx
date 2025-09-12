import type { Metadata } from "next";
import "./globals.css";
import fonts from "@/fonts/fonts";
import { appConfig } from "@/config/appConfig";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
    <html lang="en">
      <body
        className={`${fonts.bricolage.className} bg-[#f8fafc] antialiased dark:bg-[#020617]`}
      >
        <ThemeProvider>
          <Header/>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
