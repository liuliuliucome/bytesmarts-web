import iconFontJson from "work/config/iconFont.json";
import { createFromIconfontCN } from "@ant-design/icons";

export type IconFontType =
  | "icon-calendar"
  | "icon-password"
  | "icon-cloud"
  | "icon-yidongduanshishi"
  | "icon-tools"
  | "icon-browsing-history-o"
  | "icon-web"
  | "icon-Router"
  | "icon-paper"
  | "icon-browsing-history"
  | "icon-email"
  | "icon-privacy"
  | "icon-ios"
  | "icon-steam"
  | "icon-meiguoguoqi-"
  | "icon-zhongwen"
  | "icon-fangxiang-xiangyou"
  | "icon-File"
  | "icon-close"
  | "icon-menu"
  | "icon-system"
  | "icon-qingtian"
  | "icon-yueliang"
  | "icon-yibiaopan"
  | "icon-mac"
  | "icon-shuizhu"
  | "icon-expand"
  | "icon-29mac"
  | "icon-search";

/**
 * 借用 antd createFromIconfontCN 创建的 iconfont.cn 上的字体图标
 */
const IconFont = createFromIconfontCN<IconFontType>({
  scriptUrl: "/_static/iconfont/iconfont.js",
});

export default IconFont;
