import i18nConfig from "config/i18n.config";
import { isString } from "lodash";

const { locales, defaultLocale, localUrlReg } = i18nConfig;

export class LocalesUtil {
  static toLocale(lang: string | undefined): I18n.Locale {
    const value = isString(lang) ? lang.toLocaleLowerCase() : "";
    return value && LocalesUtil.isLocale(value) ? value : defaultLocale;
  }

  static getLocalesList() {
    return locales;
  }

  static isLocale(value?: string): value is I18n.Locale {
    return isString(value) && !!value && locales.includes(value as I18n.Locale);
  }

  static wrapLocale(value: string): I18n.Locale {
    if (LocalesUtil.isLocale(value)) {
      return value;
    }

    return defaultLocale;
  }

  static getLocaleUrl(slugAsParams: string) {
    const hasLocale = localUrlReg.test(slugAsParams);
    return hasLocale ? slugAsParams.replace(localUrlReg, "") : slugAsParams;
  }
}
