declare namespace Page {
  type BaseStaticParams = {
    params: {
      lang?: import("@/utils").LocalType;
    };
  };
  interface DocsSlugPageProps {
    params: {
      slug: string[];
      lang?: LocalType;
    };
  }
  interface BlogsSlugPageProps {
    params: {
      slug?: string;
      lang?: LocalType;
    };
  }

  type DocsProps = {
    params: {
      lang?: LocalType;
    };
  };

  type BreadcrumbType = { path: string; title: string };
}
