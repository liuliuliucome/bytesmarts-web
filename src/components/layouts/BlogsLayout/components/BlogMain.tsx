import { DocsNavigation } from "./DocsNavigation";
import { DocsHeader } from "./DocsHeader";
import { useBlogsLayout } from "../container";
import { PropsWithChildren } from "react";
import { BlogMDX } from "./BlogMdx";

export function BlogMain() {
  const { doc } = useBlogsLayout();

  return (
    <div className="relative mr-auto w-full max-w-screen-2xl lg:flex lg:items-start">
      <div
        data-testid="DocsSidebar"
        style={{ height: "calc(100vh - 64px)" }}
        className="sticky top-16 hidden shrink-0 border-r border-gray-200 bg-secondary dark:border-gray-800 lg:block"
      >
        <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
          <DocsNavigation />
        </div>
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div>
      <div className="relative w-full grow">
        <DocsHeader title={doc.title} />
        <div className="docs prose prose-slate prose-violet mx-auto mb-4 w-full shrink p-4 pb-8 text-16 dark:prose-invert prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:max-w-3xl md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
          <BlogMDX />
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
