import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogsLayout } from "@/components/layouts/BlogsLayout";
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

export async function generateStaticParams(props: Page.BlogsSlugPageProps) {
  const { docs } = BlogsBuilder.getPageProps(props);

  return docs.map((doc) => {
    return {
      lang: props.params.lang,
      slug: doc.fileMetaData.slug,
    };
  });
}

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const { docs, doc, tree } = BlogsBuilder.getPageProps(props);

  if (!doc) {
    notFound();
  }

  return <BlogsLayout breadcrumbs={[]} allDocs={docs} doc={doc} tree={tree} />;
}
