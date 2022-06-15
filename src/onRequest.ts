import http from 'http';
import { createUsers } from './methods/createUsers';
import { deleteUsers } from './methods/deleteUsers';
import { readUsers } from './methods/readUsers';
import { updateUsers } from './methods/updateUsers';

export const onRequest = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  switch (req.method) {
    case 'GET':
      readUsers(req, res);
      break;
    case 'POST':
      createUsers(req, res);
      break;
    case 'PUT':
      updateUsers(req, res);
      break;
    case 'DELETE':
      deleteUsers(req, res);
      break;
    default:
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server error, unknown method' }));
      break;
  }
};
