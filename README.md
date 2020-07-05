# fluent-typescript
> 📦 Generate automatically TypeScript declarations for Fluent files

<p align="center">
  <img src="https://user-images.githubusercontent.com/9501115/79704023-26c7d080-82a7-11ea-962e-82b90bdf89f1.png">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/9501115/79704154-e3ba2d00-82a7-11ea-988e-c0d568a46015.png">
</p>

**Fluent** is a Mozilla's programming language for natural-sounding translations. And **fluent-typescript** is a tool to automatically generate type definitions for its mensagens. So you'll have safer changes on your translates messages by types safes provided by TS. Never more will have a missing variable or forget to delete an old message. Sounds like magic, right?

Fluent client supported:
- [x] vanilla (just [`@fluent/bundle`](https://www.npmjs.com/package/@fluent/bundle))
- [x] [`react-18next`](https://www.npmjs.com/package/react-i18next)

> :warning: It's a working in process project! At this moment, **you should not use it on production**!

- [Official Fluent's website](https://projectfluent.org/)
- [Fluent's Playground](https://projectfluent.org/play/)

## How to use

As the first step, you need to install this package, of course:

```
> npm install fluent-typescript --save-dev
- or -
> yarn add fluent-typescript --dev
```

The following steps depends on which Fluent client that you are using:

### vanilla

> You could check a complete example on [`/example-vanilla`](/example-vanilla) folder. Check its readme.

Step by step:

1 - Add this script on your `package.json` config:

```js
{
  "scripts": {
    "fluent-typescript": "./node_modules/.bin/fluent-typescript vanilla ./assets/locales/"
  }
},
```

The argument `./assets/locales/` is the path where the type definition file will be saved.

2 - Run `fluent-typescript`:

```
> npm run fluent-typescript
```

Now, your FTL files will be compiled into a `.d.ts`. The last remaining step is import it on our code.

3 - Add a cast on `FluentBundle` call:

```ts
const bundle = new FluentBundle('pt-br') as FluentBundleTyped
```

Finish! Now you have amazing types on your translations messages 🎉

### react-18next

> You could check a complete example on [`/example-react-18next`](/example-react-18next) folder. Check its readme.

1 - You also need to install `@fluent/bundle`

```
> npm install @fluent/bundle --save-dev
- or -
> yarn add @fluent/bundle --dev
```

2 - Add this script on your `package.json` config:

```js
{
  "scripts": {
    "fluent-typescript": "./node_modules/.bin/fluent-typescript react-18next ./assets/locales/"
  }
},
```

The argument `./assets/locales/` is the path where the type definition file will be saved.

3 - Run `fluent-typescript`:

```
> npm run fluent-typescript
```

Now, your FTL files will be compiled into a `.d.ts`, and the type of `t` function returned by `useTranslation` will be patched, working out-of-the-box!

> :warning: At this moment, it only works with `useTranslation`. Always when possible, prefer to use that instead of `Trans` or `withTranslation`, because you have type safe only with `t` function.

Finish! Now you have amazing types on your translations messages 🎉

# How types are compiled

## Asymmetric translations

**tl;dr:** You should always use all variables that a message could need.

**Detailed explanation:**

Let's say that we have a `hello` message on our application and we should translate that to Japanese and Portuguese. Since in Japanese is more common to use the last name, and in Portuguese is more natural to use the first name, we'll have that:

```ftl
# locales/jp/translations.ftl
hello = こんにちは{ $lastName }

# locales/pt-br/translations.ftl
hello = Olá { $firstName }
```

Despite that _in practice_ we could just use `firstName` or `lastName`, our type definition file want to be most safe that could, so you'll always need to use all possibles arguments required by a message:

```ts
bundle.formatPattern(helloMessage.value, { firstName: 'Macabeus', lastName: 'Aquino' }) // ok
bundle.formatPattern(helloMessage.value, { firstName: 'Macabeus' }) // error
bundle.formatPattern(helloMessage.value, { lastName: 'Aquino' }) // error
```

Analogously on a message with selector. You should always use all variables:

```ftl
award =
  { $place ->
     [first]  You won first! Your prize is { $amount } bitcoins
    *[other] You won { $place }! Congratulations!
  }
```

```ts
bundle.formatPattern(helloMessage.value, { place: 'first', amount: 0.1 }) // ok
bundle.formatPattern(helloMessage.value, { place: 'second', amount: 0 }) // ok
bundle.formatPattern(helloMessage.value, { place: 'first' }) // error
bundle.formatPattern(helloMessage.value, { place: 'second' }) // error
```

# Developing fluent-typescript

When developing `fluent-typescript`, is important to build and watch, so you could check the changes automatically on the examples apps:

```
> npm run start
```

Check the readme on each example's folders to learn how to run them.

You also could and run tests:

```
> npm run test
```
