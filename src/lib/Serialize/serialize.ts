export class Serialize {
  /**
   * 序列化
   * @param val
   * @returns
   */
  static serialize(val: any) {
    return JSON.stringify(val);
  }

  /**
   * 反序列化
   * @param val
   * @returns
   */
  static unserialize<T>(val: any, defaultValue?: T): T {
    try {
      return JSON.parse(val) as T;
    } catch {
      return defaultValue || val;
    }
  }

  /**
   * 序列化数据，并反转
   * @param val
   * @returns
   */
  static reset<T = any>(val: T): T {
    return Serialize.unserialize(Serialize.serialize(val));
  }
}
