"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useGetUserQuery } from "@/lib/features/user/user-api-slice";

export const Nav = () => {
  const pathname = usePathname();
  const { data: user } = useGetUserQuery();

  return (
    <Fragment>
      <nav>
        <Link className="mr-2" href="/client">
          Client
        </Link>
        &nbsp; &nbsp;
        <Link className="mr-2" href="/location">
          Location
        </Link>
      </nav>
      <br />
      <br />
      Path Name: {pathname}
      <br />
      User Name: {user?.name}
    </Fragment>
  );
};
