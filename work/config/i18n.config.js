/**
 * @type {Readonly<Array<'zh' | 'en'>>}
 */
const locales = ["en", "zh"];

const localUrlReg = new RegExp(`\\.(${locales.join("|")})`);

const i18nConfig = {
  locales: locales,
  /**
   * 默认语言
   */
  defaultLocale: locales[0],

  localUrlReg,
};

module.exports = i18nConfig;
