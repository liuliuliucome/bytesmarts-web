import { ThemeValues, getThemesList } from "@/components/ThemeContainer/conts";
import i18nConfig from "config/i18n.config";
import { APP_LOCALE_STORAGE_KEY, APP_THEME_STORAGE_KEY } from "./const";
import { SliceStore } from "@/lib/slice-store";

class AppStoreState {
  theme: ThemeValues;
  lang: I18n.Locale;

  constructor(theme: ThemeValues, lang: I18n.Locale) {
    this.theme = theme;
    this.lang = lang;
  }
}

export class AppStore extends SliceStore<AppStoreState> {
  constructor() {
    super(() => new AppStoreState(ThemeValues.LIGHT, i18nConfig.defaultLocale));
  }

  private getDefaultTheme = () => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(APP_THEME_STORAGE_KEY);
      if (value && getThemesList().includes(value as ThemeValues)) {
        return value as ThemeValues;
      }
    }
    return ThemeValues.SYSTEM as ThemeValues;
  };

  private getDefaultLocale = () => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(APP_LOCALE_STORAGE_KEY);
      if (value && i18nConfig.locales.includes(value as I18n.Locale)) {
        return value as I18n.Locale;
      }
    }
    return i18nConfig.defaultLocale as I18n.Locale;
  };

  init() {
    this.setup(() => {
      const theme = this.getDefaultTheme();
      const lang = this.getDefaultLocale();

      console.log("init app");

      this.emit(new AppStoreState(theme, lang));
    });
  }

  setTheme(value: ThemeValues) {
    getThemesList().forEach((theme) => {
      document.documentElement.classList.remove(theme);
    });
    document.documentElement.style.colorScheme = "";

    if (value !== ThemeValues.SYSTEM) {
      document.documentElement.classList.add(value);
      document.documentElement.style.colorScheme = value;
    }
    localStorage.setItem(APP_THEME_STORAGE_KEY, value);

    this.emit(new AppStoreState(value, this.state.lang));
  }
}
