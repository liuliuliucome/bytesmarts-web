import { useApp } from "@/components/app-provider";
import { LocalesUtil } from "@/utils";
import { isString } from "lodash";
import Link, { LinkProps } from "next/link";
import { forwardRef, useMemo } from "react";

type BaseLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps;

export type AProps = BaseLinkProps;
export type HrefType = AProps["href"];

/**
 *
 * 1. 重写 href
 * 2. 定义 locale 类型
 *
 * nextjs13 以下版本 `Link` 组件会存在问题 `https://nextjs.org/docs/messages/link-multiple-children`
 *
 * TODO: server 和 client 无法内部修改 href，会导致 href不一致，所有暂时 locale 由外部决定
 * @param param0
 * @returns
 */
export const A = forwardRef<HTMLAnchorElement, Component.WithChildren<AProps>>(
  (props, ref) => {
    return (
      <Link {...props} ref={ref}>
        {props.children}
      </Link>
    );
  },
);

A.displayName = "A";
