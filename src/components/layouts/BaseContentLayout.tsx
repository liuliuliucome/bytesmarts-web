"use client";
import { ReactNode } from "react";
import { AppProvider } from "../app-provider";
import { LocalType, LocalesUtil } from "@/utils";
import { ColorSchemeProvider } from "../ColorSchemeContext";
import { ThemeProvider } from "../ThemeContainer";

type BaseContentProps = { lang?: LocalType; children: ReactNode };

export function BaseContentLayout(props: BaseContentProps) {
  const { children, lang } = props;
  const locale = LocalesUtil.toLocale(lang);

  return (
    <AppProvider initialState={{ locale }}>
      <ThemeProvider>
        <ColorSchemeProvider>
          <div
            className={
              "min-h-screen bg-primary text-slate-900 antialiased dark:text-slate-50"
            }
          >
            {children}
          </div>
        </ColorSchemeProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
