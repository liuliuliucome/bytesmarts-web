import { Metadata } from "next";
import { BlogsIndexLayout } from "@/components/layouts/BlogsLayout/BlogsIndexLayout";
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

  const { categoryies } = builder.getBlogIndexProps();

  return categoryies.map((doc) => {
    return {
      lang: props.params.lang,
      slug: doc.slug,
    };
  });
}

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const slug = props.params.slug || "";
  const builder = new BlogsBuilder({ lang: props.params.lang });

  const { categoryies, tags } = builder.getBlogIndexProps();

  const allDocs =
    categoryies.find((item) => item.slug === props.params.slug)?.children || [];
  return (
    <BlogsIndexLayout
      type="categories"
      breadcrumbs={[]}
      allDocs={allDocs}
      doc={allDocs[0]}
      tree={[]}
      categoryies={categoryies}
      tags={tags}
      slug={slug}
    />
  );
}
