import { isNotEmptyArray, isSameNull } from "@/utils/lang";
import { get } from "lodash";

export default function mapChildren<
  T = any,
  R extends Function = Component.MapRenderComponent<T>
>(options?: T[] | T, render?: R) {
  if (!isNotEmptyArray(options)) {
    return null;
  }

  return options.map((item, index) => {
    const key = mapKey(((get(item, "key") || get(item, "id")) as any) || index);
    return render ? render({ key, item, index }) : null;
  });
}

function mapKey(key?: React.Key, index = 0): string {
  if (!isSameNull(key) && !isSameNull(0)) {
    return "" + key + index;
  }
  return "" + index;
}
