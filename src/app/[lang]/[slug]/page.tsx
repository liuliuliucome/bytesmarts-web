import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import { DocsBuilder } from "@/utils/contentlayer/DocsBuilder";
import { BaseContentLayout } from "@/components/layouts/BaseContentLayout";

// export const dynamicParams = false;

export async function generateMetadata(
  props: Page.DocsSlugPageProps,
): Promise<Metadata> {
  const builder = new DocsBuilder({ lang: props.params.lang });
  const { doc } = builder.getPageProps(props);

  if (!doc) {
    return {};
  }

  return {
    title: doc.seoTitle || doc.title,
    description: doc.seoDescription || doc.description || doc.title,
  };
}

export async function generateStaticParams(props: Page.DocsSlugPageProps) {
  const builder = new DocsBuilder({ lang: props.params.lang });
  const { docs } = builder.getPageProps(props);

  return docs.map((doc) => {
    return {
      slug: doc.fileMetaData.slug,
    };
  });
}

export default async function DocsPage(props: Page.DocsSlugPageProps) {
  const builder = new DocsBuilder({ lang: props.params.lang });
  const { docs, doc, group } = builder.getPageProps(props);

  if (!doc) {
    notFound();
  }

  return (
    <BaseContentLayout lang={props.params.lang}>
      <DocsLayout
        // breadcrumbs={breadcrumbs}
        allDocs={docs}
        doc={doc}
        tree={group}
      />
    </BaseContentLayout>
  );
}
