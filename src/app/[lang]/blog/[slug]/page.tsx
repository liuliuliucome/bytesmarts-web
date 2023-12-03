import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogsLayout } from "@/components/layouts/BlogsLayout";
import { getBlogsPageProps } from "@/utils/docs";

// export const dynamicParams = false;

export async function generateMetadata(
  props: Page.BlogsSlugPageProps,
): Promise<Metadata> {
  const { doc } = getBlogsPageProps(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.seoTitle || doc.title,
    description: doc.seoDescription || doc.description,
  };
}

// export async function generateStaticParams(props: Page.BlogsSlugPageProps) {
//   console.log("props", props);

//   const { allDocs } = getBlogsPageProps(props);

//   return allDocs.map((docs) => {
//     return {
//       lang: props.params.lang,
//       slug: docs.reativeRoute.split("/"),
//     };
//   });
// }

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const { allDocs, doc, breadcrumbs, docTree } = getBlogsPageProps(props);

  if (!doc) {
    notFound();
  }

  return (
    <BlogsLayout
      breadcrumbs={breadcrumbs}
      allDocs={allDocs}
      doc={doc}
      tree={docTree}
    />
  );
}
