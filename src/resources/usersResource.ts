import http from 'http';
import crypto from 'crypto';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../services/usersService';
import { Db, EndpointResult, User, ValidationError } from '../utils/types';

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
    throwIfNotFound();
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
    throwIfNotFound();
    return {
      statusCode: 404,
    };
  }
};

const throwIfInvalid = (userId: string): void => {
  const regex = /^([a-fA-F0-9]{8})(-([a-fA-F0-9]{4})){3}-([a-fA-F0-9]{12})$/;
  const matches = userId.match(regex);
  if (matches) {
    return;
  } else {
    throw new ValidationError(400, 'User id is not valid');
  }
};

function throwIfNotFound() {
  throw new ValidationError(404, 'User is not found');
}
