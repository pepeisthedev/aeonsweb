import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import localFont from 'next/font/local'

// import Nav from './components/Nav'
import NavBar from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

const edoFont = localFont({
  src: [
    {
      path: '../public/fonts/edo.ttf',
      weight: '800',
    },
  ],
  variable: '--font-edo',
})

export const metadata: Metadata = {
  title: "Aeons Project",
  description: "Website for Aeons Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${edoFont.variable} ${inter.className}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
