"use client";

import { appStore } from "@/store";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { createContainer } from "unstated-next";
import { ThemeValues } from "./ThemeContainer/conts";
import { useSliceStore } from "@/lib/slice-store";
import { logger } from "@/utils/pulgins";

type AppProviderProps = {
  locale: I18n.Locale;
};

export const { Provider: AppProvider, useContainer: useApp } = createContainer(
  (props?: AppProviderProps) => {
    const _props = props as AppProviderProps;
    const { setTheme: nextSetTheme } = useTheme();

    const appState = useSliceStore(() => {
      // ssr defaul value
      return appStore.setDefaultState({
        lang: _props.locale,
        theme: ThemeValues.DARK,
      });
    });

    logger("AppProvider", _props, appState[0]);

    useEffect(() => {
      appStore.init({ lang: _props.locale });
    }, []);

    const setTheme = useCallback(
      (value: ThemeValues) => {
        nextSetTheme(value);
        appStore.setTheme(value);
      },
      [nextSetTheme],
    );

    return {
      ...appState[0],
      setTheme,
      setLang: appStore.setLang,
    };
  },
);
