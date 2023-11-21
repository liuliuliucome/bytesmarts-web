"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef, useMemo } from "react";
import { isNil, isString } from "lodash";
import { useApp } from "@/components/app-provider";

type BaseLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps;

export type AProps = BaseLinkProps;
export type HrefType = AProps["href"];

function wrapperHref(href: HrefType) {
  return href;
}

/**
 *
 * 1. 重写 href
 * 2. 定义 locale 类型
 *
 * nextjs13 以下版本 `Link` 组件会存在问题 `https://nextjs.org/docs/messages/link-multiple-children`
 *
 * @param param0
 * @returns
 */
export const A = forwardRef<HTMLAnchorElement, Component.WithChildren<AProps>>(
  (props, ref) => {
    const { href } = props;
    const _href = useMemo(() => {
      return wrapperHref(href);
    }, [href]);

    return (
      <Link {...props} href={_href} ref={ref}>
        {props.children}
      </Link>
    );
  }
);

A.displayName = "A";
