## How to run the example-react-18next

You can quicly run the example and see the magic happens.

1 - Download the dependencies:

```
> npm i
```

2 - Start `fluent-typescript`:

```
> npm run fluent-typescript
```

3 - Start Webpack and Webpack Dev Server:

> Webpack isn't mandatory to use `fluent-typescript` on your project. It's just an example.

```
> npm run start
```

The application will be built and available on `http://localhost:8080/`. You can switch between Portuguese and Japanese using the query string `lng`:

```
http://localhost:8080/?lng=pt
http://localhost:8080/?lng=jp
```

But what happens if we adds a new variable on a message?

3 - Change `example-react-18next/assets/locales/pt-br/translations.ftl` adding a new variable somewhere:

```diff
-bye = Tchau
+bye = Tchau, { $name }
```

4 - Now you'll see that your build process broke! Let's fix that on `example-react-18next/src/components/index.tss`

```diff
-<p>{t('bye')}</p>
+<p>{t('bye', { name: 'Macabeus' })}</p>
```

Now everything is fine again! Notice that we have a good auto-compelte, as well as something like that won't work:

```tsx
{t('bye', { name: [] })} // not work because array is a wrong type
{t('bye', { wrongVariable: 'Macabeus' })} // not work because of the wrong variable name
```
