"use client";
import { ReactNode } from "react";
import { AppProvider } from "../app-provider";
import { LocalesUtil } from "@/utils";

type BaseContentProps = { lang?: I18n.Locale; children: ReactNode };

export function BaseContentLayout(props: BaseContentProps) {
  const { children, lang } = props;
  const locale = LocalesUtil.toLocale(lang);

  return (
    <AppProvider initialState={{ locale }}>
      <div
        className={
          "min-h-screen bg-primary text-slate-900 antialiased dark:text-slate-50"
        }
      >
        {children}
      </div>
    </AppProvider>
  );
}
