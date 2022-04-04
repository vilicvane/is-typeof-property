[![NPM version](https://img.shields.io/npm/v/is-typeof-property?color=%23cb3837&style=flat-square)](https://www.npmjs.com/package/is-typeof-property)
[![Repository package.json version](https://img.shields.io/github/package-json/v/vilic/is-typeof-property?color=%230969da&label=repo&style=flat-square)](./package.json)
[![License](https://img.shields.io/github/license/vilic/is-typeof-property?style=flat-square)](./LICENSE)

# isTypeOfProperty(object, key, type)

> Simple utility for `if (typeof object[property]) ...` type narrowing.

TypeScript as of version 4.6 does not support discriminated union based on the type of properties, so the code below does not work as "expected":

```ts
let value!: {x: string; y: 'string'} | {x: number; y: 'number'};

if (typeof value.x === 'string') {
  // Expecting `value.y` to be 'string', but gets 'string' | 'number'.
}
```

With this utility function:

```ts
import isTypeOfProperty from 'is-typeof-property';

if (isTypeOfProperty(value, 'x', 'string')) {
  // Type of `value.y` is now 'string'.
}
```

## Installation

```sh
yarn add is-typeof-property
# or
npm install is-typeof-property
```

## License

MIT License.
