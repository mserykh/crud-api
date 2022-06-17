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
      { id: '6ba8419c-5642-4d00-9e6c-6bd4822c8415', username: 'User Name', age: 25, hobbies: [] },
      { id: '045c3012-dba9-4125-a4e8-5c372b77b4c4', username: 'Name User', age: 55, hobbies: ['painting', 'joking'] },
      { id: '1e38cc46-1256-4cb5-afc6-7e86b907197e', username: 'Best Name', age: 35, hobbies: ['jogging'] },
    ],
  };

  return db;
}
