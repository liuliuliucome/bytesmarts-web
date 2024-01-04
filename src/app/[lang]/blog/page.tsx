import { Metadata } from "next";
import { BlogsIndexLayout } from "@/components/layouts/BlogsLayout/BlogsIndexLayout";
import { BlogsBuilder } from "@/utils/contentlayer/BlogsBuilder";
import { BaseContentLayout } from "@/components/layouts/BaseContentLayout";

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

export default async function BlogPage(props: Page.BlogsSlugPageProps) {
  const slug = props.params.slug || "";
  const builder = new BlogsBuilder({ lang: props.params.lang });
  const { docs, doc, tree } = builder.getPageProps(slug);
  const { categoryies, tags } = builder.getBlogIndexProps();

  return (
    <BaseContentLayout lang={props.params.lang}>
      <BlogsIndexLayout
        type="categories"
        breadcrumbs={[]}
        allDocs={docs}
        doc={doc as any}
        tree={tree}
        categoryies={categoryies}
        tags={tags}
        slug={slug}
      />
    </BaseContentLayout>
  );
}
