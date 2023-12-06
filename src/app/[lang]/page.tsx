import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import { getDocsPageProps } from "@/utils/docs";
import i18nConfig from "config/i18n.config";
import { DocsBuilder } from "@/utils/contentlayer/docs";

export async function generateMetadata(params: Page.DocsProps) {
  const page = allPages.find(
    (item) => item.slug.includes("docs") && item.locale === params.params.lang,
  );

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
  };
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({
    lang,
  }));
}

export default async function Docs(props: Page.DocsProps) {
  const { docs, group, doc } = DocsBuilder.getPageProps({
    params: {
      ...props.params,
      slug: "docs",
    },
  });

  if (!doc) {
    notFound();
  }

  return (
    // <div>
    //   <pre>{JSON.stringify(group, null, 2)}</pre>
    //   <pre>{JSON.stringify(docs, null, 2)}</pre>
    // </div>
    <DocsLayout breadcrumbs={[]} allDocs={docs} doc={doc} tree={group} />
  );
}
