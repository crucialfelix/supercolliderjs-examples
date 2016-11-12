
let sc = require('supercolliderjs');
let { server, msg } = sc;

server.boot().then(function(s) {
  s.send.msg(msg.dumpOSC(1));

  function spawnGroup() {
    s.send.bundle(0.03, [
      sc.msg.groupNew(s.state.nextNodeID())
    ]);
  }

  setInterval(spawnGroup, 2000);
});
