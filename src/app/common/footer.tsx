"use client";

import React from "react";
import { ErrorState, useErrorStore } from "../state/error-store";

const Footer = () => {
  const errorMessage: string | undefined = useErrorStore(
    (state: ErrorState) => state.errorMessage
  );

  if (errorMessage) {
    return <footer>{errorMessage}</footer>;
  }

  return <React.Fragment></React.Fragment>;
};

export { Footer };
