"use client";

import { Docs } from "contentlayer/generated";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { MainNavigation } from "../../common/MainNavigation";
import { Footer } from "../../common/Footer";
import { DocsMain } from "../../docs";
import { TreeNode } from "@/types/TreeNode";
import { DocsLayoutProvider } from "./container";

export type DocsLayoutProps = {
  doc: Docs;
  allDocs: Docs[];
  tree: TreeNode[];
};

export function DocsLayout(props: PropsWithChildren<DocsLayoutProps>) {
  const { children, ...reset } = props;

  useEffect(() => {
    console.log("alldocs", reset);
  }, [reset]);

  return (
    <DocsLayoutProvider initialState={reset}>
      <MainNavigation />
      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative pt-16" style={{ scrollPaddingTop: "150px" }}>
          <DocsMain />
        </main>
        <Footer />
      </div>
    </DocsLayoutProvider>
  );
}
