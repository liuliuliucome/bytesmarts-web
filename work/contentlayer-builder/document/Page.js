import { defineDocumentType } from "contentlayer/source-files";
import { computedFields, commonFields } from "../fields";

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: commonFields,
  computedFields,
}));
