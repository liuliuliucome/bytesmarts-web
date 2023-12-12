import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogsLayout } from "@/components/layouts/BlogsLayout";
import { BlogsBuilder } from "@/utils/contentlayer/BlogsBuilder";

// export const dynamicParams = false;

export async function generateMetadata(
  props: Page.BlogsSlugPageProps,
): Promise<Metadata> {
  const builder = new BlogsBuilder({ lang: props.params.lang });

  const { doc } = builder.getPageProps(props.params.slug || "");

  if (!doc) {
    return {};
  }

  return {
    title: doc.seoTitle || doc.title,
    description: doc.seoDescription || doc.description,
  };
}

export async function generateStaticParams(props: Page.BlogsSlugPageProps) {
  const builder = new BlogsBuilder({ lang: props.params.lang });

  const { docs } = builder.getPageProps(props.params.slug || "");

  return docs.map((doc) => {
    return {
      lang: props.params.lang,
      slug: doc.fileMetaData.slug,
    };
  });
}

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const builder = new BlogsBuilder({ lang: props.params.lang });
  const { docs, doc, tree } = builder.getPageProps(props.params.slug || "");

  if (!doc) {
    notFound();
  }

  return (
    <BlogsLayout
      breadcrumbs={[]}
      allDocs={docs}
      doc={doc}
      tree={tree}
      categoryies={[]}
      tags={[]}
    />
  );
}
