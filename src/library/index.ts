export default function isTypeOfProperty<
  TObject extends object,
  TKey extends keyof TObject,
  TType extends GeneralType,
>(
  object: TObject,
  key: TKey,
  type: TType,
): object is Extract<
  TObject,
  {
    [_ in TKey]: TType extends ExtendedType<infer T>
      ? T
      : TypeOfTypeOfString<Extract<TType, string>>;
  }
> {
  return isTypeOf(object[key], type);
}

export function arrayOf<TType extends GeneralType>(
  type: TType,
): ExtendedType<TypeOfGeneralType<TType>>;
export function arrayOf(type: GeneralType): (value: unknown) => boolean {
  return value => {
    return Array.isArray(value) && value.every(item => isTypeOf(item, type));
  };
}

function isTypeOf(value: unknown, type: GeneralType): boolean {
  if (typeof type === 'function') {
    return type(value);
  } else {
    return typeof value === type;
  }
}

export type TypeOfString =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

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

export type ExtendedType<T> = (value: unknown) => value is T;

export type GeneralType = TypeOfString | ExtendedType<unknown>;

export type TypeOfGeneralType<TType extends GeneralType> =
  TType extends ExtendedType<infer T>
    ? T
    : TypeOfTypeOfString<Extract<TType, string>>;
