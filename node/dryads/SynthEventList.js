/**
 * This example generates a random sequence and plays the first
 * 4 seconds in a loop.
 *
 * SynthEventList has other tricks not yet shown here yet.
 * You can reschedule or alter the event list while playing.
 *
 * The scheduler can be given different scheduling functions,
 * one of which is this sequential event list.
 *
 * Other versions could use tempo, mathematical formula,
 * non-deterministic, event-by-event scheduling.
 */
let { play } = require('supercolliderjs/lib/dryads');

function saw(children) {
  return ['scsynthdef', {
    source: `
      SynthDef("saw", { arg freq;
        Out.ar(0, EnvGen.kr(Env.perc, doneAction: 2) * Saw.ar(freq))
      });
    `
  }, children];
}

function randomEvent() {
  return {
    time: Math.round(Math.random() * 20) * 0.25,
    defName: 'saw',
    args: {
      freq: Math.random() * 500 + 100
    }
  };
}

function synthEventList() {
  return [
    'syntheventlist', {
      events: Array(200).fill(1).map(randomEvent),
      loopTime: 4
    }
  ];
}

play(['scserver', {}, [
    saw([synthEventList()])
  ]
]);
