# supercollider.js examples repository

This examples should be used with at least Node 6

They are written in ES2015 and use new forms like:

- `let`
- `Promise`
- Generators
- Arrow functions
- Destructuring

They use `require` rather than `import` which is not part of ES2015.

So no [Babel](https://babeljs.io/) transpiling is required to run these.

## INSTALL

```sh
git clone https://github.com/crucialfelix/supercolliderjs-examples.git
cd supercolliderjs-examples
```

Each top level folder is an example application and has it's own `package.json` and it's own README.md to read.

For each one you should cd inside it and install it:

```sh
cd node
npm install
```

## APPS

### node

Examples of running code on the commandline. Most of the core functionality is documented here.

### webserver & websockets

Starts a webserver that browsers can connect to. It uses websockets to communicate between browser and server.

supercollider.js runs in the webserver process. You can only hear the audio if you are in the same room as the webserver machine.

The next step will be to allow multiple server machines to connect to a public hub website. These server machines would be running scsynth and hooked up to speakers.

### Electron

Applications that have server and client and can be released as a downloadable self-contained app.  This can contain scsynth and supercollider.js

[in progress]

For a full electron app with supercollider.js see: https://github.com/experimentalDataAesthetics/play-splom

### React Native

[in progress]

Applications written in JavaScript that run on iOS or Android, use native UI components and can contain an embedded scsynth.
