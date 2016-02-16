#!/usr/bin/env node

var supercolliderjs = require('supercolliderjs');
var d = supercolliderjs.dryads;

var app = supercolliderjs.dryadic();

var s = new d.SCLang({options: {debug: true}});

app.play(s);
