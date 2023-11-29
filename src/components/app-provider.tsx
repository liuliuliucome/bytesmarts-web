"use client";

import { appStore } from "@/store";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { createContainer } from "unstated-next";
import { ThemeValues } from "./ThemeContainer/conts";
import { useSliceStore } from "@/lib/slice-store";
import { LocalesUtil } from "@/utils";

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

    useEffect(() => {
      appStore.init({ lang: _props.locale });
    }, [_props.locale]);

    const setTheme = useCallback(
      (value: ThemeValues) => {
        nextSetTheme(value);
        appStore.setTheme(value);
      },
      [nextSetTheme],
    );
    const setLang = useCallback((lang: I18n.Locale) => {
      const newUrl = LocalesUtil.replaceLocale(window.location.pathname, lang);
      window.location.replace(newUrl);
    }, []);

    return {
      theme: appState[0].theme,
      lang: appState[0].lang,
      setTheme,
      setLang,
    };
  },
);
