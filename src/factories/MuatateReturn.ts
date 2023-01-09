export class MutateReturn {
  public excludeOnly<T, Key extends keyof T>(
    object: T,
    keys: Key[],
  ): Omit<T, Key> {
    for (const key of keys) {
      delete object[key];
    }
    return object;
  }

  public includeOnly<T, Key extends keyof T>(
    object: T,
    keys: Key[],
  ): Omit<T, Key> {
    for (const key of keys) {
      if (!keys.includes(key)) {
        delete object[key];
      }
    }
    return object;
  }
}
