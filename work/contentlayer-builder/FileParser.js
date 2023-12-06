import { slug } from "github-slugger";
import i18nConfig from "../config/i18n.config";
const { localUrlReg, defaultLocale } = i18nConfig;

const orderReg = /^(\d+)?-/;
class FileParser {
  /**
   *
   * @param {string} flattenedPath
   */
  static getFileOrder(flattenedPath) {
    const filename = flattenedPath.split("/").pop();
    const matched = orderReg.exec(filename);
    return matched ? +matched[1] : filename.includes("index") ? 5 : 10;
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getFileLocale(flattenedPath) {
    const matched = flattenedPath.match(localUrlReg);
    return matched ? matched[1] || defaultLocale : defaultLocale;
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getFileSlug(flattenedPath) {
    const newName = flattenedPath
      .replace(orderReg, "")
      .replace(localUrlReg, "");
    return [newName, slug(newName)];
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getHref(flattenedPath) {
    return "/" + FileParser.filePath2Slugs(flattenedPath).join("/");
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static filePath2Slugs(flattenedPath) {
    return flattenedPath.split("/").map((path) => {
      const [, slug] = FileParser.getFileSlug(path);
      return slug;
    });
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getMetaData(flattenedPath) {
    const order = FileParser.getFileOrder(flattenedPath);
    const locale = FileParser.getFileLocale(flattenedPath);
    const name = flattenedPath.split("/").pop();
    const [replaceName, slug] = FileParser.getFileSlug(name);
    const pathsSlugs = FileParser.filePath2Slugs(flattenedPath);

    const href = "/" + pathsSlugs.join("/");
    const fullHref = locale !== defaultLocale ? `/${locale}${href}` : href;

    return {
      order,
      locale,
      slug,
      pathsSlugs,
      fullHref,
      name,
      replaceName,
    };
  }

  /**
   *
   * @param {import("contentlayer/source-files").LocalDocument} doc
   */
  static getFileMetaData(doc) {
    const flattenedPath = doc._raw.flattenedPath;

    const metaData = FileParser.getMetaData(flattenedPath);
    const parentPath = flattenedPath.split("/").slice(0, -1).pop();

    return {
      ...metaData,
      parent: parentPath ? FileParser.getMetaData(parentPath) : null,
    };
  }
}

module.exports = { FileParser };
