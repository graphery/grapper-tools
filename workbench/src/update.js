import fs        from 'node:fs';
import { WebSocketServer } from 'ws';
import log       from './log.js';

function debounce (fn, wait) {
  let n = 0;
  return function (...args) {
    clearTimeout(n);
    n = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

export default (httpServer) => {
  const wss = new WebSocketServer ({server : httpServer});
  wss.on ('connection', function connection (ws) {
    ws.send ('console.log(\'Connected to the Grapper Workbench\')');
    log ('[Workbench connected]');
    ws.on ('close', function () {
      log ('[Workbench disconnected]');
    });
  });
  const cache = new Set();
  return function (filename) {
    if (cache.has(filename)) {
      return;
    }
    fs.watch (filename, {}, debounce(() => {
      wss.clients.forEach (function each (client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send ('location.reload()');
          log ('[Workbench reload]');
        }
      });
    }), 100);
    cache.add(filename);
  };
};