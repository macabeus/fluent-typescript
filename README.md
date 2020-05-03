# fluent-typescript
> 📦 Generate automatically TypeScript declarations for Fluent files

<p align="center">
  <img src="https://user-images.githubusercontent.com/9501115/79704023-26c7d080-82a7-11ea-962e-82b90bdf89f1.png">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/9501115/79704154-e3ba2d00-82a7-11ea-988e-c0d568a46015.png">
</p>

**Fluent** is a Mozilla's programming language for natural-sounding translations. And **fluent-typescript** is a tool to automatically generate type definitions for its mensagens. So you'll have safer changes on your translates messages by types safes provided by TS. Never more will have a missing variable or forget to delete an old message. Sounds like magic, right?

> :warning: It's a working in process project! At this moment, **you should not use it on production**!

- [Official Fluent's website](https://projectfluent.org/)
- [Fluent's Playground](https://projectfluent.org/play/)

## How to use

> You could check a complete example on [`/example`](/example) folder.

Step by step:

1 - Add `fluent-typescript` on your project:

```
> npm install fluent-typescript --save-dev
- or -
> yarn add fluent-typescript --dev
```

2 - Add this script on your `package.json` config:

```js
{
  "scripts": {
    "fluent-typescript": "./node_modules/.bin/fluent-typescript ./assets/locales/"
  },
},
```

The argument `./assets/locales/` is the path where the type definition file will be saved.

3 - Run `fluent-typescript`:

```
> npm run fluent-typescript
```

Now, your FTL files will be compiled into a `.d.ts`. The last remaining step is import it on our code.

4 - Add a cast on `FluentBundle` call:

```ts
const bundle = new FluentBundle('pt-br') as FluentBundleTyped
```

Finish! Now you have amazing types on your translations messages 🎉

### How to run the example

You can quicly run the example and see the magic happens.

1 - Start `fluent-typescript`:

```
> cd example
> npm run fluent-typescript
```

2 - Start Webpack:

> Webpack isn't mandatory. It's just an example.

```
> npm run start
```

The application will be built, we could run using `node dist/main.js`, but what happens if we adds a new variable on a message?

3 - Change `example/assets/locales/pt-br/translations.ftl` adding a new variable somewhere:

```diff
-bye = Tchau
+bye = Tchau, { $name }
```

4 - Now you'll see that your build process broke! Let's fix that on `example/src/index.ts`

```ts
+++ b/example/src/index.ts
-const byeText = bundle.formatPattern(byeMessage.value)
+const byeText = bundle.formatPattern(byeMessage.value, { name: 'Macabeus' })
```

Now everything is fine again! Notice that we have a good auto-compelte, as well as something like that won't work:

```ts
const byeText = bundle.formatPattern(byeMessage.value, { name: [] }) // not work because array is a wrong type
const byeText = bundle.formatPattern(byeMessage.value, { wrongVariable: 'Macabeus' }) // not work because of the wrong variable name
```

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
