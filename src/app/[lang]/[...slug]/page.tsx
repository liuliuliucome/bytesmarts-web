import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import { getDocsPageProps } from "@/utils/docs";
export async function generateMetadata(
  props: Page.DocsSlugPageProps,
): Promise<Metadata> {
  const { doc } = getDocsPageProps(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.seoTitle || doc.title,
    description: doc.seoDescription || doc.description,
  };
}

export async function generateStaticParams(props: Page.DocsSlugPageProps) {
  console.log("generateStaticParams props", props);

  const { allDocs } = getDocsPageProps({
    params: {
      ...props.params,
      slug: [""],
    },
  });

  return allDocs.map((docs) => {
    return {
      slug: docs.reativeRoute.split("/"),
    };
  });
}

export default async function DocsPage(props: Page.DocsSlugPageProps) {
  console.log("props", props);

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
