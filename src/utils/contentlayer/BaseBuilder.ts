import { isArray } from "lodash";

export class BaseBuilder {
  static groupByField<T extends ContentlayerBuilder.ValueType>(
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
          children: [],
        });

        target.children?.push(doc);
      });
    }

    return Object.values(maps);
  }
}
