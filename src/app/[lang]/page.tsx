import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import { getDocsPageProps } from "@/utils/docs";

export async function generateMetadata(params: Page.DocsProps) {
  const page = allPages.find(
    (item) => item.slug.includes("docs") && item.locale === params.params.lang,
  );

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
  };
}

export default async function Docs(props: Page.DocsProps) {
  const { allDocs, doc, breadcrumbs, docTree } = getDocsPageProps({
    params: {
      ...props.params,
      slug: [""],
    },
  });

  if (!doc) {
    notFound();
  }

  return (
    <DocsLayout
      breadcrumbs={breadcrumbs}
      allDocs={allDocs}
      doc={doc}
      tree={docTree}
    />
  );
}
