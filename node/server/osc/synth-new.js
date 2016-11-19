
let sc = require('supercolliderjs');
let { msg, map } = sc;
let { withDefs } = require('../utils');

withDefs({
  bubbles: {
    path: './bubbles.scd'
  }
}, (server) => {

  setInterval(() => {

    server.send.msg(
      msg.synthNew('bubbles', -1, msg.AddActions.TAIL, 0, {
        wobble: Math.random() * 10
      })
    );

  }, 3000);

});
