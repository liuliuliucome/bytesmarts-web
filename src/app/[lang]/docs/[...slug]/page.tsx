import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import { getDocsPageProps } from "@/utils/docs";

export async function generateMetadata(
  props: Page.DocsSlugPageProps
): Promise<Metadata> {
  const { doc } = getDocsPageProps(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocsPage(props: Page.DocsSlugPageProps) {
  const { allDocs, doc, breadcrumbs, docTree } = getDocsPageProps(props);

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
