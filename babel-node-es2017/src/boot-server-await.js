
import { server, msg } from 'supercolliderjs';

// To use await you have to be running inside an async function
(async function() {
  // Now anything that returns a Promise can be simply awaited
  // rather than server.boot().then((s) => { }, console.error)
  let s = await server.boot();

  s.send.msg(msg.dumpOSC(1));

  function spawnGroup() {
    s.send.bundle(0.03, [
      msg.groupNew(s.state.nextNodeID())
    ]);
  }

  setInterval(spawnGroup, 2000);
})();
