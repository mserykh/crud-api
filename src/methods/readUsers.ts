import http from 'http';
import { db as users } from '../db';
import { throwHttpError } from '../utils/throwHttpError';
import User from '../utils/types';

export const readUsers = async (
  data: Array<User>,
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  try {
    // check req
    // check if all users or one user is requested
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    throwHttpError(res, 500, 'Server error');
  }
};
