import http from 'http';
import { createUsers as createUsersEndpoint } from './endpoints/createUsers';
import { deleteUsers as deleteUsersEndpoint } from './endpoints/deleteUsers';
import { readUsers as readUsersEndpoint } from './endpoints/readUsers';
import { updateUsers as updateUsersEndpoint } from './endpoints/updateUsers';
import { respondWithHttpError } from './utils/throwHttpError';
import { Db, UrlArgs } from './utils/types';

export const router = async (
  db: Db,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  [arg1, arg2, userId]: UrlArgs,
): Promise<void> => {
  try {
    switch (req.method) {
      case 'GET':
        await readUsersEndpoint(db, req, res, userId);
        return;
      case 'POST':
        await createUsersEndpoint(req, res);
        return;
      case 'PUT':
        await updateUsersEndpoint(req, res);
        return;
      case 'DELETE':
        await deleteUsersEndpoint(req, res);
        return;
      default:
        respondWithHttpError(res, 405, 'HTTP method is not suppored');
        return;
    }
  } catch (error) {
    console.log(error);
    respondWithHttpError(res, 500, 'Server error');
  }
};
