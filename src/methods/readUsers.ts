import http from 'http';
import { db as users } from '../db';

export const readUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};
