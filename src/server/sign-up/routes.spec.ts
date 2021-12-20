import request from 'supertest';

import { app } from '../app';

describe('sign-up routes test', () => {
  test('Get /sign-up', async () => {
    const response = await request(app).get('/sign-up');

    expect(response.status).toEqual(200);
    expect(response.text).toBeTruthy();
  });
});
