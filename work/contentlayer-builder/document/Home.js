import { defineDocumentType } from "contentlayer/source-files";

export const Home = defineDocumentType(() => ({
  name: "home",
  filePathPattern: `home/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
}));
