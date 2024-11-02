"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useErrorStore, ErrorState } from "../common/error-store";
import { User } from "../user/user";
import { UserState, useUserStore } from "../user/user-store";
import { UserRepository } from "../user/user-repository";

const Header = () => {
  const user: User | undefined = useUserStore((state: UserState) => state.user);

  const { setUser } = useUserStore((state: UserState) => state);
  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearErrorMessage();
        const user: User = await UserRepository.get();
        setUser(user);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };
    fetchData();
  }, [setUser, clearErrorMessage, setErrorMessage]);

  return (
    <header className="mb-2.5 flex bg-slate-400">
      <div className="flex-grow-0 gap-10">
        <Link className="mr-2" href="/">
          Home
        </Link>
        <Link className="mr-2" href="/client">
          Client
        </Link>
        <Link className="mr-2" href="/organizer">
          Organizer
        </Link>
        <Link className="mr-2" href="/location">
          Location
        </Link>
      </div>
      <div className="pl-2.5">{user?.name || "No user found"}</div>
    </header>
  );
};

export { Header };
