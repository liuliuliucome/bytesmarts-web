import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts/DocsLayout";
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

export async function generateStaticParams(props: Page.BlogsSlugPageProps) {
  const { allDocs } = getBlogsPageProps(props);
  console.log("allDocs", allDocs);

  return allDocs.map((docs) => {
    return {
      slug: docs.reativeRoute.split("/"),
    };
  });
}

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const { allDocs, doc, breadcrumbs, docTree } = getBlogsPageProps({
    params: {
      ...props.params,
      slug: "",
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
