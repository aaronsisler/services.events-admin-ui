"use client";

import { User } from "./user/user";
import { UserState, useUserStore } from "./user/user-store";

const Application = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user: User | undefined = useUserStore((state: UserState) => state.user);

  return <main>{user && children}</main>;
};

export { Application };
