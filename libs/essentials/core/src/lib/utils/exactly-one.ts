export type ExactlyOne<T, TKey = keyof T> = TKey extends keyof T
  ? { [key in Exclude<keyof T, TKey>]?: never } & { [key in TKey]: T[key] }
  : never;
