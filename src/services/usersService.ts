import {
  createUserToDb,
  deleteUserFromDb,
  getAllUsersFromDb,
  getUserFromDb,
  updateUserFromDb,
} from '../db/usersDb';
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

export const updateUser = async (db: Db, data: User, userId: string): Promise<User | null> => {
  const user = await updateUserFromDb(db, data, userId);
  return user;
};

export const deleteUser = async (db: Db, userId: string): Promise<boolean> => {
  const deleted = await deleteUserFromDb(db, userId);
  return deleted;
};
