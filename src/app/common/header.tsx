"use client";

import Link from "next/link";

import { User } from "../user/user";
import { UserState, useUserStore } from "../user/user-store";

const Header = () => {
  const user: User | undefined = useUserStore((state: UserState) => state.user);

  return (
    <header className="mb-2.5 flex">
      <div className="flex-grow-0">
        <Link className="mr-2" href="/">
          Home
        </Link>
        <Link className="mr-2" href="/organizer">
          Organizer
        </Link>
        <Link className="mr-2" href="/location">
          Location
        </Link>
        <Link className="mr-2" href="/event">
          Event
        </Link>
        <Link className="mr-2" href="/counter">
          Counter
        </Link>
      </div>
      <div className="pl-2.5">{user?.name || "No user found"}</div>
    </header>
  );
};

export { Header };
