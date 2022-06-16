import { Db, User } from '../utils/types';

export const getAllUsersFromDb = (db: Db): Array<User> => {
  return db.users;
};
