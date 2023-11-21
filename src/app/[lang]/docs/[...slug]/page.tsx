import { notFound } from "next/navigation";
import { Docs, allDocs } from "contentlayer/generated";

import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts";
import { LocalType, LocalesUtil } from "@/utils";
import { buildDocsTree } from "@/utils/build-docs-tree";
import { find } from "lodash";

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
  const lang = LocalesUtil.toLocale(params.lang);
  const reativeRoute = params.slug.join("/");
  const allWithLangDocs = withLangDocs(lang);

  const doc = find(allWithLangDocs, ["reativeRoute", reativeRoute]);

  return {
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

// export async function generateStaticParams(
//   params: any
// ): Promise<DocsProps["params"][]> {
//   console.log("params", params);

//   const lang = LocalesUtil.toLocale(params.lang);
//   return withLangDocs(lang).map((post) => ({
//     slug: LocalesUtil.getLocaleUrl(post.slugAsParams),
//   }));
// }

// export const getProps = async (params: DocsProps["params"]) => {
//   const pagePath = params.slug?.join("/") ?? "";
//   let doc;
//   // If on the index page, we don't worry about the global_id
//   if (pagePath === "") {
//     doc = allDocs.find((_) => _.url_path === "/docs");
//     if (!doc) return { notFound: true };
//     return { props: { doc, ...getSupportingProps(doc, params) } };
//   }
//   // Identify the global content ID as the last part of the page path following
//   // the last slash. It should be an 8-digit number.
//   const globalContentId: string = pagePath
//     .split("/")
//     .filter(Boolean)
//     .pop()
//     .split("-")
//     .pop();
//   // If there is a global content ID, find the corresponding document.
//   if (globalContentId && globalContentId.length === 8) {
//     doc = allDocs.find((_) => _.global_id === globalContentId);
//   }
//   // If we found the doc by the global content ID, but the URL path isn't the
//   // correct one, redirect to the proper URL path.
//   const urlPath = doc?.pathSegments
//     .map((_: PathSegment) => _.pathName)
//     .join("/");
//   if (doc && urlPath !== pagePath) {
//     return { redirect: { destination: doc.url_path, permanent: true } };
//   }
//   // If there is no global content ID, or if we couldn't find the doc by the
//   // global content ID, try finding the doc by the page path.
//   if (!globalContentId || !doc) {
//     doc = allDocs.find((_) => {
//       const segments = _.pathSegments
//         .map((_: PathSegment) => _.pathName)
//         .join("/")
//         .replace(new RegExp(`\-${_.global_id}$`, "g"), ""); // Remove global content ID from url
//       return segments === pagePath;
//     });
//     // If doc exists, but global content ID is missing in url, redirect to url
//     // with global content ID
//     if (doc) {
//       return { redirect: { destination: doc.url_path, permanent: true } };
//     }
//     // Otherwise, throw a 404 error.
//     return { notFound: true };
//   }
//   // Return the doc and supporting props.
//   return { props: { doc, ...getSupportingProps(doc, params) } };
// };

export default async function DocsPage(props: DocsProps) {
  const { params } = props;
  console.log("params", params);
  const { doc } = await getDocFromParams(props);

  if (!doc) {
    notFound();
  }

  console.log("doc", doc);

  return (
    <DocsLayout doc={doc}>
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
