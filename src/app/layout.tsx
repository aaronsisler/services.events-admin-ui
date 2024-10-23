import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "./common/footer";
import { Header } from "./common/header";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Events Admin",
  description: "Events Admin UI that calls the Events Admin Service for data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
