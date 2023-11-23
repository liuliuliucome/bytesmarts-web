/**
 * 验证是否是个非空数组
 * @param {any | undefined} value
 * @returns {value is T[]}
 */
export function isNotEmptyArray<T = any>(value: any | undefined): value is T[] {
  return !!(Array.isArray(value) && value.length);
}

/**
 *
 * @param {*} value
 * @returns {value is null | undefined}
 */
export function isSameNull(value: any): value is null | undefined {
  return value == null;
}

/**
 * 是否是一个数字，包括字符串数字, 不包括 NaN
 * @param {*} obj
 * @returns {obj is number}
 */
export function isNumberWithString(obj: any): obj is number {
  if (typeof obj === "string") {
    if (!obj.length) {
      return false;
    }

    const value = +obj;

    // NaN 不等于自身
    return value === value && typeof value === "number";
  }

  // NaN 不等于自身
  return typeof obj === "number" && obj === obj;
}

/**
 * 判断属性值是否是空
 * 包含 `isSameNull` 结果和 `''` 字符
 *
 * @param {*} value
 * @returns {value is undefined | null | ''}
 */
export function isEmptyPropsValue(value: any): value is undefined | null | "" {
  return isSameNull(value) || value === "";
}

/**
 * 判断是否以某个字符串开头
 * @param str
 * @param start
 */
export function isWhetherStar(str: string, start: string) {
  return str.substring(0, start.length) === start;
}

const toString = Object.prototype.toString;

/**
 * 判断两个值类型是否相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function isEqType(obj1: any, obj2: any): obj2 is typeof obj1 {
  return toString.call(obj1) === toString.call(obj2);
}

/**
 * 是否是 html 字符串
 * @param html
 * @returns
 */
export function isHTMLString(html: any): html is string {
  return /<[^>]+>/g.test(html);
}
