import { allDocs } from "contentlayer/generated";
import { LocalType, LocalesUtil } from "./LocalesUtil";
import { find } from "lodash";
import { buildDocsTree } from "./build-docs-tree";

const withLangDocs = (lang: LocalType) =>
  allDocs.filter((item) => item.locale === lang);

export function getDocsPageProps(props: Page.DocsSlugPageProps) {
  const { params } = props;
  const lang = LocalesUtil.toLocale(params.lang);

  const allWithLangDocs = withLangDocs(lang);
  const reativeRoute = params.slug.join("/");

  const doc = find(allWithLangDocs, ["reativeRoute", reativeRoute]);
  // Do not include top-level nodes, directly search for them from root development
  const tree = buildDocsTree(allWithLangDocs, "docs");

  const breadcrumbs: Array<Page.BreadcrumbType> = [];
  if (doc) {
    const parentPaths = doc?.parentRoute.split("/");
    breadcrumbs.push({ title: doc?.title, path: doc?.route });
    while (parentPaths?.length) {
      const target = find(allWithLangDocs, ["route", parentPaths.join("/")]);
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
    allDocs: allWithLangDocs,
    doc,
    breadcrumbs,
  };
}
