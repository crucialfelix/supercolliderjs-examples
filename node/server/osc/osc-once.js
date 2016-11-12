
/*
This example shows the low-level function server.oscOnce

See call-and-response.js for a higher level interface for async calls.
*/

let sc = require('supercolliderjs');

sc.server.boot().then(function(s) {

  // register a one-time handler that matches /status.reply
  s.oscOnce(['/status.reply']).then(function(e) {
    console.log('oscOnce reply', e);
  });

  // send the msg that will trigger the reply
  s.send.msg(['/status']);
});
