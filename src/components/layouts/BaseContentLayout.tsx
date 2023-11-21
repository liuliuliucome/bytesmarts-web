import { ReactNode } from "react";
import { ThemeProvider } from "../theme-provider";
import { AppProvider } from "../app-provider";
import { LocalType, LocalesUtil } from "@/utils";

type BaseContentProps = { lang?: LocalType; children: ReactNode };

export function BaseContentLayout(props: BaseContentProps) {
  const { children, lang } = props;
  const locale = LocalesUtil.toLocale(lang);

  return (
    <AppProvider initialState={{ locale }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div
          className={
            "antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
          }
        >
          {children}
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}
