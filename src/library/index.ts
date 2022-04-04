export function isTypeOfProperty<
  T extends object,
  TKey extends keyof T,
  TType extends
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function',
>(
  object: T,
  key: TKey,
  type: TType,
): object is Extract<T, {[_ in TKey]: TypeOfTypeOfString<TType>}> {
  return typeof object[key] === type;
}

export type TypeOfTypeOfString<TType extends string> = TType extends 'string'
  ? string
  : TType extends 'number'
  ? number
  : TType extends 'bigint'
  ? bigint
  : TType extends 'boolean'
  ? boolean
  : TType extends 'symbol'
  ? symbol
  : TType extends 'undefined'
  ? undefined
  : TType extends 'object'
  ? object
  : TType extends 'function'
  ? (...args: any[]) => any
  : never;
