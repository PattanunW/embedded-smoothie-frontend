import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions"
import NextAuthProvider from "@/providers/NextAuthProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-robotoMono"
});

export const metadata: Metadata = {
  title: "ARM SPEED BUS",
  description: "Car Renting Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <NextAuthProvider session={session}>
        <TopMenu/>
        <main className="pt-[10px]">
          {children}
        </main>
        <Footer/>
        </NextAuthProvider>
        </body>
    </html>
  );
}
