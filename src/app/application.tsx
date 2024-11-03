"use client";

import React, { useEffect } from "react";
import { User } from "./user/user";
import { UserState, useUserStore } from "./user/user-store";
import { Client } from "./client/client";
import { ClientState, useClientStore } from "./client/client-store";
import { useErrorStore, ErrorState } from "./common/error-store";
import { UserRepository } from "./user/user-repository";
import { ClientRepository } from "./client/client-repository";

const Application = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user: User | undefined = useUserStore((state: UserState) => state.user);
  const client: Client | undefined = useClientStore(
    (state: ClientState) => state.client
  );

  const { setClient } = useClientStore((state: ClientState) => state);
  const { setUser } = useUserStore((state: UserState) => state);

  const { clearErrorMessage, setErrorMessage } = useErrorStore(
    (state: ErrorState) => state
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        clearErrorMessage();
        const user: User = await UserRepository.get();
        setUser(user);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };

    const fetchClientData = async (clientId: string) => {
      try {
        clearErrorMessage();
        const client: Client = await ClientRepository.get(clientId);
        setClient(client);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };
    if (!user) {
      fetchUserData();
    }

    if (user && user.clientIds && !client) {
      fetchClientData(user.clientIds[0]);
    }
  }, [user, client, setClient, setUser, clearErrorMessage, setErrorMessage]);

  return <main>{user && client && children}</main>;
};

export { Application };
