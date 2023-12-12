import mapChildren from "@/utils/mapChildren";
import { useBlogsLayout } from "../container";
import { BlogNavigation } from "./BlogNavigation";
import Image from "next/image";
import { A } from "@/components/common";

import defaultAuthorLogo from "@/assets/images/default-author-logo.png";

export function BlogsIndexContent() {
  const { allDocs } = useBlogsLayout();
  console.log("defaultAuthorLogo", defaultAuthorLogo);

  return (
    <div className="relative mr-auto w-full max-w-screen-2xl lg:flex lg:items-start">
      <div
        data-testid="DocsSidebar"
        style={{ height: "calc(100vh - 64px)" }}
        className="sticky top-16 hidden shrink-0 border-r border-gray-200 bg-secondary dark:border-gray-800 lg:block"
      >
        <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
          <BlogNavigation />
        </div>
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div>
      <div className="relative w-full grow">
        <div className="mx-auto mb-4 w-full shrink p-4 py-8 text-text-primary md:mb-8 md:max-w-3xl md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
          {mapChildren(allDocs, ({ item, key }) => (
            <article
              key={key}
              className="md:mt-22 mt-12  max-w-3xl first-of-type:mt-0"
            >
              <header className="flex items-center">
                <nav>
                  <div className="overflow-hidden rounded-full">
                    <Image
                      width={35}
                      height={35}
                      src={item.authorLogo || defaultAuthorLogo}
                      alt={item.author || "author"}
                    />
                  </div>
                </nav>

                <div className="ml-2">
                  <time>{new Date(item.last_edited).toLocaleString()}</time>
                </div>
              </header>
              <h2 className="py-4 text-2xl font-semibold lg:max-w-full">
                <A href={item.fileMetaData.fullHref}>{item.title}</A>
              </h2>
              <p className="text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      {/* <div
        style={{ maxHeight: "calc(100vh - 128px)" }}
        className="1.5xl:block sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8 pr-16"
      >
        <PageNavigation headings={doc.headings} />
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div> */}
    </div>
  );
}
