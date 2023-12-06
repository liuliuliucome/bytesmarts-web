import { Docs, allDocs } from "contentlayer/generated";
import { LocalesUtil } from "../LocalesUtil";
import { find, forOwn, groupBy, omit, result } from "lodash";
import { TreeNode } from "types/TreeNode";

export class DocsBuilder {
  static getDocsWithLang(lang: I18n.Locale) {
    return allDocs.filter((item) => item.locale === lang);
  }

  static docToTree(doc: Docs, children: TreeNode[] = [], level = 1): TreeNode {
    return {
      nav_title: doc.nav_title ?? null,
      title: doc.title,
      label: doc.label ?? null,
      excerpt: doc.excerpt ?? null,
      // 带上 locale
      urlPath: doc.fullHref,
      children: children,
      // Transferring Document Data
      metaData: omit(doc, ["children", "_raw", "body"]) as any,
      level: level,
    };
  }

  static groupDocsByParentSlug(docs: Docs[]) {
    const docsMaps = groupBy(docs, (doc) => doc.fileMetaData.parent.name);
    const results = [] as TreeNode[];

    forOwn(docsMaps, (value, key) => {
      if (key === "docs") {
        return;
      }
      const doc = find(value, ["fileMetaData.parent.name", key]);
      results.push({
        ...doc?.fileMetaData.parent,
        title: doc?.fileMetaData.parent.replaceName,
        nav_title: doc?.fileMetaData.parent.replaceName,
        label: doc?.fileMetaData.parent.replaceName,
        excerpt: "",
        urlPath: "",
        level: 1,
        children: value
          .sort((item) => item.fileMetaData.order)
          .map((doc) => DocsBuilder.docToTree(doc, [], 2)),
      });
    });
    return results;
  }

  static getPageProps(props: Page.DocsSlugPageProps) {
    let { slug, lang } = props.params;

    lang = LocalesUtil.toLocale(lang);

    const docs = DocsBuilder.getDocsWithLang(lang);
    const group = DocsBuilder.groupDocsByParentSlug(docs);
    const doc = docs.find(
      (item) =>
        item.fileMetaData.slug === "index" &&
        item.fileMetaData.parent.slug === "docs",
    );

    return {
      docs,
      group,
      doc,
    };
  }
}
