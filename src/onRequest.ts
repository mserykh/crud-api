import http from 'http';
import { createUsers } from './methods/createUsers';
import { deleteUsers } from './methods/deleteUsers';
import { readUsers } from './methods/readUsers';
import { updateUsers } from './methods/updateUsers';
import { throwHttpError } from './utils/throwHttpError';
import User, { UrlArgs } from './utils/types';

export const onRequest = async (
  data: Array<User>,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  [arg1, arg2, userId]: UrlArgs,
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await readUsers(data, req, res, userId);
      break;
    case 'POST':
      await createUsers(req, res);
      break;
    case 'PUT':
      await updateUsers(req, res);
      break;
    case 'DELETE':
      await deleteUsers(req, res);
      break;
    default:
      throwHttpError(res, 500, 'Server error, unknown method');
      break;
  }
};
