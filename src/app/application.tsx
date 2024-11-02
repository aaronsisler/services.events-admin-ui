"use client";

import { useEffect } from "react";

import { useErrorStore, ErrorState } from "./common/error-store";
import { User } from "./user/user";
import { UserState, useUserStore } from "./user/user-store";
import { UserRepository } from "./user/user-repository";

const Application = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

  return <main>{user && children}</main>;
};

export { Application };
