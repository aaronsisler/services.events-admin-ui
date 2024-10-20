import type { Metadata } from "next";
import Link from "next/link";

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
        <header className="pb-2.5">
          <Link href="/">Home</Link>&nbsp;
          <Link href="/client">Client</Link>&nbsp;
          <Link href="/organizer">Organizer</Link>&nbsp;
          <Link href="/location">Location</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
