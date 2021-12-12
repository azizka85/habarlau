import request from 'supertest';

import { app } from '../app';

describe('Home routes test', () => {
  test('Get /', async () => {
    const response = await request(app).get('/');

    expect(response.text).toBeTruthy();
  });
});
