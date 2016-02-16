#!/usr/bin/env node

var supercolliderjs = require('supercolliderjs');
var d = supercolliderjs.dryads;

var app = supercolliderjs.dryadic();

var s = new d.SCSynth({}, [
  new d.Group(),
  new d.Group()
]);

app.play(s);

/**
 * should see two groups being created
 */
