import { Blogs, allBlogs } from "contentlayer/generated";
import { LocalesUtil } from "../LocalesUtil";
import { TreeNode } from "types/TreeNode";
import { omit } from "lodash";
import { BaseBuilder, BaseBuilderConfig } from "./BaseBuilder";

export class BlogsBuilder extends BaseBuilder {
  protected contentList: Blogs[];

  constructor(config?: Partial<BaseBuilderConfig>) {
    super(config);

    this.contentList = allBlogs.filter(
      (item) => item.locale === LocalesUtil.toLocale(config?.lang),
    );
  }

  getContentList() {
    return this.contentList;
  }

  docToTree<T extends Blogs>(
    doc: T,
    children: TreeNode[] = [],
    level = 1,
  ): TreeNode {
    return {
      nav_title: doc.nav_title ?? null,
      title: doc.title,
      label: doc.label ?? null,
      excerpt: doc.excerpt ?? null,
      // 带上 locale
      // docs 特殊，只需要对应 slug 部分
      urlPath: doc.fileMetaData.fullHref,
      children: children,
      // Transferring Document Data
      metaData: omit(doc, ["children", "_raw", "body"]) as any,
      level: level,
    };
  }

  buildTree<T extends Blogs>(
    docs: T[],
    parentPath = "",
    level = 1,
  ): TreeNode[] {
    return docs
      .filter((item) => item.fileMetaData.parent.fullHref === parentPath)
      .map((doc) => {
        return {
          nav_title: doc.nav_title ?? null,
          title: doc.title,
          label: doc.label ?? null,
          excerpt: doc.excerpt ?? null,
          // 带上 locale
          urlPath: doc.fileMetaData.fullHref,
          children: this.buildTree(docs, doc.fileMetaData.fullHref, level + 1),
          // Transferring Document Data
          metaData: omit(doc, ["children", "_raw", "body"]),
          level: level,
        } as TreeNode;
      });
  }

  getPageProps(slug: string) {
    const docs = this.contentList;
    const tree = this.buildTree(docs, "/blog");
    const doc = docs.find(
      (item) =>
        (item.fileMetaData.slug === "index" &&
          item.fileMetaData.parent.slug === "docs") ||
        item.fileMetaData.slug === slug,
    );

    return {
      docs,
      tree,
      doc: doc || docs[0],
    };
  }

  getBlogIndexProps() {
    const categoryies = this.groupByField(this.contentList, "categories");
    const tags = this.groupByField(this.contentList, "tags");
    return {
      categoryies,
      tags,
    };
  }
}
