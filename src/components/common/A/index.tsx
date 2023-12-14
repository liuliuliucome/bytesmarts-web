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
 * @param param0
 * @returns
 */
export const A = forwardRef<HTMLAnchorElement, Component.WithChildren<AProps>>(
  (props, ref) => {
    const { href, locale } = props;
    const { lang } = useApp();
    const _href = useMemo(() => {
      const _locale = isString(locale) ? (locale as I18n.Locale) : lang;
      if (isString(href)) {
        return LocalesUtil.toHref(href, _locale);
      }

      if (href.pathname) {
        href.pathname = LocalesUtil.toHref(href.pathname, _locale);
      }
      return href;
    }, [href, lang, locale]);

    return (
      <Link {...props} href={_href} ref={ref}>
        {props.children}
      </Link>
    );
  },
);

A.displayName = "A";
