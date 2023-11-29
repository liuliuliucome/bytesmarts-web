import { omit } from "lodash";

/**
 *
 * @param {import('contentlayer/generated').Docs[]} docs
 * @param {string} parentPathNames
 * @returns {import('types/TreeNode').TreeNode[]}
 */
export const buildDocsTree = (docs, parentPath = "", level = 1) => {
  return docs
    .filter((item) => item.parentRoute === parentPath)
    .map((doc) => {
      return {
        nav_title: doc.nav_title ?? null,
        title: doc.title,
        label: doc.label ?? null,
        excerpt: doc.excerpt ?? null,
        // 带上 locale
        urlPath: doc.fullHref,
        collapsible: doc.collapsible ?? null,
        collapsed: doc.collapsed ?? null,
        children: buildDocsTree(docs, doc.route, level + 1),
        // Transferring Document Data
        metaData: omit(doc, ["children", "_raw", "body"]),
        level: level,
      };
    });
};
