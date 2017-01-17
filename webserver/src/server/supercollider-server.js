/**
 * Define functions to handle websocket messages.
 *
 * The functions are exported at the bottom of this file as
 * `socketEventHandlers`
 *
 * Each of those functions are registered as event handlers
 * for websocket messages.
 *
 * You implement a function here (eg. `noteOn` below)
 *
 * The client (in the browser) calls:
 *
 *    socket.emit(noteOn, {x: 0.5, y: 0.3});
 *
 * and the `noteOn` is called here with the socket
 * (for an invidual connected user),
 * and the data object that the client sent with `.emit`
 *
 * In these handlers you can respond back to the client with:
 *
 *    socket.emit('name', returnData);
 *
 * or broadcast to all connected clients with:
 *
 *    socket.broadcast.emit('name', returnData);
 *
 * The client then needs to register a handler for 'name'.
 */

import { resolve } from 'path';
import { server, map } from 'supercolliderjs';

/**
 * A global variable to store things like the server, notes currently playing,
 * connected clients.
 */
const context = {
  users: {}
};


/**
 * Boot scsynth, load SynthDefs and create any groups, busses you'll need.
 *
 * server.js calls this
 */
export function bootServer() {
  return server.boot().then((s) => {
    // Store the server in context.
    context.server = s;

    /**
     * Compile and this SynthDef by loading it from a file,
     * launching a sclang interpreter, compiling (possibly
     * failing with syntax errors), and sending it to the server.
     * It returns a Promise which we store in the context.
     */
    context.allpassTone = context.server.loadSynthDef('allpassTone', resolve(__dirname, './allpassTone.scd'));

    /**
     * Set up any groups, busses, buffers, efx
     * that you want to be running all the time while your app runs.
     */

  });
};

function connect(socket) {
  console.log(`Connecting user ${socket.id}`);
  context.users[socket.id] = {};
}

function disconnect(socket) {
  let user = context.users[socket.id];
  if (user) {
    releaseSynth(user);
    // remove user
    delete context.users[socket.id];
    console.log(`Removing user ${socket.id}`);
  }
}

const freqMap = map.exp({minval: 100, maxval: 5000});
const panMap = map.linear({minval: -1, maxval: 1});

function noteOn(socket, data) {
  console.log('noteOn', data);
  // get a node id
  // spawn synthNew
  // store in playing notes in context
  // no server.send ?

  let synth = context.server.synth(context.allpassTone, {
    freq: freqMap(data.y),
    ffreq: freqMap(data.x),
    pan: panMap(data.x),
    gate: 1
  });
  // Store the note
  context.users[socket.id].synth = synth;
}

function noteOff(socket, data) {
  console.log('noteOff', data);
  let user = context.users[socket.id];
  if (user) {
    releaseSynth(user);
  }
}

function noteSlide(socket, data) {
  console.log('noteSlide', data);
  let user = context.users[socket.id];
  if (user && user.synth) {
    user.synth.then((syn) => {
      syn.set({
        freq: freqMap(data.y),
        ffreq: freqMap(data.x),
        pan: panMap(data.x)
      })
    });
  }
}

function releaseSynth(user) {
  if (user.synth) {
    // What was stored is a `Promise` for a `Synth`,
    // so use `.then` to get the resolved actual `Synth`.

    // This would immediately kill the synth:
    // synth.then((syn) => syn.free());

    // This will set the gate to 0 which will release the `EnvGen`
    // (envelope generator). Then the `Synth` will free itself
    // because its `doneAction` is 2 — free the `Synth` when `EnvGen`
    // is done.
    user.synth.then(syn => syn.set({gate: 0}));
    delete user.synth;
  }
}


export const socketEventHandlers = {
  connect,
  disconnect,
  noteOn,
  noteOff,
  noteSlide
};
