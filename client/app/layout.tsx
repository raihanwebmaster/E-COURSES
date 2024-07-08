'use client'
import "./globals.css";
import { Poppins } from 'next/font/google'
import { Josefin_Sans } from "next/font/google";
import { useLoadUserQuery } from "@/redux/features/api/appSlice";
import Loader from "./components/Loader/Loader";
import Providers from "./lib/Providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins"
})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin"
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 min-h-screen`}>
        <Providers>
          <Custom>{children}</Custom>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return isLoading ?
    <Loader />
    :
    <>{children}</>
}
