import "@/styles/css/index.css";
import "@/styles/sass/index.scss";
import { BaseContentLayout } from "@/components/layouts/BaseContentLayout";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    // https://github.com/vercel/next.js/issues/49350
    // TODO: next-theme 引起，还未彻底解决
    <html lang="en" suppressHydrationWarning>
      <body>
        <BaseContentLayout>{children}</BaseContentLayout>
      </body>
    </html>
  );
}
