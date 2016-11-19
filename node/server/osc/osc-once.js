/**
 * This example shows the low-level function server.oscOnce
 *
 * See call-and-response.js for a higher level interface for async calls.
 */

let sc = require('supercolliderjs');

sc.server.boot().then(function(s) {

  // Register a one-time handler that matches /status.reply
  s.oscOnce(['/status.reply']).then(function(e) {
    console.log('oscOnce reply', e);
  });

  // When we send /status then scsynth will reply with /status.reply
  s.send.msg(['/status']);
});
