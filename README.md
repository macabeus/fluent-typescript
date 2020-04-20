# fluent-typescript-loader
> Webpack loader to create TypeScript declarations for Fluent files

<p align="center">
  <img src="https://user-images.githubusercontent.com/9501115/79704023-26c7d080-82a7-11ea-962e-82b90bdf89f1.png">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/9501115/79704154-e3ba2d00-82a7-11ea-988e-c0d568a46015.png">
</p>

**Fluent** is a Mozilla's programming language for natural-sounding translations. And **fluent-typescript-loader** is a Webpack Loader to automatically generate type definitions for its mensagens.

> :warning: It's a working in project project! At this moment, **you should not use it on production**!

- [Official Fluent's website](https://projectfluent.org/)
- [Fluent's Playground](https://projectfluent.org/play/)

## How to use

> You could check a complete example on [`/example`](/example) folder.

Step by step:

1 - Add  `fluent-typescript-loader` on your project:

```
> npm install fluent-typescript-loader --save-dev
- or -
> yarn add fluent-typescript-loader --dev
```

2 - Add this step on your webpack config:

```js
{
  test: /\.ftl$/,
  use: {
    loader: 'fluent-typescript-loader',
  },
},
```

> :warning: If you are using others loaders on `.ftl` files, you should add the `fluent-typescript-loader` step on last!

3 - Add someone on your TS files:

```ts
import '../assets/locales/pt-br/translations.ftl'
```

4 - And finally, add a cast on `FluentBundle` call:

```ts
const bundle = new FluentBundle('pt-br') as FluentBundleTyped
```

Finish! Now you have amazing types on your translations messages 🎉

## With thanks

This package borrows heavily from [css-modules-typescript-loader](https://github.com/Jimdo/css-modules-typescript-loader).
