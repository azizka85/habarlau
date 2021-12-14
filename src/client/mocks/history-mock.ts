import { LocationMock } from "./location-mock";

export class HistoryMock {
  constructor(protected location: LocationMock) { }

  replaceState(state: any, data: any, path: string) {
    this.changeLocation(path);
  }

  pushState(state: any, data: any, path: string) {
    this.changeLocation(path);
  }

  changeLocation(path: string) {
    let query = path?.split?.('?');

    if(query) {
      this.location.pathname = query[0];

      if(query.length > 1) {
        this.location.search = '?' + query[1];
      }
    }
  }
}
