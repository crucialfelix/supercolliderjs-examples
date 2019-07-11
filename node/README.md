## nodejs commandline examples


```sh
cd node
npm install
```

Each of these can be run on the commandline.

```sh
cd server/server-plus
node synthdef.js
```

To stop it type `ctrl-c`

## server/server-plus

These are the first ones to look at. They show basic functionality, compiling SynthDefs and starting Synths.

This is the user-friendly API designed for ease of use.

Each method on Server returns a Promise, so the annoying work of compiling SynthDefs or loading files into Buffers is quite easy here. You call the method and you get a Promise which resolves when the work has been done. If it fails then it dumps an error.

## server/patterns

These are examples exploring JavaScript Generators which are very much the same as SuperCollider's Routine; so the Pattern library from SuperCollider can easily be ported over.

These examples are an initial exploration of how that could be done. A separate library will be released with most or all of standard SuperCollider Patterns.

## server/osc

These are low-level examples showing how OSC messages can be sent without using the server-plus extensions.

## lang

Run any SuperCollider code in a subprocess interpreter, get results (or errors) returned as a Promise.

Anything that you can normally do in SuperCollider can be done - Qt based guis, Quarks, launching a Server from the language.


## dryads

Dryadic is a more advanced framework for controlling supercollider.js and many other targets.

It is declarative — you state what should be running and how it should all be hooked up and it does it. This is as opposed to most SuperCollider code which is impertive — you call a series of commands and you have to keep track of resources and state and failures and hope you reach your goal without losing track or wasting too much time debugging.

Dryadic is also a work in progress.

These classes will soon be moved into their own small library `dryadic-supercolliderjs`.
