import http from 'http';
import { db as users } from '../db';
import { throwHttpError } from '../utils/throwHttpError';
import User from '../utils/types';

export const readUsers = async (
  data: Array<User>,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  userId: string,
) => {
  try {
    if (!userId) {
      await getAllUsers(res);
    }
    await getUser(res, userId);
  } catch (error) {
    console.log(error);
    throwHttpError(res, 500, 'Server error');
  }
};

const getAllUsers = async (res: http.ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

const getUser = async (res: http.ServerResponse, userId: string) => {
  
};
