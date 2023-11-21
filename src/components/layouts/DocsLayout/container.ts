"use client";

import { LocalType } from "@/utils";
import { createContainer } from "unstated-next";
import { DocsLayoutProps } from ".";

type DocsLayoutProviderProps = DocsLayoutProps;

export const { Provider: DocsLayoutProvider, useContainer: useDocsLayout } =
  createContainer((props?: DocsLayoutProviderProps) => {
    return {
      ...(props as DocsLayoutProviderProps),
      activePath: props?.doc.route,
    };
  });
