import { create } from "zustand";

export interface ErrorState {
  errorMessage: string | undefined;
  clearErrorMessage(): void;
  setErrorMessage(errorMessage: string): void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: undefined,
  clearErrorMessage: () =>
    set((state: ErrorState) => ({
      ...state,
      errorMessage: undefined,
    })),
  setErrorMessage: (errorMessage: string) =>
    set((state: ErrorState) => ({
      ...state,
      errorMessage,
    })),
}));
