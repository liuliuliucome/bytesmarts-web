import { Metadata } from "next";
import { BlogsIndexLayout } from "@/components/layouts/BlogsLayout/BlogsIndexLayout";
import { BlogsBuilder } from "@/utils/contentlayer/blogs";

// export const dynamicParams = false;

export async function generateMetadata(
  props: Page.BlogsSlugPageProps,
): Promise<Metadata> {
  const { doc } = BlogsBuilder.getPageProps(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.seoTitle || doc.title,
    description: doc.seoDescription || doc.description,
  };
}

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const { docs, doc, tree } = BlogsBuilder.getPageProps(props);

  return (
    <BlogsIndexLayout
      breadcrumbs={[]}
      allDocs={docs}
      doc={doc as any}
      tree={tree}
    />
  );
}
