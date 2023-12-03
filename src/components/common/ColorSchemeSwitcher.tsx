import { useCallback } from "react";
import { ThemeValues, ThemesOptions } from "../ThemeContainer/conts";
import IconFont, { IconFontType } from "./IconFont";
import { useApp } from "../app-provider";
import { BaseOption, Select } from "./Select";
import { find } from "lodash";

interface ThemeOption extends BaseOption<ThemeValues> {
  iconFont: IconFontType;
}

export const ColorSchemeSwitcher = () => {
  const { theme, setTheme } = useApp();

  const onChangeTheme = useCallback((option: ThemeOption) => {
    setTheme(option.value);
  }, []);

  const renderItem = useCallback((option: ThemeOption) => {
    return (
      <>
        <IconFont type={option.iconFont} />
        <span>{option.label}</span>
      </>
    );
  }, []);

  const target = find(ThemesOptions, ["value", theme]) as ThemeOption;

  return (
    <Select
      active={theme}
      options={ThemesOptions as ThemeOption[]}
      onSelect={onChangeTheme}
      renderItem={renderItem}
    >
      <IconFont type={target.iconFont} />
    </Select>
  );
};
