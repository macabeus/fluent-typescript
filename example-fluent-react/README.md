## How to run the example-fluent-react

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

The application will be built and available on `http://localhost:8080/`. You can switch between Portuguese and Japanese using a selector on this page.

But what happens if we adds a new variable on a message?

4 - Change `example-fluent-react/assets/locales/pt-br/translations.ftl` adding a new variable somewhere:

```diff
-hello-no-name = Olá, estranho!
+hello-no-name = { $time ->
+   [morning] Bom dia, estranho!
+   [afternoon] Bom tarde, estranho!
+   [night] Boa noite, estranho!
+  *[other] Olá, estranho!
+}
```

5 - Now you'll see that your build process broke! Let's fix that on `example-fluent-react/src/components/index.ts`

```diff
-<Localized typed id='hello-no-name'>
+<Localized typed id='hello-no-name' vars={{ time: 'morning' }}>
```

Now everything is fine again! Notice that we have a good auto-compelte, as well as something like that won't work:

```ts
<Localized typed id='hello-no-name' vars={{ time: [] }}> // not work because array is a wrong type
<Localized typed id='hello-no-name' vars={{ wrongVariable: 'morning' }}> // not work because of the wrong variable name
```
