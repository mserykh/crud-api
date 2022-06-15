import http from 'http';
import { router } from './router';
import { respondWithHttpError } from './utils/throwHttpError';
import { parseUrl } from './utils/parseUrl';
import { Db } from './utils/types';

const pid = process.pid;

const PORT = process.env.PORT || 5000;

const db = initDb();

const server = http.createServer(async (req, res): Promise<void> => {
  try {
    const path = req.url;
    if (!path) {
      respondWithHttpError(res, 404, 'Not found');
      return;
    }

    const urlArgs = parseUrl(path);
    if (!urlArgs || urlArgs[0] !== 'api' || urlArgs[1] !== 'user') {
      respondWithHttpError(res, 404, 'Not found');
      return;
    }
    const [arg1, arg2, userId] = urlArgs;

    await router(db, req, res, [arg1, arg2, userId]);

    console.log(`Process id: ${pid} received a message`);
  } catch (error) {
    console.log(error);
    respondWithHttpError(res, 500, 'Server error');
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}, process id: ${pid}`));

function initDb(): Db {
  const db: Db = {
    users: [
      { id: '1234560', name: 'User Name', age: 25, hobbies: [] },
      { id: '1234561', name: 'Name User', age: 55, hobbies: ['painting', 'joking'] },
      { id: '1234562', name: 'Best Name', age: 35, hobbies: ['jogging'] },
    ],
  };
  return db;
}
