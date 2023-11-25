import { createContainer } from "unstated-next";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useCallback, useMemo, useState } from "react";
import { ThemeValues, defaultThemeState, getThemesList } from "./conts";
import i18nConfig from "config/i18n.config";
import { APP_THEME_STORAGE_KEY } from "@/store/const";

export type ThemeValueType = (typeof ThemeValues)[keyof typeof ThemeValues];

export type ThemeState = Omit<ThemeProviderProps, "children" | "themes"> & {
  themes: Array<ThemeValueType>;
};

export const { Provider: AppThemeProvider, useContainer: useAppTheme } =
  createContainer((props?: ThemeProviderProps) => {
    const { setTheme: nextSetTheme } = useTheme();

    const [appState, setAppState] = useState({
      theme: ThemeValues.LIGHT,
      lang: i18nConfig.defaultLocale,
    });

    const setTheme = useCallback(
      (value: ThemeValues) => {
        nextSetTheme(value);
        setAppState((prev) => ({ ...prev, theme: value }));

        getThemesList().forEach((theme) => {
          document.documentElement.classList.remove(theme);
        });
        document.documentElement.style.colorScheme = "";

        if (value !== ThemeValues.SYSTEM) {
          document.documentElement.classList.add(value);
          document.documentElement.style.colorScheme = value;
        }
        localStorage.setItem(APP_THEME_STORAGE_KEY, value);
      },
      [nextSetTheme],
    );

    // useEffect(() => {
    //   setTheme(initTheme());
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return { ...appState, setTheme: setTheme };
  });

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const _props = useMemo(() => {
    const defProps = defaultThemeState();
    return { ...defProps, ...props };
  }, [props]);

  return (
    <AppThemeProvider initialState={_props}>
      <NextThemesProvider {..._props}>{children}</NextThemesProvider>
    </AppThemeProvider>
  );
}
