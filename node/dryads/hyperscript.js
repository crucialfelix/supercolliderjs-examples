
let { play } = require('supercolliderjs/lib/dryads');

play(
  ['sclang', [
    ['scserver', [
      ['group', [
        ['synth', {
          def: [
            'scsynthdef', {
                compileFrom: './synthdefs/saw.scd'
            }
          ],
          args: {
            freq: Math.random() * 600 + 200
          }
        }]
      ]]
    ]]
  ]]);
