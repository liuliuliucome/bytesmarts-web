import { defineDocumentType } from "contentlayer/source-files";
import { commonFields } from "../fields";

export const Home = defineDocumentType(() => ({
  name: "home",
  filePathPattern: `home/**/*.mdx`,
  contentType: "mdx",
  fields: commonFields,
}));
