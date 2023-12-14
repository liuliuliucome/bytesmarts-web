import { Docs, allDocs } from "contentlayer/generated";
import { LocalesUtil } from "../LocalesUtil";
import { find, forOwn, groupBy, omit } from "lodash";
import { TreeNode } from "types/TreeNode";
import { BaseBuilder, BaseBuilderConfig } from "./BaseBuilder";

export class DocsBuilder extends BaseBuilder {
  protected contentList: Docs[];

  constructor(config?: Partial<BaseBuilderConfig>) {
    super(config);

    this.contentList = allDocs.filter(
      (item) => item.locale === LocalesUtil.toLocale(config?.lang),
    );
  }

  getContentList() {
    return this.contentList;
  }

  docToTree(doc: Docs, children: TreeNode[] = [], level = 1): TreeNode {
    return {
      nav_title: doc.nav_title ?? null,
      title: doc.title,
      label: doc.label ?? null,
      excerpt: doc.excerpt ?? null,
      // 带上 locale
      // docs 特殊，只需要对应 slug 部分
      urlPath: LocalesUtil.toHref(
        doc.fileMetaData.pathsSlugs.slice(-1),
        doc.fileMetaData.locale,
      ),
      children: children,
      // Transferring Document Data
      metaData: omit(doc, ["children", "_raw", "body"]) as any,
      level: level,
    };
  }

  groupDocsByParentSlug(docs: Docs[]) {
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
          .map((doc) => this.docToTree(doc, [], 2)),
      });
    });
    return results;
  }

  getPageProps(props: Page.DocsSlugPageProps) {
    let { slug } = props.params;
    const docs = this.contentList;
    const group = this.groupDocsByParentSlug(docs);
    const doc = docs.find(
      (item) =>
        (item.fileMetaData.slug === "index" &&
          item.fileMetaData.parent.slug === "docs") ||
        item.fileMetaData.slug === slug,
    );

    return {
      docs,
      group,
      doc,
    };
  }
}
