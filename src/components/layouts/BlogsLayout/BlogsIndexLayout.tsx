"use client";
import { PropsWithChildren } from "react";
import { Footer } from "@/components/common/Footer";
import { BlogsLayoutProvider } from "./container";
import { MainNavigation } from "@/components/common/MainNavigation";
import { BlogsIndexContent } from "./components/BlogIndexContent";
import { BlogsLayoutProps } from ".";
import { logger } from "@/utils/pulgins";

export function BlogsIndexLayout(props: PropsWithChildren<BlogsLayoutProps>) {
  const { children, ...reset } = props;
  logger("reset", reset);

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
