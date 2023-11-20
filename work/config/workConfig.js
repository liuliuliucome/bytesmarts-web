const pkg = require("package.json");

const env = (val, defaultV = "") => val || defaultV;
/**
 * @type {Readonly<Array<'zh' | 'en'>>}
 */
const locales = ["zh", "en"];

const workConfig = {
  /**
   * @type string
   */
  versoin: pkg.version,

  /**
   * 当前环境
   *
   * @type {'local'| 'test'| 'qa' |'prod'}
   */
  appEnv: env(process.env.NEXT_PUBLIC_APP_ENV),

  /**
   * 站点域名
   * @type {string}
   */
  siteURL: env(process.env.NEXT_PUBLIC_SITE_URL),

  i18n: {
    locales: locales,
    /**
     * @type {typeof locales[number]}
     */
    defaultLocale: locales[0],
  },
};

module.exports = workConfig;
