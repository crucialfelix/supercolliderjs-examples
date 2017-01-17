
/**
 * This demonstrates how to write to the input of sclang
 * and to capture the output with a handler.
 *
 * This is raw, low-level stuff. Normally you would  use higher level APIs.
 */

var sc = require('supercolliderjs');

sc.lang.boot({
  // no STDIN, all input will be programmatic
  stdin: false,
  // By default sclang.js echoes to the console that is sent to it (sclang.write)
  echo: false
}).then((sclang) => {

  // sclang will emit the 'stdout' event
  sclang.on('stdout', function(d) {
    console.log('STDOUT:' + d);
  });

  // and 'stderr' but these are system level errors
  // not syntax or sc run time errors
  sclang.on('stderr', function(d) {
    console.log('STDERR:' + d);
  });

  sclang.boot()
    .then(function() {
      console.log('writing to STDIN: "1 + 1"');
      sclang.write('1 + 1');
    });
});
