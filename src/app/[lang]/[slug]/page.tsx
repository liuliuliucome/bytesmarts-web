import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import { DocsBuilder } from "@/utils/contentlayer/docs";

// export const dynamicParams = false;

export async function generateMetadata(
  props: Page.DocsSlugPageProps,
): Promise<Metadata> {
  const { doc } = DocsBuilder.getPageProps(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.seoTitle || doc.title,
    description: doc.seoDescription || doc.description,
  };
}

export async function generateStaticParams(props: Page.DocsSlugPageProps) {
  const { docs } = DocsBuilder.getPageProps(props);

  return docs.map((doc) => {
    return {
      slug: doc.fileMetaData.slug,
    };
  });
}

export default async function DocsPage(props: Page.DocsSlugPageProps) {
  const { docs, doc, group } = DocsBuilder.getPageProps(props);

  if (!doc) {
    notFound();
  }

  return (
    <DocsLayout
      // breadcrumbs={breadcrumbs}
      allDocs={docs}
      doc={doc}
      tree={group}
    />
  );
}
