"use client";
import { Blogs } from "contentlayer/generated";
import { PropsWithChildren } from "react";
import { Footer } from "@/components/common/Footer";
import { TreeNode } from "types/TreeNode";
import { BlogsLayoutProvider } from "./container";
import { BlogMain } from "./components";
import { MainNavigation } from "@/components/common/MainNavigation";

export type BlogsLayoutProps = {
  doc: Blogs;
  allDocs: Blogs[];
  breadcrumbs: Page.BreadcrumbType[];
  tree: TreeNode[];
  categoryies: ContentlayerBuilder.GroupType<Blogs>[];
  tags: ContentlayerBuilder.GroupType<Blogs>[];
  type?: "categories" | "tags";
  slug?: string;
};

export function BlogsLayout(props: PropsWithChildren<BlogsLayoutProps>) {
  const { children, ...reset } = props;

  return (
    <BlogsLayoutProvider initialState={reset}>
      <MainNavigation />
      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative pt-16" style={{ scrollPaddingTop: "150px" }}>
          <BlogMain />
        </main>
        <Footer />
      </div>
    </BlogsLayoutProvider>
  );
}
