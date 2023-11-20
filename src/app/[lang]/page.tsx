import Link from "next/link";
import { allHomes, allPosts } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";

async function getIndexPage() {
  const page = allHomes.find((page) => page.locale === "zh");

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata() {
  const page = await getIndexPage();

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Home() {
  const page = await getIndexPage();
  console.log("page", page);

  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}

      {page ? <Mdx code={page.body.code} /> : null}
    </div>
  );
}
