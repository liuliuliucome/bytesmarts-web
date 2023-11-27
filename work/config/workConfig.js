const pkg = require("package.json");
const env = (val, defaultV = "") => val || defaultV;
const i18nConfig = require("./i18n.config");

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

  i18n: i18nConfig,
};

module.exports = workConfig;
