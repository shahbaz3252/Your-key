import type { Metadata } from "next";
import { Questrial } from "next/font/google";

import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollRail from "./components/ScrollRail";

import { LanguageProvider } from "./context/LanguageContext";


const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-questrial",
});


export const metadata: Metadata = {
  title: "YourKey | UAE Real Estate",
  description:
    "Discover exceptional properties, communities and real estate opportunities across the UAE.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={questrial.variable}
    >
      <body className={questrial.className}>

        <LanguageProvider>

          <Header />

          <ScrollRail />

          {children}

          <Footer />

        </LanguageProvider>

      </body>
    </html>
  );
}