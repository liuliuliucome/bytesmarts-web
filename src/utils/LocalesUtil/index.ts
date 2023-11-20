import workConfig from "config/workConfig";
import { isString } from "lodash";

const { locales, defaultLocale } = workConfig.i18n;

export type LocalType = (typeof locales)[number];

export class LocalesUtil {
  static toLocale(lang: string | undefined): LocalType {
    const value = isString(lang) ? lang.toLocaleLowerCase() : "";
    return value && LocalesUtil.isLocale(value) ? value : defaultLocale;
  }

  static getLocalesList() {
    return locales;
  }

  static isLocale(value?: string): value is LocalType {
    return isString(value) && !!value && locales.includes(value as LocalType);
  }

  static wrapLocale(value: string): LocalType {
    if (LocalesUtil.isLocale(value)) {
      return value;
    }

    return defaultLocale;
  }
}
