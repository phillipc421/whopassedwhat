import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans, Bitter } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";

const open_sans = Open_Sans({ subsets: ["latin"] });
const bitter = Bitter({ subsets: ["latin"], variable: "--google-font-bitter" });

export const metadata: Metadata = {
  title: "Who Passed What?",
  description: "See which president passed* each public law!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${open_sans.className} ${bitter.variable}`}>
        <SiteHeader></SiteHeader>
        {children}
      </body>
    </html>
  );
}
