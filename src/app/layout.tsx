import type { ReactNode } from "react";
import type { Metadata } from "next";

import { StoreProvider } from "./store-provider";
import { Nav } from "./components/nav";

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Events Admin",
  description: "Events Admin UI that calls the Events Admin Service for data",
};

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
