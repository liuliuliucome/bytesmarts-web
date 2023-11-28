import { ThemeValues, getThemesList } from "@/components/ThemeContainer/conts";
import i18nConfig from "config/i18n.config";
import { APP_LOCALE_STORAGE_KEY, APP_THEME_STORAGE_KEY } from "./const";
import { SliceStore } from "@/lib/slice-store";
import { LocalesUtil } from "@/utils";

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

  static setLocalTheme(value: ThemeValues) {
    getThemesList().forEach((theme) => {
      document.documentElement.classList.remove(theme);
    });
    document.documentElement.style.colorScheme = "";

    if (value !== ThemeValues.SYSTEM) {
      document.documentElement.classList.add(value);
      document.documentElement.style.colorScheme = value;
    }
    localStorage.setItem(APP_THEME_STORAGE_KEY, value);
  }

  init(props?: { lang?: I18n.Locale }) {
    this.setup(() => {
      const theme = this.getDefaultTheme();
      // const lang =
      //   props?.lang && LocalesUtil.isLocale(props?.lang)
      //     ? props.lang
      //     : this.getDefaultLocale();

      // this.emit(new AppStoreState(theme, lang));

      // rerender ui
      AppStore.setLocalTheme(theme);
    });
  }

  setTheme(value: ThemeValues) {
    this.emit(new AppStoreState(value, this.state.lang));
    AppStore.setLocalTheme(value);
  }
}
