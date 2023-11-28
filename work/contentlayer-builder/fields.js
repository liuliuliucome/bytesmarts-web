import i18nConfig from "../config/i18n.config";
import { getLastEditedDate } from "./utils";

const { localUrlReg, defaultLocale } = i18nConfig;

const getMatchLocale = (path) => {
  const matched = path.match(localUrlReg);
  return matched ? matched[1] || defaultLocale : defaultLocale;
};

/**
 *
 * @param {import('contentlayer/source-files').LocalDocument} doc
 * @param {number} start
 */
const getPaths = (doc, start = 0) => {
  const paths = doc._raw.flattenedPath
    .replace(localUrlReg, "")
    .split("/")
    .slice(start);

  if (paths[paths.length - 1] === "index") {
    paths.pop();
  }
  return paths;
};

/**
 * 通用字段
 * @see {MDX.CommonFileds}
 * @type {import('contentlayer/source-files').FieldDefs}
 */
export const commonFields = {
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  seoTitle: {
    type: "string",
  },
  seoDescription: {
    type: "string",
  },
  sidebarIconFont: {
    type: "string",
    default: "icon-expand",
  },
  excerpt: {
    type: "string",
  },
  label: {
    type: "string",
  },
  show_child_cards: {
    type: "string",
  },
  nav_title: {
    type: "string",
  },
  date: {
    type: "string",
  },
};

/** @type {import('contentlayer/source-files').ComputedFields} */
export const computedFields = {
  last_edited: { type: "date", resolve: getLastEditedDate },
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  // slugAsParams: {
  //   type: "string",
  //   resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  // },
  locale: {
    type: "string",
    resolve: (doc) => getMatchLocale(doc._raw.flattenedPath),
  },
  reativeRoute: {
    type: "string",
    resolve: (doc) => getPaths(doc, 1).join("/"),
  },
  parentRoute: {
    type: "string",
    resolve: (doc) => {
      const paths = getPaths(doc);
      paths.pop();
      return paths.join("/");
    },
  },
  route: {
    type: "string",
    resolve: (doc) => getPaths(doc).join("/"),
  },

  /**
   * HTMLLinkElement href attr
   */
  // href: {
  //   type: "string",
  //   resolve: (doc) => "/" + getPaths(doc).slice(1).join("/"),
  // },
  /**
   * HTMLLinkElement href attr(absoulte)
   */
  fullHref: {
    type: "string",
    resolve: (doc) => {
      const matchLocale = getMatchLocale(doc._raw.flattenedPath);
      const paths = [...getPaths(doc, 1)];

      // filter default local
      if (matchLocale != defaultLocale) {
        paths.unshift(matchLocale);
      }

      return "/" + paths.join("/");
    },
  },
};
