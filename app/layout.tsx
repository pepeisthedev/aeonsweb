import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { League_Gothic } from "next/font/google";
import "./globals.css";

import Head from "next/head";

import localFont from 'next/font/local'

import Nav from './components/Nav'
import NavBar from "./components/Nav";
import MobileNav from "./components/MobileNav";
import NewNav from "./components/NewNav";
import RepNavBar from "./components/RepNavbar";
import background from '../public/blackaeonsbg.png'
import TestNavBar from "./components/TestNavbar";

const inter = Inter({ subsets: ["latin"] });
const league_gothic = League_Gothic({ subsets: ["latin"] })

const edo = localFont({
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
  description: "Hello mfers",
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    images: ['/Aeons_Preview.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${edo.variable} ${inter.className} ${league_gothic.className}`}>
      
       
        <Nav />
        {children}
      </body>
    </html>
  );
}
