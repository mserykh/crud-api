import http from 'http';
import { readUsersEndpoint } from './resources/usersResource';
import { readUserEndpoint } from './resources/usersResource';
import { createUserEndpoint } from './resources/usersResource';
import { updateUserEndpoint } from './resources/usersResource';
import { deleteUserEndpoint } from './resources/usersResource';
import { respondWithHttpError } from './utils/respondWithHttpError';
import { parseRoute } from './utils/parseRoute';
import { Db, EndpointResult, ValidationError } from './utils/types';

export const router = async (
  db: Db,
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<number> => {
  try {
    const endpoint = req.url;
    if (!endpoint) {
      return respondWithHttpError(res, 404, 'Not found');
    }

    const endpointArgs = parseRoute(endpoint);

    if (endpointArgs.length > 3) {
      return respondWithHttpError(res, 404, 'Not found');
    }

    const [api, users, userId] = endpointArgs;

    let endpointResult = {} as EndpointResult<unknown>;

    if (api !== 'api' || users !== 'users') {
      return respondWithHttpError(res, 404, 'Not found');
    } else if (req.method === 'GET' && !userId) {
      endpointResult = await readUsersEndpoint(db);
    } else if (req.method === 'GET' && userId) {
      endpointResult = await readUserEndpoint(db, userId);
    } else if (req.method === 'POST' && !userId) {
      endpointResult = await createUserEndpoint(db, req);
    } else if (req.method === 'PUT' && userId) {
      endpointResult = await updateUserEndpoint(db, req, userId);
    } else if (req.method === 'DELETE' && userId) {
      endpointResult = await deleteUserEndpoint(db, userId);
    } else {
      //return respondWithHttpError(res, 404, 'Not found');
      return respondWithHttpError(res, 405, 'HTTP method is not supported');
    }

    return respondWithPayload(res, endpointResult);
  } catch (e) {
    const error = e as Error;
    const errorMessage = error?.message || 'Server error: unknown error';
    const statusCode = error instanceof ValidationError ? error.statusCode : 500;

    return respondWithHttpError(res, statusCode, errorMessage);
  }
};

function respondWithPayload<TPayload>(
  res: http.ServerResponse,
  endpointResult: EndpointResult<TPayload>,
): number {
  res.writeHead(endpointResult.statusCode, { 'Content-Type': 'application/json' });
  if (endpointResult.payload) {
    res.end(JSON.stringify(endpointResult.payload));
  } else {
    res.end();
  }

  return endpointResult.statusCode;
}
