import { createContainer } from "unstated-next";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useCallback, useEffect, useMemo } from "react";
import {
  APP_THEME_STORAGE_KEY,
  ThemeValues,
  defaultThemeState,
  getThemesList,
} from "./conts";

export type ThemeValueType = (typeof ThemeValues)[keyof typeof ThemeValues];

export type ThemeState = Omit<ThemeProviderProps, "children" | "themes"> & {
  themes: Array<ThemeValueType>;
};

export const { Provider: AppThemeProvider, useContainer: useAppTheme } =
  createContainer((props?: ThemeProviderProps) => {
    const { theme, setTheme: nextSetTheme } = useTheme();

    const setTheme = useCallback(
      (value: ThemeValues) => {
        nextSetTheme(value);

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

    useEffect(() => {
      if (typeof window !== "undefined") {
        const localTheme = localStorage.getItem(APP_THEME_STORAGE_KEY);
        if (theme !== localTheme) {
          setTheme((localTheme as ThemeValues) || ThemeValues.SYSTEM);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { theme: theme as ThemeValueType, setTheme };
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
