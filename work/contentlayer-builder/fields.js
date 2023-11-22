import { slug } from "github-slugger";

const locales = ["zh", "en"];
const localUrlReg = new RegExp(`\\.(${locales.join("|")})`);
const defaultLocale = "zh";
const getMatchLocale = (path) => {
  const matched = path.match(localUrlReg);
  return matched ? matched[1] || defaultLocale : defaultLocale;
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
  iconFontName: {
    type: "string",
    default: "icon-expand",
  },
};

/** @type {import('contentlayer/source-files').ComputedFields} */
export const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  locale: {
    type: "string",
    resolve: (doc) => getMatchLocale(doc._raw.flattenedPath),
  },
  reativeRoute: {
    type: "string",
    resolve: (doc) => {
      const paths = doc._raw.flattenedPath
        .replace(localUrlReg, "")
        .split("/")
        .slice(1);
      if (paths[paths.length - 1] === "index") {
        paths.pop();
      }
      return paths.join("/");
    },
  },
  parentRoute: {
    type: "string",
    resolve: (doc) => {
      const paths = doc._raw.flattenedPath.replace(localUrlReg, "").split("/");
      if (paths[paths.length - 1] === "index") {
        paths.pop();
      }
      paths.pop();

      return paths.join("/");
    },
  },
  route: {
    type: "string",
    resolve: (doc) => {
      const paths = doc._raw.flattenedPath.replace(localUrlReg, "").split("/");
      if (paths[paths.length - 1] === "index") {
        paths.pop();
      }
      return paths.join("/");
    },
  },
  localeRoute: {
    type: "string",
    resolve: (doc) => {
      const matchLocale = getMatchLocale(doc._raw.flattenedPath);
      const path = doc._raw.flattenedPath.replace(localUrlReg, "");
      return [matchLocale, ...path.split("/")].join("/");
    },
  },
};
