'use client'
import "./globals.css";
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from "next/font/google";
import { useEffect, useState } from 'react';
import Loader from "./components/Loader/Loader";
import Providers from "./lib/Providers/Providers";
import { apiSlice, useLoadUserQuery } from "../redux/features/api/appSlice";
import { store } from "@/redux/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins"
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin"
});

const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
  await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    initializeApp();
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 min-h-screen`}>
          <Providers>
            {isMounted ? <Custom>{children}</Custom> : null}
          </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return isLoading ? <Loader /> : <>{children}</>;
};
