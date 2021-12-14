import { Router } from "@azizka/router";

import { JSDOM } from "jsdom";

import { HistoryMock } from "./mocks/history-mock";
import { LocationMock } from "./mocks/location-mock";

import { loadContent, navigateHandler } from "./helpers";

describe('Client helper functions test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
    global.window = (dom.window as unknown) as Window & typeof globalThis;  
    global.location = (new LocationMock() as unknown) as Location;
    global.history = (new HistoryMock(location) as unknown) as History;

    location.pathname = '/';
    location.search = '?test=123';  

    global.HTMLElement = dom.window.HTMLElement;

    global.MouseEvent = (document.defaultView as Window & typeof globalThis).MouseEvent;

    window.router = new Router();
  });

  test('Should navigateHandler work correctly', async () => {
    expect(location.pathname).toEqual('/');
    expect(location.search).toEqual('?test=123');

    const link = document.createElement('a');

    link.href = '/search?test=234';

    await navigateHandler(new MouseEvent('click'), link);

    expect(location.pathname).toEqual('/search');
    expect(location.search).toEqual('?test=234');
  });

  test('Should loadContent work correctly', async () => {
    document.body.innerHTML = `
      <div data-layout="main-layout">
        <div data-page="home-page">            
          <div>
            Home page, time: {{ data.time }}
          </div>
          <button class="mdc-fab mdc-fab--exited" data-button="scroll-top">
            <div class="mdc-fab__ripple"></div>
            <span class="mdc-fab__icon material-icons">keyboard_arrow_up</span>
          </button>    
        </div>
      </div>
    `;

    let content = await loadContent(null, true, []);

    expect(content).toBe(document.body);

    content = document.body.children[0] as HTMLElement;

    content = await loadContent(content, false, []);

    expect(content).toBe(document.body.children[0]);    
  });
});
