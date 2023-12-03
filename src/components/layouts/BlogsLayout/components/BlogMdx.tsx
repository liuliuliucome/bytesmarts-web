import { useMDXComponent } from "next-contentlayer/hooks";
import { useBlogsLayout } from "../container";
import { H2, H3, H4 } from "./Headings";
import { A } from "@/components/common";
import { Relation } from "./Relation";
import Image from "next/image";

const Section = (props: { children: React.ReactNode }) => (
  <div>{props.children}</div>
);

const mdxComponents = {
  // 通用组件
  h2: H2,
  h3: H3,
  h4: H4,
  a: A,
  Link: A,
  Image: Image,
  img: Image,

  // 扩展组件
  Callout: Section,
  Card: Section,
  Relation: Relation,
  ChevronLink: A,
  Label: Section,
  OptionsTable: Section,
  OptionTitle: Section,
  OptionDescription: Section,
};

export function BlogMDX() {
  const { doc } = useBlogsLayout();
  const MDXContent = useMDXComponent(doc.body.code || "");

  return <MDXContent components={mdxComponents as any} />;
}
