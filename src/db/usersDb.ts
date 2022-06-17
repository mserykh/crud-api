import NewUser from '../utils/createNewUser';
import { Db, User } from '../utils/types';

export const getAllUsersFromDb = (db: Db): Promise<Array<User>> => {
  return new Promise((resolve) => {
    resolve(db.users);
  });
};

export const getUserFromDb = (db: Db, userId: string): Promise<User | null> => {
  return new Promise((resolve) => {
    const result = db.users.find((user) => user.id === userId);
    resolve(result || null);
  });
};

export const createUserToDb = (db: Db, data: User): Promise<User | null> => {
  return new Promise((resolve) => {
    const newUser = new NewUser(data);

    const double = db.users.find((user) => user.id === newUser.id);
    if (double) {
      throwDouledUser();
      resolve(null);
    }

    db.users.push(newUser);

    resolve(newUser || null);
  });
};

export const updateUserFromDb = (db: Db, data: User, userId: string): Promise<User | null> => {
  return new Promise((resolve) => {
    const index = db.users.findIndex((user) => user.id === userId);
    if (index > -1) {
      db.users[index] = { ...data };
      const updateUser = db.users[index];
      resolve(updateUser);
    } else {
      resolve(null);
    }
  });
};

function throwDouledUser() {
  // TODO
}
