import { omit } from "lodash";

/**
 *
 * @param {import('contentlayer/generated').Docs[]} docs
 * @param {string} parentPathNames
 * @returns {import('@/types/TreeNode').TreeNode[]}
 */
export const buildDocsTree = (docs, parentPath = "") => {
  return docs
    .filter((item) => item.parentRoute === parentPath)
    .map((doc) => {
      return {
        nav_title: doc.nav_title ?? null,
        title: doc.title,
        label: doc.label ?? null,
        excerpt: doc.excerpt ?? null,
        urlPath: doc.href,
        collapsible: doc.collapsible ?? null,
        collapsed: doc.collapsed ?? null,
        children: buildDocsTree(docs, doc.route),
        // Transferring Document Data
        metaData: omit(doc, ["children", "_raw", "body"]),
      };
    });
};
