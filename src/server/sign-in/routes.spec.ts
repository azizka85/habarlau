import request from 'supertest';

import { app } from '../app';

describe('sign-in routes test', () => {
  test('Get /sign-in', async () => {
    const response = await request(app).get('/sign-in');

    expect(response.text).toBeTruthy();
  });
});
