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
      {
        id: 'a1e6c5a6-d4b9-478d-bbe4-769b9379d9cc',
        username: 'Moominpappa',
        age: 43,
        hobbies: ['writing'],
      },
      {
        id: '8a5cb31e-05df-4b5e-a05c-1718424c4072',
        username: 'Little My',
        age: 12,
        hobbies: ['debating', 'sliding'],
      },
      {
        id: '8a5cb31e-05df-4b5e-a05c-1718424c4072',
        username: 'Snufkin',
        age: 42,
        hobbies: ['fishing', 'adventures', 'playing the harmonica'],
      },
    ],
  };

  return db;
}
