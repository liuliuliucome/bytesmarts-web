"use client";

import { createContainer } from "unstated-next";
import { BlogsLayoutProps } from ".";

type BlogsLayoutProviderProps = BlogsLayoutProps;

export const { Provider: BlogsLayoutProvider, useContainer: useBlogsLayout } =
  createContainer((props?: BlogsLayoutProviderProps) => {
    return {
      ...(props as BlogsLayoutProviderProps),
      activePath: props?.doc.route,
    };
  });
