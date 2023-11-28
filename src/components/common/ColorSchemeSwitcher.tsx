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
        <span className="block w-4">
          <IconFont type={option.iconFont} />
        </span>
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
      <span className="block w-4">
        <IconFont type={target.iconFont} />
      </span>
    </Select>
  );
};
