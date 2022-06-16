import http from 'http';
import { router } from './router';
import { respondWithHttpError } from './utils/respondWithHttpError';
import { Db } from './utils/types';

const pid = process.pid;

const PORT = process.env.PORT || 5000;

const db = initDb();

const server = http.createServer(async (req, res): Promise<void> => {
  console.log(`Process id: ${pid} received a message`);
  await router(db, req, res);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}, process id: ${pid}`));

function initDb(): Db {
  const db: Db = {
    users: [
      { id: '1234560', username: 'User Name', age: 25, hobbies: [] },
      { id: '1234561', username: 'Name User', age: 55, hobbies: ['painting', 'joking'] },
      { id: '1234562', username: 'Best Name', age: 35, hobbies: ['jogging'] },
    ],
  };

  return db;
}
