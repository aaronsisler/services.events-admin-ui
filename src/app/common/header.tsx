"use client";

import Link from "next/link";

const Header = () => (
  <header className="pb-2.5">
    <Link href="/">Home</Link>&nbsp;
    <Link href="/client">Client</Link>&nbsp;
    <Link href="/organizer">Organizer</Link>&nbsp;
    <Link href="/location">Location</Link>
  </header>
);

export { Header };
