import mapChildren from "@/utils/mapChildren";
import { useBlogsLayout } from "../container";
import { LocalesUtil } from "@/utils";
import { slug } from "github-slugger";
import { useApp } from "@/components/app-provider";
import Link from "next/link";

export function BlogSide() {
  const { lang } = useApp();
  const { doc } = useBlogsLayout();
  return (
    <div className="w-[240px] text-base">
      <div className="pt-8">
        <div>Metadata</div>

        <div className="mt-2 text-14">
          <div>
            <span className="mr-2">Date:</span>
            <span>{new Date(doc.last_edited).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div>Categories</div>
        <div className="mt-2 text-14">
          {mapChildren(doc.categories, ({ item, key }) => (
            <Link
              className="mb-2 mr-2 inline-block rounded-[24px] bg-secondary bg-violet-50 px-2 py-1 text-text-primary hover:bg-gray-50 dark:bg-gray-500/20 dark:text-violet-50 dark:hover:bg-gray-900"
              href={LocalesUtil.toHref(["blog", "category", slug(item)], lang)}
              key={key}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <div>Tags</div>
        <div className="mt-2 text-14">
          {mapChildren(doc.tags, ({ item, key }) => (
            <Link
              className="mb-2 mr-2 inline-block rounded-[24px] bg-secondary bg-violet-50 px-2 py-1 text-text-primary hover:bg-gray-50 dark:bg-gray-500/20 dark:text-violet-50 dark:hover:bg-gray-900"
              href={LocalesUtil.toHref(["blog", "tag", slug(item)], lang)}
              key={key}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
