import http from 'http';
import { getAllUsers } from '../services/usersService';
import { Db, EndpointResult, User } from '../utils/types';

export const readUsersEndpoint = async (db: Db): Promise<EndpointResult<Array<User>>> => {
  const users = getAllUsers(db);

  return {
    statusCode: 200,
    payload: users,
  };
};

export const readUserEndpoint = async (db: Db, userId: string): Promise<EndpointResult<User>> => {
  throwIfInvalid(userId);

  const user = getUser(db, userId);

  return {
    statusCode: 200,
    payload: user,
  };
};

export const createUserEndpoint = async (db: Db, req: http.IncomingMessage) => {
  const input = req.read() as User;
  const user = createUser(db, input);

  return {
    statusCode: 201,
    payload: user,
  };
};

export const updateUserEndpoint = async (db: Db, req: http.IncomingMessage, userId: string) => {
  const input = req.read() as User;
  const user = updateUser(db, userId, input);

  return {
    statusCode: 200,
    payload: user,
  };
};

export const deleteUserEndpoint = async (db: Db, userId: string) => {
  const result = deleteUser(db, userId);

  return {
    statusCode: result ? 204 : 404,
  };
};

function throwIfInvalid(userId: string) {
  // TODO: implement validation
}
