import request from 'supertest';

import { app } from '../app';

describe('sign-up routes test', () => {
  test('Get /sign-up', async () => {
    const response = await request(app).get('/sign-up');

    expect(response.text).toBeTruthy();
  });
});
