import i18nConfig from "config/i18n.config";
import { isString } from "lodash";

export type LocalType = (typeof locales)[number];

const { locales, defaultLocale, localUrlReg } = i18nConfig;

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

  static getLocaleUrl(slugAsParams: string) {
    const hasLocale = localUrlReg.test(slugAsParams);
    return hasLocale ? slugAsParams.replace(localUrlReg, "") : slugAsParams;
  }
}
