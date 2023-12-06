import { Blogs, allBlogs } from "contentlayer/generated";
import { LocalesUtil } from "../LocalesUtil";
import { TreeNode } from "types/TreeNode";
import { omit } from "lodash";

export class BlogsBuilder {
  static getDocsWithLang(lang: I18n.Locale) {
    return allBlogs.filter((item) => item.locale === lang);
  }

  static docToTree(doc: Blogs, children: TreeNode[] = [], level = 1): TreeNode {
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

  static buildTree(docs: Blogs[], parentPath = "", level = 1): TreeNode[] {
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
          children: BlogsBuilder.buildTree(
            docs,
            doc.fileMetaData.fullHref,
            level + 1,
          ),
          // Transferring Document Data
          metaData: omit(doc, ["children", "_raw", "body"]),
          level: level,
        } as TreeNode;
      });
  }

  static getPageProps(props: Page.BlogsSlugPageProps) {
    let { slug, lang } = props.params;

    lang = LocalesUtil.toLocale(lang);

    const docs = BlogsBuilder.getDocsWithLang(lang);
    const tree = BlogsBuilder.buildTree(docs, "/blog");
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
}
