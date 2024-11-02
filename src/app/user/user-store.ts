import { create } from "zustand";

import { User } from "./user";

export interface UserState {
  user: User | undefined;
  setUser(user: User): void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user: User) =>
    set((state: UserState) => ({
      ...state,
      user,
    })),
}));
