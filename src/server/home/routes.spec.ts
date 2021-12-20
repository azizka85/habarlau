import request from 'supertest';

import { app } from '../app';

describe('Home routes test', () => {
  test('Get /', async () => {
    const response = await request(app).get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toBeTruthy();
  });
});
