import request from 'supertest';

import { app } from '../../../server/app';

import { ResponseMock } from './response-mock';

export async function fetchGetMock(url: string) {
  const response = await request(app).get(url);

  return new ResponseMock(response);
}
