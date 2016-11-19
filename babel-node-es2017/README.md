# ES2017

Node 6 can run virtually all of ES2015 syntax, but it cannot do:

```js
import sc from 'supercolliderjs';
```

or

```js
let server = await sc.server.boot();
```

For that you need to transpile the code using babel.

Look in src/ for the originals and in lib/ for the transpiled versions.

This new syntax is being formally approved and is still in progress towards formal adoption.

The examples in this folder use the `import` and `await/async` syntax and are made to be run on the commandline.

When building applications for web or electron you will probably be using babel anyway, so it's no problem to use these.

Warning: it can sometime be frustrating to get documentation for these plugins as things are changing constantly and there are quite a few plugins promising to solve your problems.

See `package.json` and `.babelrc` for how I solved it this time.

Usage:

```sh
npm install

npm run compile

# run the compiled version in lib/
node lib/boot-server-await.js
```
