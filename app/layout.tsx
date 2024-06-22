import {Inter} from "next/font/google";
import {League_Gothic} from "next/font/google";
import "./globals.css";

import Head from "next/head";

import localFont from 'next/font/local'

import Nav from './components/Nav'

const inter = Inter({subsets: ["latin"]});
const league_gothic = League_Gothic({subsets: ["latin"]})

const edo = localFont({
    src: [
        {
            path: '../public/fonts/edo.ttf',
            weight: '800',
        },
    ],
    variable: '--font-edo',
})


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Head>
            <title>Aeons new preview title</title>
            <meta name="description" content="Testing an description"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta property="og:image" content="/Aeons_Preview.png"/>
            <meta property="og:description" content="This is an Awesome project"/>
            <meta property="og:url" content="https://bro-check-this-gallery.vercel.app"/>
        </Head>
        <body className={`${edo.variable} ${inter.className} ${league_gothic.className}`}>
            <Nav/>
            {children}
        </body>
        </html>
    );
}
