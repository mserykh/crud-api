import http from 'http';
import { onRequest } from './onRequest';
import { db } from './db';
import { throwHttpError } from './utils/throwHttpError';
import { parseUrl } from './utils/parseUrl';

const pid = process.pid;

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res): Promise<void> => {
  try {
    const path = req.url;
    if (!path) {
      throwHttpError(res, 404, 'Not found');
      return;
    }

    const urlArgs = parseUrl(path);
    if (!urlArgs || urlArgs[0] !== 'api' || urlArgs[1] !== 'user') {
      throwHttpError(res, 404, 'Not found');
      return;
    }
    const [arg1, arg2, userId] = urlArgs;

    const usersDb = db;

    await onRequest(usersDb, req, res, [arg1, arg2, userId]);

    console.log(`Process id: ${pid} received a message`);
  } catch (error) {
    console.log(error);
    throwHttpError(res, 500, 'Server error');
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}, process id: ${pid}`));
