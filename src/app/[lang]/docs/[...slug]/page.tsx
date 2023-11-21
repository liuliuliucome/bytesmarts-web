import { notFound } from "next/navigation";
import { Docs, allDocs } from "contentlayer/generated";

import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts";
import { LocalType, LocalesUtil } from "@/utils";
import { buildDocsTree } from "@/utils/build-docs-tree";
import { find, omit } from "lodash";

interface DocsProps {
  params: {
    slug: string[];
    lang?: LocalType;
  };
}

const withLangDocs = (lang: LocalType) =>
  allDocs.filter((item) => item.locale === lang);

function getSupportingProps(doc: Docs, params: any) {
  // let slugs = params.slug ? ['docs', ...params.slug] : []
  // let path = ''
  // let breadcrumbs: any = []
  // for (const slug of slugs) {
  //   path += `/${slug}`
  //   const breadcrumbDoc = allDocs.find((_) => _.url_path === path || _.url_path_without_id === path)
  //   if (!breadcrumbDoc) continue
  //   breadcrumbs.push({ path: breadcrumbDoc.url_path, title: breadcrumbDoc?.nav_title || breadcrumbDoc?.title })
  // }
  const lang = LocalesUtil.toLocale(params.lang);
  const allDocsWithLang = withLangDocs(lang);
  const tree = buildDocsTree(allDocsWithLang);
  // const childrenTree = buildDocsTree(
  //   allDocs,
  //   doc.pathSegments.map((_: PathSegment) => _.pathName),
  // )
  return { tree };
}

async function getDocFromParams(props: DocsProps) {
  const { params } = props;
  console.log("params", params);

  const lang = LocalesUtil.toLocale(params.lang);
  const reativeRoute = params.slug.join("/");
  const allWithLangDocs = withLangDocs(lang);

  const doc = find(allWithLangDocs, ["reativeRoute", reativeRoute]);

  return {
    allDocs: allWithLangDocs,
    doc,
  };
}

export async function generateMetadata(props: DocsProps): Promise<Metadata> {
  const { doc } = await getDocFromParams(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocsPage(props: DocsProps) {
  const { allDocs, doc } = await getDocFromParams(props);

  if (!doc) {
    notFound();
  }

  const tree = buildDocsTree(allDocs);

  return (
    <DocsLayout allDocs={allDocs} doc={doc} tree={tree}>
      {/* <article className="py-6 prose dark:prose-invert">
          <h1 className="mb-2">{doc.title}</h1>
          {doc.description && (
            <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
              {doc.description}
            </p>
          )}
          <hr className="my-4" />
          <Mdx code={doc.body.code} />
        </article> */}
    </DocsLayout>
  );
}
