import http from 'http';
import { getData } from '../utils/getData';
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
  throwIfInvalidId(userId);

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
  const dataRaw = await getData(req);
  const data = JSON.parse(dataRaw);

  throwIfInvalidData(data);

  const user = await createUser(db, data);

  return {
    statusCode: 201,
    payload: user,
  };
};

export const updateUserEndpoint = async (db: Db, req: http.IncomingMessage, userId: string) => {
  throwIfInvalidId(userId);

  const user = await getUser(db, userId);

  if (!user) {
    throwIfNotFound();
    return {
      statusCode: 404,
    };
  }
  const dataRaw = await getData(req);
  const data = JSON.parse(dataRaw);

  throwIfInvalidData(data);

  const updatedUser = await updateUser(db, data, userId);

  return {
    statusCode: 200,
    payload: updatedUser,
  };
};

export const deleteUserEndpoint = async (db: Db, userId: string) => {
  throwIfInvalidId(userId);

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

const throwIfInvalidId = (userId: string): void => {
  const regex = /^([a-fA-F0-9]{8})(-([a-fA-F0-9]{4})){3}-([a-fA-F0-9]{12})$/;
  const matches = userId.match(regex);
  if (matches) {
    return;
  } else {
    throw new ValidationError(400, 'User id is not valid');
  }
};

const throwIfInvalidData = (data: Omit<User, 'id'>): void => {
  const isUsernameValid = typeof data.username === 'string';
  const isAgeValid = typeof data.age === 'number';
  const isHobbiesValid = validateHobbies(data.hobbies);

  if (!isUsernameValid || !isAgeValid || !isHobbiesValid) {
    throw new ValidationError(400, 'User data is not valid');
  } else {
    return;
  }
};

const throwIfNotFound = (): void => {
  throw new ValidationError(404, 'User is not found');
};

const validateHobbies = (hobbies: string[]): boolean => {
  return Array.isArray(hobbies) && hobbies.every((item) => typeof item === 'string');
};
