"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <Fragment>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/quotes">Quotes</Link>
      </nav>
      <br />
      <br />
      Path Name: {pathname}
    </Fragment>
  );
};
