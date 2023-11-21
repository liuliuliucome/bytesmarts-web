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
        {children}
      </ThemeProvider>
    </AppProvider>
  );
}
