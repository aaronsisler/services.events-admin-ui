"use client";

import Link from "next/link";
import { UserState, useUserStore } from "../user/user-store";
import { User } from "../user/user";

const Header = () => {
  const user: User | undefined = useUserStore((state: UserState) => state.user);

  return (
    <header className="pb-2.5">
      <div className="">
        <Link href="/">Home</Link>&nbsp;
        <Link href="/client">Client</Link>&nbsp;
        <Link href="/organizer">Organizer</Link>&nbsp;
        <Link href="/location">Location</Link>
      </div>
      <div className="">
        <select
          onChange={(data: any) => {
            console.log(data);
          }}
        >
          {user?.clientIds?.map((clientId) => (
            <option key={clientId}>{clientId}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export { Header };
