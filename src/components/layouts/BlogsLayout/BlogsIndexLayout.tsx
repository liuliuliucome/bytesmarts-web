"use client";
import { Blogs } from "contentlayer/generated";
import { PropsWithChildren } from "react";
import { Footer } from "@/components/common/Footer";
import { TreeNode } from "types/TreeNode";
import { BlogsLayoutProvider } from "./container";
import { BlogMain } from "./components";
import { MainNavigation } from "@/components/common/MainNavigation";
import { BlogsIndexContent } from "./components/BlogIndexContent";

export type BlogsLayoutProps = {
  doc: Blogs;
  allDocs: Blogs[];
  breadcrumbs: Page.BreadcrumbType[];
  tree: TreeNode[];
};

export function BlogsIndexLayout(props: PropsWithChildren<BlogsLayoutProps>) {
  const { children, ...reset } = props;

  return (
    <BlogsLayoutProvider initialState={reset}>
      <MainNavigation />
      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative pt-16" style={{ scrollPaddingTop: "150px" }}>
          <BlogsIndexContent />
        </main>
        <Footer />
      </div>
    </BlogsLayoutProvider>
  );
}
