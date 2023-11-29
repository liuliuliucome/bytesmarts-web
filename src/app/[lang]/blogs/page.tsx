import { Metadata } from "next";
import { getBlogsPageProps } from "@/utils/docs";
import { BlogsLayout } from "@/components/layouts/BlogsLayout";

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

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  console.log("props", props);
  const { allDocs, doc, breadcrumbs, docTree } = getBlogsPageProps(props);

  return (
    <BlogsLayout
      breadcrumbs={breadcrumbs}
      allDocs={allDocs}
      doc={allDocs[0]}
      tree={docTree}
    />
  );
}
