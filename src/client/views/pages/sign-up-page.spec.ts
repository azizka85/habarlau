import '../../types/window';

import { JSDOM } from "jsdom";

import { DEFAULT_LANGUAGE } from '../../../globals';

import { locales } from '../../../server/helpers/locale-helpers';

import { LocationMock } from '../../mocks/location-mock';
import { HistoryMock } from '../../mocks/history-mock';
import { fetchGetMock } from '../../mocks/request/fetch-get-mock';

import { SignUpPage } from './sign-up-page';

describe('SignUpPage test', () => {
  beforeEach(() => {
    const dom = new JSDOM();    

    global.document = dom.window.document;
    global.window = (dom.window as unknown) as Window & typeof globalThis;  
    global.location = (new LocationMock() as unknown) as Location;
    global.history = (new HistoryMock(location) as unknown) as History;

    location.pathname = '/ru/sign-up';
    location.search = '';  

    global.requestAnimationFrame = () => 0;

    global.MutationObserver = dom.window.MutationObserver;

    global.Event = (document.defaultView as Window & typeof globalThis).Event;
    global.CustomEvent = (document.defaultView as Window & typeof globalThis).CustomEvent;

    global.Element = dom.window.Element;
    global.HTMLElement = dom.window.HTMLElement;
    global.HTMLInputElement = dom.window.HTMLInputElement;

    window.layouts = {};
    window.pages = {};    

    global.fetch = req => (fetchGetMock(req as string) as unknown) as Promise<Response>;
  });

  test('Should get single instance of SignUpPage', async () => {
    const instance = SignUpPage.instance;

    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(SignUpPage);
    expect(instance).toBe(SignUpPage.instance);

    expect(instance['node']).toBeFalsy();

    expect(instance['titleElem']).toBeFalsy();

    expect(instance['nameLabelElem']).toBeFalsy();
    expect(instance['passwordLabelElem']).toBeFalsy();

    expect(instance['signInBtn']).toBeFalsy();
    expect(instance['signUpBtn']).toBeFalsy();
    expect(instance['cancelBtn']).toBeFalsy();

    expect(instance['authService']).toBeFalsy();
  });

  test('Should load content via fetch content data', async () => {
    const pageInstance = SignUpPage.instance;

    await pageInstance.init(null, false);

    window.tr = locales[DEFAULT_LANGUAGE];
    window.pages['sign-up-page'] = pageInstance;

    await pageInstance.load('ru', {
      fragment: '',
      query: {},
      match: [],
      options: {}
    }, true);

    expect(pageInstance['node']).toBeTruthy();
    expect(pageInstance['node']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['node']?.getAttribute('data-page')).toEqual('signup-page');

    expect(pageInstance['titleElem']).toBeTruthy();
    expect(pageInstance['titleElem']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['titleElem']?.textContent).toContain(window.tr('Sign Up'));

    expect(pageInstance['nameLabelElem']).toBeTruthy();
    expect(pageInstance['nameLabelElem']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['nameLabelElem']?.textContent).toContain(window.tr('Name'));

    expect(pageInstance['passwordLabelElem']).toBeTruthy();
    expect(pageInstance['passwordLabelElem']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['passwordLabelElem']?.textContent).toContain(window.tr('Password'));

    expect(pageInstance['signInBtn']).toBeTruthy();
    expect(pageInstance['signInBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['signInBtn']?.getAttribute('data-button')).toEqual('sign-in');
    expect(pageInstance['signInBtn']?.getAttribute('href')).toEqual('/ru/sign-in');
    expect(pageInstance['signInBtn']?.textContent).toContain(window.tr('Sign In'));    

    expect(pageInstance['signUpBtn']).toBeTruthy();
    expect(pageInstance['signUpBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['signUpBtn']?.getAttribute('data-button')).toEqual('sign-up');
    expect(pageInstance['signUpBtn']?.textContent).toContain(window.tr('Sign Up'));    

    expect(pageInstance['cancelBtn']).toBeTruthy();
    expect(pageInstance['cancelBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['cancelBtn']?.getAttribute('data-button')).toEqual('cancel');
    expect(pageInstance['cancelBtn']?.getAttribute('href')).toEqual('/ru/');
    expect(pageInstance['cancelBtn']?.textContent).toContain(window.tr('Cancel'));

    expect(pageInstance['authService']).toBeTruthy();
  });
});
