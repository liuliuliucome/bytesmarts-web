import iconFontJson from 'work/config/iconFont.json';
import { createFromIconfontCN } from '@ant-design/icons';

export type IconFontType = 'icon-mac' | 'icon-shuizhu' | 'icon-menu' | 'icon-close' | 'icon-expand' | 'icon-windows' | 'icon-android' | 'icon-29mac' | 'icon-search';

/**
 * 借用 antd createFromIconfontCN 创建的 iconfont.cn 上的字体图标
 */
const IconFont = createFromIconfontCN<IconFontType>({
  scriptUrl: iconFontJson.js,
});

export default IconFont;
