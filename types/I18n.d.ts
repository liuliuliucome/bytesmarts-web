declare namespace I18n {
  type LocalesType = typeof import("../work/config/i18n.config").locales;
  type Locale = LocalesType[number];
}
