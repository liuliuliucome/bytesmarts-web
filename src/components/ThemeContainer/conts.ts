import { APP_THEME_STORAGE_KEY } from "@/store/const";
import { ThemeState } from ".";

export enum ThemeValues {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export const getThemesList = () => [
  ThemeValues.DARK,
  ThemeValues.LIGHT,
  ThemeValues.SYSTEM,
];

export const ThemesOptions = [
  { label: "light", value: ThemeValues.LIGHT, iconFont: "icon-qingtian" },
  { label: "dark", value: ThemeValues.DARK, iconFont: "icon-yueliang" },
  { label: "system", value: ThemeValues.SYSTEM, iconFont: "icon-system" },
];

export const defaultThemeState = (): ThemeState => ({
  themes: getThemesList(),
  // forcedTheme:
  enableSystem: true,
  // disableTransitionOnChange
  // enableColorScheme
  storageKey: APP_THEME_STORAGE_KEY,
  defaultTheme: ThemeValues.LIGHT,
  attribute: "class",
  // value
  // nonce
});
