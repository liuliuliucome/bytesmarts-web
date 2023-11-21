import { TreeNode } from "@/types/TreeNode";
import { Docs } from "contentlayer/generated";

export const buildDocsTree = (
  docs: Docs[],
  parentPathNames: string[] = []
): any[] => {
  const level = parentPathNames.length;

  console.log("parentPathNames", parentPathNames);

  return docs
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join("/")
          .startsWith(parentPathNames.join("/"))
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((doc) => ({
      nav_title: doc.title ?? null,
      title: doc.title,
      label: doc.title,
      excerpt: null,
      urlPath: doc.url_path,
      collapsible: false,
      collapsed: false,
      children: buildDocsTree(
        docs,
        doc.pathSegments.map((_: PathSegment) => _.pathName)
      ),
    }));

  // // Remove ID from parent path
  // parentPathNames = parentPathNames
  //   .join("/")
  //   .split("-")
  //   .slice(0, -1)
  //   .join("-")
  //   .split("/");

  // return docs
  //   .filter(
  //     (_) =>
  //       _.pathSegments.length === level + 1 &&
  //       _.pathSegments
  //         .map((_: PathSegment) => _.pathName)
  //         .join("/")
  //         .startsWith(parentPathNames.join("/"))
  //   )
  //   .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
  //   .map<TreeNode>((doc) => ({
  //     nav_title: doc.title ?? null,
  //     title: doc.title,
  //     label: doc.title,
  //     excerpt: null,
  //     urlPath: doc.url_path,
  //     collapsible: false,
  //     collapsed: false,
  //     children: buildDocsTree(
  //       docs,
  //       doc.pathSegments.map((_: PathSegment) => _.pathName)
  //     ),
  //   }));
};
