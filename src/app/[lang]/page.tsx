import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/layouts/DocsLayout";
import i18nConfig from "config/i18n.config";
import { DocsBuilder } from "@/utils/contentlayer/DocsBuilder";
import { BaseContentLayout } from "@/components/layouts/BaseContentLayout";

export async function generateMetadata(props: Page.DocsProps) {
  const builder = new DocsBuilder({ lang: props.params.lang });
  const { doc: page } = builder.getPageProps({
    params: {
      ...props.params,
      slug: "docs",
    },
  });

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
  const builder = new DocsBuilder({ lang: props.params.lang });
  const { docs, group, doc } = builder.getPageProps({
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
    <BaseContentLayout lang={props.params.lang}>
      <DocsLayout breadcrumbs={[]} allDocs={docs} doc={doc} tree={group} />
    </BaseContentLayout>
  );
}
