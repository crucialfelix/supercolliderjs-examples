/**
 * This shows how to send bundles with timestamps.
 *
 * Compiling a synthdef is a bit more of a pain in the ass.
 */

let sc = require('supercolliderjs');
let path = require('path');

sc.server.boot({debug: true}).then(function(s) {

  // Load a pre-compiled synthdef from disk
  // using the absolute path.
  // __dirname is the directory of the current file 'send-bundles.js'
  let cricket = path.join(__dirname, './cricket.scsyndef');
  console.log(cricket);

  // Server-callAndResponse returns a Promise that resolves after
  // scsynth acknowledges having loaded the synthdef
  s.callAndResponse(sc.msg.defLoad(cricket))
    .then(() => play(s));

});

function play(s) {
  s.send.msg(sc.msg.synthNew('cricket', s.state.nextNodeID()));

  // Send immediately results in a late warning from scsynth:
  // stdout : late 0.020416441
  // Because now is already in the past by the time the message is received
  s.send.bundle(null, [
    sc.msg.synthNew('cricket', s.state.nextNodeID())
  ]);

  // 0.03 second from now
  // small numbers are interpreted as relative seconds from now
  // 0.03 is a pretty good standard latency
  s.send.bundle(0.03, [
    sc.msg.synthNew('cricket', s.state.nextNodeID())
  ]);

  // Schedule a sequence of notes.
  // All OSC bundles are sent to scsynth immediately
  // and it's scheduler takes care of playing them at the right time.
  var start = (new Date()).getTime() / 1000;  // unix time UTC
  var seq = [
    0,
    1,
    1.5,
    2,
    8,
    12,
    16
  ];

  var bpm = 135;
  var secondsPerBeat = 1 / (bpm / 60);

  function beatToUnix(beat) {
    // Convert beat number to a unix timestamp.
    return start + beat * secondsPerBeat;
  }

  for (let item of seq) {
    s.send.bundle(beatToUnix(item), [
      sc.msg.synthNew('cricket', s.state.nextNodeID())
    ]);
  }
}
