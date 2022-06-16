import { getAllUsersFromDb } from '../db/usersDb';
import { Db, User } from '../utils/types';

export const getAllUsers = (db: Db): Array<User> => {
  return getAllUsersFromDb(db);
};

export const getUser = async (db: Db, userId: string): Promise<User> => {
  return {} as User;
};
