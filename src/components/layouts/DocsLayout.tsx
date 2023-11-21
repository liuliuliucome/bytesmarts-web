import { Docs } from "contentlayer/generated";
import { Container } from "../common/Container";
import { ReactNode } from "react";
type DocsLayoutProps = {
  doc: Docs;
  children: ReactNode;
};
export function DocsLayout(props: DocsLayoutProps) {
  const { doc, children } = props;
  return (
    <Container
      title={doc.title + " – Contentlayer"}
      description={doc.description}
    >
      {children}
    </Container>
  );
}
