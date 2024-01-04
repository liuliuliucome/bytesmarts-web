"use client";
import { useCallback, useEffect, useState } from "react";

import IconFont, { IconFontType } from "./IconFont";
import { useApp } from "../app-provider";
import { BaseOption, Select } from "./Select";
import { options as i18nOptions } from "config/i18n.config";
import { find } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocalesUtil } from "@/utils";
import { logger } from "@/utils/pulgins";

interface LangOption extends BaseOption<I18n.Locale> {
  iconFont: IconFontType;
}

export const LangSwitcher = () => {
  const { lang, setLang } = useApp();
  const pathname = usePathname();
  const [targetLocale, setTargetLocale] = useState<LangOption>();

  useEffect(() => {
    logger("lang", lang);
    setTargetLocale(find(i18nOptions, ["value", lang]) as LangOption);
  }, [lang]);

  const onChangeTheme = useCallback(
    (option: LangOption) => {
      setLang(option.value);
    },
    [setLang],
  );

  const renderItem = useCallback(
    (option: LangOption) => {
      const href = LocalesUtil.replaceLocale(pathname, option.value);
      return (
        <Link href={href} className="inline-flex items-center gap-2">
          <IconFont type={option.iconFont} />
          <span>{option.label}</span>
        </Link>
      );
    },
    [pathname],
  );

  return (
    <Select
      active={lang}
      options={i18nOptions as LangOption[]}
      onSelect={onChangeTheme}
      renderItem={renderItem}
    >
      {targetLocale ? <IconFont type={targetLocale.iconFont} /> : null}
    </Select>
  );
};
