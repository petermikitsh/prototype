import http from 'http';
import app from './server';

const server = http.createServer(app);
let currentApp = app;
server.listen(3000);

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
