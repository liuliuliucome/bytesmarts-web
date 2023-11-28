import { defineDocumentType } from "contentlayer/source-files";
import { commonFields } from "../fields";

export const Home = defineDocumentType(() => ({
  name: "Home",
  filePathPattern: `home/**/*.mdx`,
  contentType: "mdx",
  fields: commonFields,
}));
