declare namespace ContentlayerBuilder {
  interface ContentlayerBuilder
    extends import("contentlayer/source-files").LocalDocument {}

  type ValueType =
    | import("contentlayer/generated").Docs
    | import("contentlayer/generated").Blogs;

  type GroupType<T> = {
    key: string;
    groupBy: string;
    locale: I18n.Locale;
    slug: string;
    children?: T[];
    [key: string]: any;
  };
}
