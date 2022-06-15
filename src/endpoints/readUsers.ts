import http from 'http';
import { respondWithHttpError } from '../utils/throwHttpError';
import { Db, User } from '../utils/types';

export const readUsers = async (
  db: Db,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  userId: string,
) => {
  if (!userId) {
    const users = getAllUsers(db);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
  await getUser(res, userId);
};

// service
const getAllUsers = (db: Db): Array<User> => {
  return getAllUsersFromDb(db);
};

//db
const getAllUsersFromDb = (db: Db): Array<User> => {
  return db.users;
};

const getUser = async (res: http.ServerResponse, userId: string) => {};
