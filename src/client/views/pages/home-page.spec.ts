import '../../types/window';

import { DEFAULT_LANGUAGE } from '../../../globals';

import { JSDOM } from "jsdom";

import { HomePage } from "./home-page";
import { MainLayout } from "../layouts/main-layout";

import { LocationMock } from '../../mocks/location-mock';
import { HistoryMock } from '../../mocks/history-mock';

import { fetchGetMock } from '../../mocks/request/fetch-get-mock';

describe('HomePage test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
    global.window = (dom.window as unknown) as Window & typeof globalThis;  
    global.location = (new LocationMock() as unknown) as Location;
    global.history = (new HistoryMock(location) as unknown) as History;

    location.pathname = '/';
    location.search = '';  

    global.Event = (document.defaultView as Window & typeof globalThis).Event;
    global.CustomEvent = (document.defaultView as Window & typeof globalThis).CustomEvent;

    global.HTMLElement = dom.window.HTMLElement;

    window.layouts = {};
    window.pages = {};

    window.scrollTo = options => {
      const winObj = window as any;

      winObj.scrollX = typeof options === 'number' ? options : options?.left || 0;
      winObj.scrollY = typeof options === 'number' ? options : options?.top || 0;
    };

    global.fetch = req => (fetchGetMock(req as string) as unknown) as Promise<Response>;
  });

  test('Should get single instance of HomePage', () => {
    const instance = HomePage.instance;

    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(HomePage);
    expect(instance).toBe(HomePage.instance);

    expect(instance['node']).toBeFalsy();

    expect(instance['scrollTopBtn']).toBeFalsy();

    expect(instance['currScroll']).toEqual(0);
  });

  test('Should load content via fetch content data', async () => {
    const layoutInstance = MainLayout.instance;
    const pageInstance = HomePage.instance;

    const content = await pageInstance.init(null, false);
    await layoutInstance.init(content, false);

    window.layouts['main-layout'] = layoutInstance;
    window.pages['home-page'] = pageInstance;

    expect(pageInstance['node']).toBeTruthy();
    expect(pageInstance['node']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['node']?.getAttribute('data-page')).toEqual('home-page');

    expect(pageInstance['scrollTopBtn']).toBeTruthy();
    expect(pageInstance['scrollTopBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['scrollTopBtn']?.getAttribute('data-button')).toEqual('scroll-top');
    expect(pageInstance['scrollTopBtn']?.classList.contains('btn-exited')).toBeTruthy();

    expect(pageInstance['currScroll']).toEqual(0);
  });

  test('Handlers should work correctly', async () => {   
    document.body.innerHTML = `
      <div data-layout="main-layout">
        <div data-page="home-page">            
          <div>
            Home page, time: {{ data.time }}
          </div>
          <button class="btn btn-exited" data-button="scroll-top"></button>    
        </div>
      </div>
    `;

    const layoutInstance = MainLayout.instance;
    const pageInstance = HomePage.instance;

    await pageInstance.init(null, true);
    await layoutInstance.init(null, true);

    window.layouts['main-layout'] = layoutInstance;
    window.pages['home-page'] = pageInstance;

    await layoutInstance.mount();

    await pageInstance.load(DEFAULT_LANGUAGE, {
      fragment: '',
      query: {},
      match: [],
      options: {}
    }, true);

    expect(pageInstance['currScroll']).toEqual(0);
    expect(window.scrollY).toEqual(pageInstance['currScroll']);
    
    expect(pageInstance['scrollTopBtn']?.classList.contains('btn-exited')).toBeTruthy();

    window.scrollTo({
      top: 100
    });

    window.dispatchEvent(new Event('scroll'));

    expect(pageInstance['currScroll']).toEqual(100);
    expect(window.scrollY).toEqual(pageInstance['currScroll']);

    expect(pageInstance['scrollTopBtn']?.classList.contains('btn-exited')).toBeFalsy();

    window.scrollTo({
      top: 0
    });

    expect(pageInstance['currScroll']).toEqual(100);
    expect(window.scrollY).toEqual(0);

    await pageInstance.load(DEFAULT_LANGUAGE, {
      fragment: '',
      query: {},
      match: [],
      options: {}
    }, false);

    expect(pageInstance['currScroll']).toEqual(100);
    expect(window.scrollY).toEqual(pageInstance['currScroll']);

    expect(pageInstance['scrollTopBtn']?.classList.contains('btn-exited')).toBeFalsy();

    window.scrollTo({
      top: 0
    });

    window.dispatchEvent(new Event('scroll'));

    expect(pageInstance['currScroll']).toEqual(0);
    expect(window.scrollY).toEqual(pageInstance['currScroll']);
    
    expect(pageInstance['scrollTopBtn']?.classList.contains('btn-exited')).toBeTruthy();
  });
});
