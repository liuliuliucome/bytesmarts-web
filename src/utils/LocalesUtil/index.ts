import i18nConfig from "config/i18n.config";
import { isString } from "lodash";

const { locales, defaultLocale, localUrlReg } = i18nConfig;

export class LocalesUtil {
  static replaceLocale(pathname: string, value: I18n.Locale) {
    const paths = pathname.split("/");
    if (LocalesUtil.isLocalStartPathname(pathname)) {
      if (LocalesUtil.isDefaultLocale(value)) {
        return "/" + paths.slice(2).join("/");
      }
      return ["/".concat(value), ...paths.slice(2)].join("/");
    }

    if (!LocalesUtil.isDefaultLocale(value)) {
      return "/".concat(value).concat(pathname);
    }
    return pathname;
  }
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

  /**
   * 是否以 locale 开头的 pathname
   * @param pathname
   */
  static isLocalStartPathname(pathname: string) {
    for (const locale of locales) {
      if (pathname.startsWith("/" + locale)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 去掉路径中的默认语言
   *
   * @param path
   * @returns
   */
  static dropDefaultLocale(path: string) {
    return path.replace("/" + defaultLocale, "");
  }

  static isDefaultLocale(value: any): value is typeof defaultLocale {
    return value === defaultLocale;
  }
}
