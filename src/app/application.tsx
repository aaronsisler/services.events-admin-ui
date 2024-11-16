"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./store";

const Application = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  );
};

export { Application };
