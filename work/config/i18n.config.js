const localesMaps = Object.freeze({
  en: "en",
  zh: "zh",
});

const locales = Object.values(localesMaps);

const localUrlReg = new RegExp(`\\.(${locales.join("|")})`);

const i18nConfig = {
  localesMaps: localesMaps,

  locales: locales,

  /**
   * 默认语言
   */
  defaultLocale: locales[0],

  localUrlReg,
};

module.exports = i18nConfig;
