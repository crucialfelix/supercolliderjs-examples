import { msg } from 'supercolliderjs';
import { boot } from 'supercolliderjs/server';

// let sc = require('supercolliderjs');

sc.server.boot().then(function(s) {
  s.send.msg(msg.dumpOSC(1));

  function spawnGroup() {
    s.send.bundle(0.03, [
      msg.groupNew(s.state.nextNodeID())
    ]);
  }

  setInterval(spawnGroup, 2000);

});
