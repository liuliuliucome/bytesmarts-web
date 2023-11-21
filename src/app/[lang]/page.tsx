import Link from "next/link";
import { allDocs, allHomes } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { LocalesUtil } from "@/utils";
import { find } from "lodash";
import { AppProvider } from "@/components/app-provider";
import { A } from "@/components/common";

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
  const lang = LocalesUtil.toLocale(params.lang);
  const page = await getIndexPage(lang);

  return (
    <AppProvider initialState={{ locale: lang }}>
      <div className="prose dark:prose-invert">
        <A href="/en/docs">test</A>
        {allDocs
          .filter((item) => item.locale === lang)
          .map((post) => (
            <article key={post._id}>
              <A
                locale={lang}
                href={{
                  pathname: LocalesUtil.getLocaleUrl(post.slug),
                }}
              >
                <h2>{post.title}</h2>
              </A>
              {post.description && <p>{post.description}</p>}
            </article>
          ))}

        {page ? <Mdx code={page.body.code} /> : null}
      </div>
    </AppProvider>
  );
}
