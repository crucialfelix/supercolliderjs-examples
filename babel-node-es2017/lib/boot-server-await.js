'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supercolliderjs = require('supercolliderjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let sc = require('supercolliderjs');
// console.log(sc);
// let { server, msg } = sc;

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var s, spawnGroup;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          spawnGroup = function spawnGroup() {
            s.send.bundle(0.03, [_supercolliderjs.msg.groupNew(s.state.nextNodeID())]);
          };

          _context.next = 3;
          return _supercolliderjs.server.boot();

        case 3:
          s = _context.sent;


          s.send.msg(_supercolliderjs.msg.dumpOSC(1));

          setInterval(spawnGroup, 2000);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();