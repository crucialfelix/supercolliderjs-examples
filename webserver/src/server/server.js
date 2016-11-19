'use strict';

import _ from 'lodash';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import compression from 'compression';
import { bootServer, socketEventHandlers } from './supercollider-server';

let app = express();
let webserver = http.Server(app);
let io = new SocketIO(webserver);
let port = process.env.PORT || 3000;
let users = [];
let sockets = {};

app.use(compression({}));
app.use(express['static'](__dirname + '/../client'));

// Boot supercollider server here
bootServer();

webserver.listen(port, () => {
  console.log(`[INFO] Open in your browser: http://localhost:${port}`);
});

/**
 * Called whenever a new websocket connection is opened.
 */
io.on('connection', (socket) => {

  if (socketEventHandlers.connect) {
    socketEventHandlers.connect(socket);
  }

  /**
   * Connect Event handlers from event-handlers
   */
  _.forIn(socketEventHandlers, (fn, name) => {
    if (name !== 'connect') {
      socket.on(name, (data) => fn(socket, data));
    }
  })
});
