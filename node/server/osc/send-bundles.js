

let sc = require('supercolliderjs');

sc.server.boot({debug: true}).then(function(s) {

  s.send.msg(sc.msg.groupNew(s.state.nextNodeID()));

  // send immediately
  // results in a late warning from scsynth:
  // stdout : late 0.020416441
  // because now is already in the past by the time the message
  // is received
  s.send.bundle(null, [
    sc.msg.groupNew(s.state.nextNodeID())
  ]);

  // 0.03 second from now
  // small numbers are interpreted as relative seconds from now
  s.send.bundle(0.03, [
    sc.msg.groupNew(s.state.nextNodeID())
  ]);

  // Schedule a sequence of notes.
  // All osc bundles are sent immediately.
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
  var bpm = 120;
  var secondsPerBeat = 1 / (bpm / 60);

  function sched(beat) {
    return start + beat * secondsPerBeat;
  }

  for (var i = 0; i < seq.length; i++) {
    // Here we are sending large numbers
    // which are interpreted as unix timestamps.
    s.send.bundle(sched(seq[i]), [
      sc.msg.groupNew(s.state.nextNodeID())
    ]);
  }

});
