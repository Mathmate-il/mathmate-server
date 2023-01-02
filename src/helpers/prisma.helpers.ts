// Exclude keys from user
export function exclude<T, Key extends keyof T>(
  user: T,
  keys: Key[],
): Omit<T, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
