import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { Metadata } from "next";
import { DocsLayout } from "@/components/layouts";
import { LocalType, LocalesUtil } from "@/utils";

interface PostProps {
  params: {
    slug: string;
    lang?: LocalType;
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const { slug } = params;
  const lang = LocalesUtil.toLocale(params.lang);
  console.log("getPostFromParams", slug, lang);

  const post = allDocs.find(
    (post) => post.slugAsParams.includes(slug) && post.locale === lang
  );

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(
  params: any
): Promise<PostProps["params"][]> {
  return allDocs.map((post) => ({
    slug: LocalesUtil.getLocaleUrl(post.slugAsParams),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const lang = LocalesUtil.toLocale(params.lang);
  const doc = await getPostFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <DocsLayout doc={doc}>
      {/* <article className="py-6 prose dark:prose-invert">
          <h1 className="mb-2">{doc.title}</h1>
          {doc.description && (
            <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
              {doc.description}
            </p>
          )}
          <hr className="my-4" />
          <Mdx code={doc.body.code} />
        </article> */}
    </DocsLayout>
  );
}
