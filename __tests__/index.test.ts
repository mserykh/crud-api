import http from 'http';
import crypto from 'crypto';
import request from 'supertest';
import { router } from '../src/router';
import { Db } from '../src/utils/types';

describe('CRUD tests', () => {
  const db: Db = {
    users: [],
  };

  beforeEach(() => {
    db.users = [];
  });

  beforeEach(() => {});

  const server = http.createServer(async (req, res) => {
    await router(db, req, res);
  });
  server.listen(process.env.port || 5000);

  afterEach(() => server.close());

  it('test scenario 1', async () => {
    const newUser = {
      username: 'Moomintroll',
      age: 16,
      hobbies: ['collecting rocks and shells'],
    };
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);

    const responseWithNewUser = await request(server).post('/api/users').send(newUser);
    expect(responseWithNewUser.statusCode).toBe(201);
    const id = responseWithNewUser.body.id;
    expect(responseWithNewUser.body).toEqual({ ...newUser, id });

    const responseGetUser = await request(server).get(`/api/users/${id}`);
    expect(responseGetUser.statusCode).toBe(200);
    expect(responseGetUser.body).toEqual({ ...newUser, id });

    const updatedNewUser = {
      username: 'Moomintroll',
      age: 17,
      hobbies: ['collecting rocks and shells'],
    };

    const responseWithUpdatedNewUser = await request(server)
      .put(`/api/users/${id}`)
      .send(updatedNewUser);
    expect(responseWithUpdatedNewUser.statusCode).toBe(200);
    expect(responseWithUpdatedNewUser.body).toEqual({ ...updatedNewUser, id });

    const responseWithDelete = await request(server).delete(`/api/users/${id}`);
    expect(responseWithDelete.statusCode).toBe(204);

    const responseWithDeletedUser = await request(server).get(`/api/users/${id}`);
    expect(responseWithDeletedUser.statusCode).toBe(404);
  });

  it('test scenario 2', async () => {
    db.users = [
      ...db.users,
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
    ];

    const newUser = {
      username: 'Moominmamma',
      age: 36,
      hobbies: ['helping others', 'making journeys'],
    };
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);

    const responseWithNewUser = await request(server).post('/api/users').send(newUser);
    expect(responseWithNewUser.statusCode).toBe(201);
    const id = responseWithNewUser.body.id;
    expect(responseWithNewUser.body).toEqual({ ...newUser, id });

    const updatedNewUser = {
      username: 'Moominmamma',
      hobbies: ['helping others', 'making journeys'],
    };

    const responsePutWithInvalidNewUser = await request(server)
      .put(`/api/users/${id}`)
      .send(updatedNewUser);
    expect(responsePutWithInvalidNewUser.statusCode).toBe(400);

    const newID = 'notUuid';

    const responseGetWithInvalidId = await request(server).get(`/api/users/${newID}`);
    expect(responseGetWithInvalidId.statusCode).toBe(400);

    const uuid = crypto.randomUUID();

    const responseGetNotExistedId = await request(server).get(`/api/users/${uuid}`);
    expect(responseGetNotExistedId.statusCode).toBe(404);

    const responseDeleteNotExistedId = await request(server).delete(`/api/users/${uuid}`);
    expect(responseDeleteNotExistedId.statusCode).toBe(404);
  });

  it('test scenario 3', async () => {
    db.users = [
      ...db.users,
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
    ];

    const user = db.users[1];

    const response = await request(server).get(`/api/users/${user.id}`);
    expect(response.statusCode).toBe(200);

    const updatedUser = { ...user, age: 44 };

    const responsePutWithValidNewUser = await request(server)
      .put(`/api/users/${user.id}`)
      .send(updatedUser);
    expect(responsePutWithValidNewUser.statusCode).toBe(200);
    expect(responsePutWithValidNewUser.body).toEqual(updatedUser);

    const newID = 'notUuid';

    const responsePutWithInvalidId = await request(server).put(`/api/users/${newID}`);
    expect(responsePutWithInvalidId.statusCode).toBe(400);

    const uuid = crypto.randomUUID();

    const responsePutNotExistedId = await request(server).get(`/api/users/${uuid}`);
    expect(responsePutNotExistedId.statusCode).toBe(404);

    const responsePostIncorrectUrl = await request(server).post(`/api/users/${uuid}`);
    expect(responsePostIncorrectUrl.statusCode).toBe(404);
  });
});
