import { rootPath } from "config/path.config";
import { join } from "path";

require("dotenv").config({
  path: join(rootPath, ".env.local"),
});

export const TestConfig = {
  iconFont: {
    domain: "https://www.iconfont.cn",
    username: process.env.ICONFONT_USERNAME || "",
    passwrod: process.env.ICONFONT_PASSWORD || "",
  },
};
