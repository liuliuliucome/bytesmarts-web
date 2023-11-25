"use client";

import { useStore } from "@/hooks/useStore";
import { appStore } from "@/store";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { createContainer } from "unstated-next";
import { ThemeValues } from "./ThemeContainer/conts";

type AppProviderProps = {
  locale: I18n.Locale;
};

export const { Provider: AppProvider, useContainer: useApp } = createContainer(
  (props?: AppProviderProps) => {
    const { setTheme: nextSetTheme } = useTheme();
    const appState = useStore(appStore);

    useEffect(() => {
      appStore.init();
    }, []);

    const setTheme = useCallback(
      (value: ThemeValues) => {
        nextSetTheme(value);
        appStore.setTheme(value);
      },
      [nextSetTheme],
    );

    return {
      theme: appState[0].theme,
      lang: appState[0].lang,
      setTheme,
    };
  },
);
