import i18nConfig from "config/i18n.config";
import { isArray } from "lodash";
import { LocalesUtil } from "../LocalesUtil";
import { slug } from "github-slugger";

export class BaseBuilderConfig {
  lang: I18n.Locale = i18nConfig.defaultLocale;

  constructor(initConfig?: Partial<BaseBuilderConfig>) {
    if (initConfig && initConfig.lang) {
      this.lang = LocalesUtil.toLocale(initConfig.lang);
    }
  }
}
export class BaseBuilder {
  protected config: BaseBuilderConfig;

  constructor(config?: Partial<BaseBuilderConfig>) {
    this.config = new BaseBuilderConfig(config);
  }

  groupByField<T extends ContentlayerBuilder.ValueType>(
    docs: T[],
    groupKey: keyof T,
  ): ContentlayerBuilder.GroupType<T>[] {
    const maps: Record<string, ContentlayerBuilder.GroupType<T>> = {};
    for (const doc of docs) {
      const cates = doc[groupKey];
      if (!isArray(cates) || !cates.length) {
        continue;
      }

      cates.forEach((key) => {
        const target: ContentlayerBuilder.GroupType<T> = (maps[key] = maps[
          key
        ] || {
          groupBy: groupKey,
          key: key,
          locale: this.config.lang,
          slug: slug(key),
          children: [],
        });

        target.children?.push(doc);
      });
    }

    return Object.values(maps);
  }
}
