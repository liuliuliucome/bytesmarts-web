import { useCallback, useEffect, useState } from "react";

import IconFont, { IconFontType } from "./IconFont";
import { useApp } from "../app-provider";
import { BaseOption, Select } from "./Select";
import { options as i18nOptions } from "config/i18n.config";
import { find } from "lodash";

interface LangOption extends BaseOption<I18n.Locale> {
  iconFont: IconFontType;
}

export const LangSwitcher = () => {
  const { lang, setLang } = useApp();

  const [targetLocale, setTargetLocale] = useState<LangOption>();

  useEffect(() => {
    setTargetLocale(find(i18nOptions, ["value", lang]) as LangOption);
  }, [lang]);

  const onChangeTheme = useCallback((option: LangOption) => {
    setLang(option.value);
  }, []);

  const renderItem = useCallback((option: LangOption) => {
    return (
      <>
        <span className="block w-4">
          <IconFont type={option.iconFont} />
        </span>
        <span>{option.label}</span>
      </>
    );
  }, []);

  return (
    <Select
      active={lang}
      options={i18nOptions as LangOption[]}
      onSelect={onChangeTheme}
      renderItem={renderItem}
    >
      <span className="block w-4">
        {targetLocale ? <IconFont type={targetLocale.iconFont} /> : null}
      </span>
    </Select>
  );
};
