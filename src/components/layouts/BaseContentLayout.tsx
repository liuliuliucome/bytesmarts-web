import { ReactNode } from "react";
import { ThemeProvider } from "../theme-provider";
import { Analytics } from "../analytics";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";

export function BaseContentLayout(props: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <header>
          <div className="flex items-center justify-between">
            <ModeToggle />
            <nav className="ml-auto text-sm font-medium space-x-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main>{props.children}</main>
      </div>
      <Analytics />
    </ThemeProvider>
  );
}
