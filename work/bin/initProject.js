const nextPkg = require("next/package.json");

const { Logger } = require("../util");

Logger.server("[node version]", process.version);
Logger.server("[next version]", nextPkg.version);
Logger.server("[env]", process.env.NEXT_PUBLIC_APP_ENV);
