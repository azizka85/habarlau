import { Response } from 'supertest';

export class ResponseMock {
  constructor(protected response: Response) { }

  text() {
    return this.response.text;
  }

  json() {
    return this.response.body;
  }
}
