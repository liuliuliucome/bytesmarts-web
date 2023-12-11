import { FileParser } from "./FileParser";
import { getLastEditedDate } from "./utils";
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

  locale: {
    type: "string",
    resolve: (doc) => FileParser.getFileLocale(doc._raw.flattenedPath),
  },

  fileMetaData: {
    type: "json",
    resolve: (doc) => FileParser.getFileMetaData(doc),
  },
};
