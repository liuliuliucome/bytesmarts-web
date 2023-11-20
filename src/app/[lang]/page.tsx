import Link from "next/link";
import { allDocs, allHomes } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { LocalesUtil } from "@/utils";
import { find } from "lodash";

async function getIndexPage(lang: any) {
  const page = find(allHomes, ["locale", LocalesUtil.toLocale(lang)]);

  if (!page) {
    null;
  }

  return page;
}

export async function generateStaticParams() {
  return LocalesUtil.getLocalesList().map((page) => {
    return { lang: page };
  });
}

export async function generateMetadata({ params }: Page.BaseStaticParams) {
  console.log("params", params);

  const page = await getIndexPage(params.lang);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Home({ params }: Page.BaseStaticParams) {
  const page = await getIndexPage(params.lang);

  console.log("page", page);

  return (
    <div className="prose dark:prose-invert">
      {allDocs.map((post) => (
        <article key={post._id}>
          <Link locale={post.locale} href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}

      {page ? <Mdx code={page.body.code} /> : null}
    </div>
  );
}
