import http from 'http';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../services/usersService';
import { Db, EndpointResult, User } from '../utils/types';

export const readUsersEndpoint = async (db: Db): Promise<EndpointResult<Array<User>>> => {
  const users = await getAllUsers(db);

  return {
    statusCode: 200,
    payload: users,
  };
};

export const readUserEndpoint = async (db: Db, userId: string): Promise<EndpointResult<User>> => {
  throwIfInvalid(userId);

  const user = await getUser(db, userId);

  if (user) {
    return {
      statusCode: 200,
      payload: user,
    };
  } else {
    throwIfNotFound(userId);
    return {
      statusCode: 404,
    };
  }
};

export const createUserEndpoint = async (db: Db, req: http.IncomingMessage) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const dataRaw = Buffer.concat(buffers).toString();
  const data = JSON.parse(dataRaw);

  throwIfInvalid(data);

  const user = await createUser(db, data);

  return {
    statusCode: 201,
    payload: user,
  };
};

export const updateUserEndpoint = async (db: Db, req: http.IncomingMessage, userId: string) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const dataRaw = Buffer.concat(buffers).toString();
  const data = JSON.parse(dataRaw);

  const user = await updateUser(db, data, userId);

  return {
    statusCode: 200,
    payload: user,
  };
};

export const deleteUserEndpoint = async (db: Db, userId: string) => {
  throwIfInvalid(userId);

  const user = await getUser(db, userId);

  if (user) {
    await deleteUser(db, userId);
    return {
      statusCode: 204,
    };
  } else {
    throwIfNotFound(userId);
    return {
      statusCode: 404,
    };
  }
};

function throwIfInvalid(userId: string) {
  // TODO: implement validation
}

function throwIfNotFound(userId: string) {
  // TODO: implement
}
