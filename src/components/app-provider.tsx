"use client";

import { LocalType } from "@/utils";
import { createContainer } from "unstated-next";

type AppProviderProps = {
  locale: LocalType;
};

export const { Provider: AppProvider, useContainer: useApp } = createContainer(
  (props?: AppProviderProps) => {
    return props as AppProviderProps;
  },
);
