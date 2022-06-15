import http from 'http';
import { onRequest } from './onRequest';

const pid = process.pid;

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  onRequest(req, res);
  // if (req.url === '/api/users' && req.method === 'GET') {
  //   getUsers(req, res);
  // } else {
  //   res.writeHead(404, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify({ message: 'Not found' }));
  // }
  console.log(`Process id: ${pid} received a message`);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}, process id: ${pid}`));
