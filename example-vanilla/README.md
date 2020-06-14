## How to run the example-vanilla

You can quicly run the example and see the magic happens.

1 - Download the dependencies:

```
> npm i
```

2 - Start `fluent-typescript`:

```
> npm run fluent-typescript
```

3 - Start Webpack:

> Webpack isn't mandatory. It's just an example.

```
> npm run start
```

The application will be built, we could run using `node dist/main.js`, but what happens if we adds a new variable on a message?

4 - Change `example-vanilla/assets/locales/pt-br/translations.ftl` adding a new variable somewhere:

```diff
-bye = Tchau
+bye = Tchau, { $name }
```

5 - Now you'll see that your build process broke! Let's fix that on `example-vanilla/src/index.ts`

```diff
-const byeText = bundle.formatPattern(byeMessage.value)
+const byeText = bundle.formatPattern(byeMessage.value, { name: 'Macabeus' })
```

Now everything is fine again! Notice that we have a good auto-compelte, as well as something like that won't work:

```ts
const byeText = bundle.formatPattern(byeMessage.value, { name: [] }) // not work because array is a wrong type
const byeText = bundle.formatPattern(byeMessage.value, { wrongVariable: 'Macabeus' }) // not work because of the wrong variable name
```
