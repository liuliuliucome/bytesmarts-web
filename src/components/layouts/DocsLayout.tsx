"use client";

import { Docs } from "contentlayer/generated";
import { ReactNode } from "react";
import { MainNavigation } from "../common/MainNavigation";
import { Footer } from "../common/Footer";
import { DocsMain } from "../docs";

type DocsLayoutProps = {
  doc: Docs;
  children: ReactNode;
};

export function DocsLayout(props: DocsLayoutProps) {
  const { doc, children } = props;

  return (
    <>
      <MainNavigation />
      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative pt-16" style={{ scrollPaddingTop: "150px" }}>
          <DocsMain doc={doc} />
        </main>
        <Footer />
      </div>
    </>
  );
}
