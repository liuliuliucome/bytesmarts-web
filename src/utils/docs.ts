import { allDocs, allBlogs, Docs, Blogs } from "contentlayer/generated";
import { LocalesUtil } from "./LocalesUtil";
import { find, omit } from "lodash";
import { TreeNode } from "types/TreeNode";

const withLangDocs = (lang: I18n.Locale) =>
  allDocs.filter((item) => item.locale === lang);

const withLangBlogs = (lang: I18n.Locale) =>
  allBlogs.filter((item) => item.locale === lang);

function buildDocsTree(docs: Docs[], parentPath = "", level = 1): TreeNode[] {
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
        children: buildDocsTree(docs, doc.route, level + 1),
        // Transferring Document Data
        metaData: omit(doc, ["children", "_raw", "body"]),
        level: level,
      } as TreeNode;
    });
}
function buildBlogsTree(docs: Blogs[], parentPath = "", level = 1): TreeNode[] {
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
        children: buildBlogsTree(docs, doc.route, level + 1),
        // Transferring Document Data
        metaData: omit(doc, ["children", "_raw", "body"]),
        level: level,
      } as TreeNode;
    });
}

export function getDocsPageProps(props: Page.DocsSlugPageProps) {
  const { params } = props;
  const lang = LocalesUtil.toLocale(params.lang);

  const docs = withLangDocs(lang);
  const reativeRoute = params.slug.join("/");

  const doc = find(docs, ["reativeRoute", reativeRoute]);
  // Do not include top-level nodes, directly search for them from root development
  const tree = buildDocsTree(docs, "docs");

  const breadcrumbs: Array<Page.BreadcrumbType> = [];
  if (doc) {
    const parentPaths = doc?.parentRoute.split("/");
    breadcrumbs.push({ title: doc?.title, path: doc?.route });
    while (parentPaths?.length) {
      const target = find(docs, ["route", parentPaths.join("/")]);
      if (!target) {
        break;
      }
      breadcrumbs.unshift({ title: target.title, path: target.route });

      parentPaths.pop();
    }
  }

  return {
    docTree: tree,
    tree,
    allDocs: docs,
    doc,
    breadcrumbs,
  };
}

export function getBlogsPageProps(props: Page.BlogsSlugPageProps) {
  const { params } = props;
  const lang = LocalesUtil.toLocale(params.lang);

  const docs = withLangBlogs(lang);
  const writeDocs = docs.map((item) => ({ ...item, body: null }));
  console.log("writeDocs", writeDocs);

  const reativeRoute = params.slug || "blogs";

  const doc = find(docs, ["reativeRoute", reativeRoute]);
  // Do not include top-level nodes, directly search for them from root development
  const tree = buildBlogsTree(docs, "blogs");

  const breadcrumbs: Array<Page.BreadcrumbType> = [];
  if (doc) {
    const parentPaths = doc?.parentRoute.split("/");
    breadcrumbs.push({ title: doc?.title, path: doc?.route });
    while (parentPaths?.length) {
      const target = find(docs, ["route", parentPaths.join("/")]);
      if (!target) {
        break;
      }
      breadcrumbs.unshift({ title: target.title, path: target.route });

      parentPaths.pop();
    }
  }

  return {
    docTree: tree,
    tree,
    allDocs: docs,
    doc,
    breadcrumbs,
  };
}
