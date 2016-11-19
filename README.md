# supercollider.js examples repository

This examples should be used with at least Node 6

They are written in ES2015 and use new forms like:

`let`
Promise
Generators


```sh
git clone
cd supercolliderjs-examples
```

Each top level folder is an example application and has it's own `package.json`

```sh
cd node
npm install
```

## node

Examples of running code on the commandline.

## webserver

Building an application that starts a webserver that browsers can connect to. It uses websockets to communicate between browser and server.

supercollider.js runs in the webserver process. You can only hear the audio if you are in the same room as the webserver machine.

## Electron

Applications that have server and client and can be released as a downloadable self-contained app.  This can contain scsynth and supercollider.js

[in progress]

See: https://github.com/experimentalDataAesthetics/play-splom

## React Native

[in progress]

Applications written in JavaScript that run on iOS or Android, use native UI components and can contain an embedded scsynth.
