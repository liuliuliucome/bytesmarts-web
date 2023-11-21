import Link from "next/link";
import { allDocs, allPages } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { LocalType, LocalesUtil } from "@/utils";

interface DocsProps {
  params: {
    slug: string;
    lang?: LocalType;
  };
}

const allDocWithLocale = (lang: LocalType) => {
  return allDocs.filter((item) => item.locale === lang);
};

export async function generateMetadata(params: DocsProps) {
  const page = allPages.find(
    (item) => item.slug.includes("docs") && item.locale === params.params.lang
  );

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Docs(params: DocsProps) {
  const lang = LocalesUtil.toLocale(params.params.lang);
  const page = allPages.find((item) => item.locale === lang);

  return (
    <div className="prose dark:prose-invert">
      {allDocWithLocale(lang).map((post) => (
        <article key={post._id}>
          <Link locale={post.locale} href={LocalesUtil.getLocaleUrl(post.slug)}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}

      {page ? <Mdx code={page.body.code} /> : null}
    </div>
  );
}
