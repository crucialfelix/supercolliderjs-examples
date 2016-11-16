
let sc = require('supercolliderjs');
let { msg, map } = sc;
let { withDefs } = require('../utils');

function spawn(defName, args) {
  return msg.synthNew(defName, -1, msg.AddActions.TAIL, 0, args);
}

withDefs({
  bubbles: {
    path: './bubbles.scd'
  }
}, (server) => {

  setInterval(() => {

    server.send.msg(
      spawn('bubbles', {wobble: Math.random() * 10})
    );

  }, 3000);

});
