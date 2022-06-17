import { createUserToDb, getAllUsersFromDb, getUserFromDb } from '../db/usersDb';
import { Db, User } from '../utils/types';

export const getAllUsers = async (db: Db): Promise<Array<User>> => {
  return await getAllUsersFromDb(db);
};

export const getUser = async (db: Db, userId: string): Promise<User | null> => {
  const user = await getUserFromDb(db, userId);
  return user;
};

export const createUser = async (db: Db, data: User): Promise<User | null> => {
  const user = await createUserToDb(db, data);
  return user;
};
