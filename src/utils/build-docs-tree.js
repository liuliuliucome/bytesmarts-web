/**
 *
 * @param {import('contentlayer/generated').Docs[]} docs
 * @param {string[]} parentPathNames
 * @returns {import('@/types/TreeNode').TreeNode[]}
 */
export const buildDocsTree = (docs, parentPathNames = []) => {
  const level = parentPathNames.length;

  // Remove ID from parent path
  parentPathNames = parentPathNames
    .join("/")
    .split("-")
    .slice(0, -1)
    .join("-")
    .split("/");

  return docs
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_) => _.pathName)
          .join("/")
          .startsWith(parentPathNames.join("/"))
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map((doc) => ({
      nav_title: doc.nav_title ?? null,
      title: doc.title,
      label: doc.label ?? null,
      excerpt: doc.excerpt ?? null,
      urlPath: doc.route,
      collapsible: doc.collapsible ?? null,
      collapsed: doc.collapsed ?? null,
      children: buildDocsTree(
        docs,
        doc.pathSegments.map((_) => _.pathName)
      ),
    }));
};
