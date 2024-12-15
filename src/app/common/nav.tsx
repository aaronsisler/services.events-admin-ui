"use client";

import { Fragment } from "react";
import Link from "next/link";

import { useGetUserQuery } from "@/lib/features/user/user-api-slice";

export const Nav = () => {
  const { isLoading, data: user } = useGetUserQuery();

  return (
    <Fragment>
      <nav className="flex">
        <Link className="mr-2" href="/client">
          Client
        </Link>
        &nbsp;&nbsp;
        <Link className="mr-2" href="/location">
          Location
        </Link>
        &nbsp;&nbsp;
        <Link className="mr-2" href="/organizer">
          Organizer
        </Link>
        &nbsp;&nbsp;
        <Link className="mr-2" href="/event">
          Event
        </Link>
        &nbsp;&nbsp;
        <Link className="mr-2" href="/event-schedule">
          Event Schedule
        </Link>
        <Link className="mr-2" href="/event-schedule/genesis">
          Create Event Schedule
        </Link>
        <div className="text-right flex-grow">
          User Name: {isLoading ? "Loading" : user?.name}
        </div>
      </nav>
    </Fragment>
  );
};
