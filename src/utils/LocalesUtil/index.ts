import i18nConfig from "config/i18n.config";
import { isArray, isString } from "lodash";

const { locales, defaultLocale, localUrlReg } = i18nConfig;

const PATH_SEPARATOR = "/";
const separator_reg = /\/+/g;

class Paths {
  static dropPathSeparator(path: string): string {
    return path.replace(separator_reg, "");
  }

  static filterPaths(paths: string[]) {
    return paths
      .filter((path) => path !== PATH_SEPARATOR && !!path)
      .map(Paths.dropPathSeparator);
  }

  static toPaths(pathnames: string | string[]): string[] {
    return Paths.filterPaths(
      isArray(pathnames) ? pathnames : pathnames.split("/"),
    );
  }

  static toPath(pathnames: string | string[]): string {
    const paths = Paths.toPaths(pathnames);
    return ["", ...paths].join(PATH_SEPARATOR);
  }
}

export class LocalesUtil {
  static replaceLocale(pathname: string, value: I18n.Locale) {
    const paths = pathname.split(PATH_SEPARATOR);
    if (LocalesUtil.isLocalStartPathname(pathname)) {
      if (LocalesUtil.isDefaultLocale(value)) {
        return Paths.toPath(paths.slice(2));
      }
      return Paths.toPath([value, ...paths.slice(2)]);
    }

    if (!LocalesUtil.isDefaultLocale(value)) {
      return PATH_SEPARATOR.concat(value).concat(pathname);
    }
    return pathname;
  }

  static toHref(pathnames: string | string[], locale?: I18n.Locale): string {
    const paths = Paths.toPaths(pathnames);

    if (LocalesUtil.isLocale(locale)) {
      const pLocale = paths[0];
      if (LocalesUtil.isLocale(pLocale)) {
        paths.shift();
      }
      paths.unshift(locale);
    }

    return Paths.toPath(paths);
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
      if (pathname.startsWith(PATH_SEPARATOR + locale)) {
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
    return path.replace(PATH_SEPARATOR + defaultLocale, "");
  }

  static isDefaultLocale(value: any): value is typeof defaultLocale {
    return value === defaultLocale;
  }
}
