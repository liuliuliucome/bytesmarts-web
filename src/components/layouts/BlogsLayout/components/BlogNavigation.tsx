import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useBlogsLayout } from "../container";
import mapChildren from "@/utils/mapChildren";
import { LocalesUtil } from "@/utils";

type GroupListProps<T extends ContentlayerBuilder.ValueType> = {
  options?: ContentlayerBuilder.GroupType<T>[];
  title?: React.ReactNode;
};

const routeMap = {
  categories: "category",
  tags: "tag",
};

function GroupList<T extends ContentlayerBuilder.ValueType>(
  props: GroupListProps<T>,
) {
  const { title, options } = props;
  const { type, slug } = useBlogsLayout();

  return (
    <div>
      <div>{title}</div>
      <div className="my-5">
        {mapChildren(options, ({ item, key }) => {
          const active =
            !!type && !!slug && item.groupBy === type && item.slug === slug;

          return (
            <div
              data-active={active}
              key={key}
              className={classNames(
                "group flex items-center justify-between space-x-2 rounded-md px-3 py-1",
                "text-lg font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200",
                active
                  ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-900",
              )}
            >
              <Link
                href={LocalesUtil.toHref(
                  [
                    "blog",
                    routeMap[item.groupBy as keyof typeof routeMap] || "",
                    item.slug,
                  ],
                  item.locale,
                )}
                className="flex h-full grow items-start space-x-2"
              >
                {item.key}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BlogNavigation() {
  const { tags, categoryies } = useBlogsLayout();
  const router = usePathname();
  return (
    <aside data-testid="BlogNavigation" className="w-80">
      {/* <div>
        <Tree tree={tree} level={0} activePath={router} />
      </div> */}

      <GroupList options={tags} title={"Tags"} />
      <GroupList options={categoryies} title={"Categoryies"} />
    </aside>
  );
}
