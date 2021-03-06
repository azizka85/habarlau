import '../../types/window';

import {
  DEFAULT_LANGUAGE
} from '../../../globals';

import { JSDOM } from 'jsdom';

import { Router } from '@azizka/router';

import { MainLayout } from "./main-layout";

import { LocationMock } from '../../mocks/location-mock';
import { HistoryMock } from '../../mocks/history-mock';

import { toggleQueryParameter } from "../../../helpers";
import { locales } from '../../../server/helpers/locale-helpers';

describe('MainLayout test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
    global.window = (dom.window as unknown) as Window & typeof globalThis;  
    global.location = (new LocationMock() as unknown) as Location;
    global.history = (new HistoryMock(location) as unknown) as History;

    location.pathname = '/ru';
    location.search = '?main-layout-navigation=1&test=123';  

    global.HTMLElement = dom.window.HTMLElement;
    global.HTMLFormElement = dom.window.HTMLFormElement;
    global.HTMLInputElement = dom.window.HTMLInputElement;

    global.Event = (document.defaultView as Window & typeof globalThis).Event;
    global.MouseEvent = (document.defaultView as Window & typeof globalThis).MouseEvent;
    global.FocusEvent = (document.defaultView as Window & typeof globalThis).FocusEvent;
    global.CustomEvent = (document.defaultView as Window & typeof globalThis).CustomEvent;

    window.router = new Router();
  });

  test('Should get single instance of MainLayout', () => {
    const instance = MainLayout.instance;
    
    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(MainLayout);
    expect(instance).toBe(MainLayout.instance);

    expect(instance['node']).toBeFalsy();

    expect(instance['appBarElem']).toBeFalsy();
    expect(instance['drawerElem']).toBeFalsy();

    expect(instance['navIcon']).toBeFalsy();
    expect(instance['searchIcon']).toBeFalsy();

    expect(instance['headerIconElem']).toBeFalsy();
    expect(instance['headerIconBtn']).toBeFalsy();

    expect(instance['signInUpElem']).toBeFalsy();

    expect(instance['list']).toBeFalsy();
    expect(instance['langList']).toBeFalsy();

    expect(instance['langElem']).toBeFalsy();
    expect(instance['langImageElem']).toBeFalsy();

    expect(instance['searchPanel']).toBeFalsy();
    expect(instance['searchForm']).toBeFalsy(); 
    expect(instance['searchInput']).toBeFalsy();  
  });

  test('Should init from html', async () => {
    const query = window.router.query;

    let lang = 'ru';
    const navigation = query['main-layout-navigation'] ? true : false;

    document.body.innerHTML = `
      <div data-layout="main-layout">
        <header class="app-bar">
          <div class="app-bar-row">      
            <div class="app-bar-section app-bar-section-fill">
              <div class="search">
                <form method="post">          
                  <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    class="search-input app-bar-title"
                    autocomplete="off"
                  >
                  <label  
                    class="search__icon-left"           
                  ></label>
                  <button
                    type="reset" 
                    class="search-icon-right"   
                  ></button>          
                </form>    
                <div class="search-list">
                  <div style="height: 20rem;"></div>
                </div>    
              </div>
            </div>
            <div class="app-bar-section app-bar-section-align-start">
              <a 
                data-button="navigation"
                href="?${ toggleQueryParameter(query, 'main-layout-navigation') }"
              ></a>
            </div>
            <div class="app-bar-section app-bar-section-align-end">
              <a 
                data-button="search"
                href="?${ toggleQueryParameter(query, 'main-layout-search') }"
              ></a>
            </div>
          </div>
        </header>
        <aside class="drawer ${ navigation ? 'drawer-open' : '' }">
          <div class="drawer-header">
            <a 
              data-button="header-navigation"
              href="?${ toggleQueryParameter(query, 'main-layout-navigation') }"
            >
              <label data-icon="header-navigation-icon" class='drawer-header-icon-hide'></label>
            </a>
          </div>
          <div class="drawer-content">
            <div class="drawer-account-bar">
              <div class="drawer-account-bar-avatar">   
                <svg class="drawer-account-bar-avatar-icon"></svg>
              </div>
              <div class="drawer-account-bar-actions">   
                <br>
                <a href="/${lang}/sign-in" data-content="sign-in-up">Sign In/Up</a>
              </div>
            </div>
            <div class="drawer-lang-bar">
              <img 
                class="drawer-lang-bar-flag"
                data-image="lang"
              >
              <label>
                <input type="checkbox">
                <div class="drawer-lang-bar-current">            
                  <span data-content="lang"></span> 
                  <svg class="drawer-lang-bar-current-icon" viewBox="0 0 16 16">
                    <path 
                      fill-rule="evenodd" 
                      d="
                        M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 
                        0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 
                        3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z
                      "
                    />
                  </svg>
                </div>
                <div class="list" data-list="lang">
                  <a 
                    data-list-item="lang-kz"
                    class="list-item ${lang === 'kz' ? 'list-item-activated' : ''}"
                    href="/kz"
                  >
                    <img 
                      src="/images/flags/kz.svg" 
                      class="drawer-lang-bar-flag"
                    >
                  </a>
                  <a 
                    data-list-item="lang-ru"
                    class="list-item ${lang === 'ru' ? 'list-item-activated' : ''}"
                    href="/ru"
                  >
                    <img 
                      src="/images/flags/ru.svg" 
                      class="drawer-lang-bar-flag"
                    >
                  </a>
                  <a 
                    data-list-item="lang-en"
                    class="list-item ${lang === 'en' ? 'list-item-activated' : ''}"
                    href="/en"
                  >
                    <img 
                      src="/images/flags/en.svg" 
                      class="drawer-lang-bar-flag"
                    >
                  </a>
                </div>
              </label>
            </div>          
            <div class="list" data-list="main">
              <a class="list-item list-item-activated" href="#"></a>
              <a class="list-item" href="#"></a>
              <a class="list-item" href="#"></a>
            </div>
          </div>
        </aside>
        <main id="main-content" class="main-content app-bar-fixed-adjust">          
        </main>
      </div>  
    `;

    const instance = MainLayout.instance;

    await instance.init(null, false);

    expect(instance['node']).toBeTruthy();
    expect(instance['node']).toBeInstanceOf(HTMLElement);
    expect(instance['node']?.getAttribute('data-layout')).toEqual('main-layout');

    expect(instance['appBarElem']).toBeTruthy();
    expect(instance['appBarElem']).toBeInstanceOf(HTMLElement);
    expect(instance['appBarElem']?.classList.contains('app-bar')).toBeTruthy();
    expect(instance['appBarElem']?.classList.contains('app-bar-hide')).toBeFalsy();
    expect(instance['appBarElem']?.classList.contains('app-bar-scrolled')).toBeFalsy();

    expect(instance['drawerElem']).toBeTruthy();
    expect(instance['drawerElem']).toBeInstanceOf(HTMLElement);
    expect(instance['drawerElem']?.classList.contains('drawer-open')).toBeTruthy();

    expect(instance['navIcon']).toBeTruthy();
    expect(instance['navIcon']).toBeInstanceOf(HTMLElement);
    expect(instance['navIcon']?.getAttribute('data-button')).toEqual('navigation');
    expect(instance['navIcon']?.getAttribute('href')).toEqual(`?test=${query.test}`);

    expect(instance['searchIcon']).toBeTruthy();
    expect(instance['searchIcon']).toBeInstanceOf(HTMLElement);
    expect(instance['searchIcon']?.getAttribute('data-button')).toEqual('search');
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?main-layout-navigation=1&test=${query.test}&main-layout-search=1`);

    expect(instance['headerIconElem']).toBeTruthy();
    expect(instance['headerIconElem']).toBeInstanceOf(HTMLElement);
    expect(instance['headerIconElem']?.classList.contains('drawer-header-icon-hide')).toBeTruthy();

    expect(instance['headerIconBtn']).toBeTruthy();
    expect(instance['headerIconBtn']).toBeInstanceOf(HTMLElement);
    expect(instance['headerIconBtn']?.getAttribute('data-button')).toEqual('header-navigation');
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}`);

    expect(instance['signInUpElem']).toBeTruthy();
    expect(instance['signInUpElem']).toBeInstanceOf(HTMLElement);
    expect(instance['signInUpElem']?.getAttribute('data-content')).toEqual('sign-in-up');
    expect(instance['signInUpElem']?.getAttribute('href')).toEqual(`/${lang}/sign-in`);
    expect(instance['signInUpElem']?.textContent).toContain('Sign In/Up');

    expect(instance['list']).toBeTruthy();
    expect(instance['list']).toBeInstanceOf(HTMLElement);
    expect(instance['list']?.children.length).toEqual(3);

    expect(instance['langList']).toBeTruthy();
    expect(instance['langList']).toBeInstanceOf(HTMLElement);
    expect(instance['langList']?.children.length).toEqual(3);

    expect(instance['langElem']).toBeTruthy();
    expect(instance['langElem']).toBeInstanceOf(HTMLElement);
    expect(instance['langElem']?.getAttribute('data-content')).toEqual('lang');

    expect(instance['langImageElem']).toBeTruthy();
    expect(instance['langImageElem']).toBeInstanceOf(HTMLElement);
    expect(instance['langImageElem']?.getAttribute('data-image')).toEqual('lang');

    expect(instance['searchPanel']).toBeTruthy();
    expect(instance['searchPanel']).toBeInstanceOf(HTMLElement);

    expect(instance['searchForm']).toBeTruthy();
    expect(instance['searchForm']).toBeInstanceOf(HTMLFormElement);

    expect(instance['searchInput']).toBeTruthy();
    expect(instance['searchInput']).toBeInstanceOf(HTMLInputElement);
  });

  test('Handlers should work correctly', async () => {        
    const query = window.router.query;

    let lang = 'en';
    
    window.tr = locales[DEFAULT_LANGUAGE];

    const navigation = query['main-layout-navigation'] ? true : false;

    document.body.innerHTML = `
      <div data-layout="main-layout">
        <header class="app-bar">
          <div class="app-bar-row">      
            <div class="app-bar-section app-bar-section-fill">
              <div class="search">
                <form method="post">          
                  <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    class="search-input app-bar-title"
                    autocomplete="off"
                  >
                  <label  
                    for="main-content"
                    class="search-icon-left"           
                  ></label>
                  <button
                    type="reset" 
                    class="search-icon-right"   
                  ></button>          
                </form>    
                <div class="search-list">
                  <div style="height: 20rem;"></div>
                </div>    
              </div>
            </div>
            <div class="app-bar-section app-bar-section-align-start">
              <a 
                data-button="navigation"
                href="?${ toggleQueryParameter(query, 'main-layout-navigation') }"
              ></a>
            </div>
            <div class="app-bar__section app-bar__section--align-end">
              <a 
                data-button="search"
                href="?${ toggleQueryParameter(query, 'main-layout-search') }"
              ></a>
            </div>
          </div>
        </header>
        <aside class="drawer ${ navigation ? 'drawer--open' : '' }">
          <div class="drawer-header">
            <a 
              data-button="header-navigation"
              href="?${ toggleQueryParameter(query, 'main-layout-navigation') }"
            ></a>
          </div>
          <div class="drawer-content">
            <div class="drawer-account-bar">
              <div class="drawer-account-bar-avatar">   
                <svg class="drawer-account-bar-avatar-icon"></svg>
              </div>
              <div class="drawer-account-bar-actions">   
                <br>
                <a href="/en/sign-in" data-content="sign-in-up">Sign In/Up</a>
              </div>
            </div>
            <div class="drawer-lang-bar">
              <img 
                class="drawer-lang-bar-flag"
                data-image="lang"
              >
              <label>
                <input type="checkbox">
                <div class="drawer-lang-bar-current">            
                  <span data-content="lang"></span> 
                  <svg class="drawer-lang-bar-current-icon" viewBox="0 0 16 16">
                    <path 
                      fill-rule="evenodd" 
                      d="
                        M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 
                        0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 
                        3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z
                      "
                    />
                  </svg>
                </div>
                <div class="list" data-list="lang">
                  <a 
                    data-list-item="lang-kz"
                    class="list-item ${lang === 'kz' ? 'list-item-activated' : ''}"
                    href="/kz"
                  >
                    <img 
                      src="/images/flags/kz.svg" 
                      class="drawer-lang-bar-flag"
                    >
                  </a>
                  <a 
                    data-list-item="lang-ru"
                    class="list-item ${lang === 'ru' ? 'list-item-activated' : ''}"
                    href="/ru"
                  >
                    <img 
                      src="/images/flags/ru.svg" 
                      class="drawer-lang-bar-flag"
                    >
                  </a>
                  <a 
                    data-list-item="lang-en"
                    class="list-item ${lang === 'en' ? 'list-item-activated' : ''}"
                    href="/en"
                  >
                    <img 
                      src="/images/flags/en.svg" 
                      class="drawer-lang-bar-flag"
                    >
                  </a>
                </div>
              </label>
            </div>    
            <div class="list" data-list="main">
              <a class="list-item list-item-activated" href="#"></a>
              <a class="list-item" href="#"></a>
              <a class="list-item" href="#"></a>
            </div>
          </div>
        </aside>
        <main id="main-content" class="main-content app-bar-fixed-adjust">          
        </main>
      </div>  
    `;

    const instance = MainLayout.instance;

    await instance.init(null, false);
    await instance.mount();
    
    const objWindow = window as any;

    objWindow.scrollY = 100;
    
    window.dispatchEvent(new Event('scroll'));

    expect(instance['appBarElem']?.classList.contains('app-bar-hide')).toBeTruthy();
    expect(instance['appBarElem']?.classList.contains('app-bar-scrolled')).toBeTruthy();

    objWindow.scrollY = 50;

    window.dispatchEvent(new Event('scroll'));

    expect(instance['appBarElem']?.classList.contains('app-bar-hide')).toBeFalsy();
    expect(instance['appBarElem']?.classList.contains('app-bar-scrolled')).toBeTruthy();

    objWindow.scrollY = 0;

    window.dispatchEvent(new Event('scroll'));

    expect(instance['appBarElem']?.classList.contains('app-bar-hide')).toBeFalsy();
    expect(instance['appBarElem']?.classList.contains('app-bar-scrolled')).toBeFalsy();

    instance['navIcon']?.dispatchEvent(new MouseEvent('click'));
    
    await instance.load(DEFAULT_LANGUAGE ,{
      fragment: window.router.fragment,
      query: window.router.query,
      match: [],
      options: {}
    }, false);
    
    expect(instance['drawerElem']?.classList.contains('drawer-open')).toBeFalsy();
    expect(instance['navIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-navigation=1`);
    expect(instance['headerIconElem']?.classList.contains('drawer-header-icon-hide')).toBeFalsy();
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-navigation=1`);
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1`);
    expect(instance['langList']?.children[0].classList.contains('list-item-activated')).toBeTruthy();
    expect(instance['langList']?.children[0].getAttribute('href')).toEqual('/kz?test=123');
    expect(instance['langList']?.children[1].classList.contains('list-item-activated')).toBeFalsy();
    expect(instance['langList']?.children[1].getAttribute('href')).toEqual('/ru?test=123');
    expect(instance['langList']?.children[2].classList.contains('list-item-activated')).toBeFalsy();
    expect(instance['langList']?.children[2].getAttribute('href')).toEqual('/en?test=123');

    instance['searchIcon']?.dispatchEvent(new MouseEvent('click'));

    await instance.load('ru', {
      fragment: window.router.fragment,
      query: window.router.query,
      match: [],
      options: {}
    }, false);

    expect(instance['navIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1&main-layout-navigation=1`);
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1&main-layout-navigation=1`);
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?test=${query.test}`);
    expect(instance['langList']?.children[0].classList.contains('list-item-activated')).toBeFalsy();
    expect(instance['langList']?.children[0].getAttribute('href')).toEqual('/kz?test=123&main-layout-search=1');
    expect(instance['langList']?.children[1].classList.contains('list-item-activated')).toBeTruthy();
    expect(instance['langList']?.children[1].getAttribute('href')).toEqual('/ru?test=123&main-layout-search=1');
    expect(instance['langList']?.children[2].classList.contains('list-item-activated')).toBeFalsy();
    expect(instance['langList']?.children[2].getAttribute('href')).toEqual('/en?test=123&main-layout-search=1');

    instance['headerIconBtn']?.dispatchEvent(new MouseEvent('click'));

    await instance.load('en', {
      fragment: window.router.fragment,
      query: window.router.query,
      match: [],
      options: {}
    }, false);

    expect(instance['drawerElem']?.classList.contains('drawer-open')).toBeTruthy();
    expect(instance['navIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1`);
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1`);
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-navigation=1`);
    expect(instance['langList']?.children[0].classList.contains('list-item-activated')).toBeFalsy();
    expect(instance['langList']?.children[0].getAttribute('href')).toEqual('/kz?test=123&main-layout-search=1&main-layout-navigation=1');
    expect(instance['langList']?.children[1].classList.contains('list-item-activated')).toBeFalsy();
    expect(instance['langList']?.children[1].getAttribute('href')).toEqual('/ru?test=123&main-layout-search=1&main-layout-navigation=1');
    expect(instance['langList']?.children[2].classList.contains('list-item-activated')).toBeTruthy();
    expect(instance['langList']?.children[2].getAttribute('href')).toEqual('/en?test=123&main-layout-search=1&main-layout-navigation=1');

    instance['signInUpElem']?.dispatchEvent(new MouseEvent('click'));

    expect(location.pathname).toEqual('/en/sign-in');

    instance['langList']?.children[0].dispatchEvent(new MouseEvent('click'));

    expect(location.pathname).toEqual('/kz');

    instance['langList']?.children[1].dispatchEvent(new MouseEvent('click'));

    expect(location.pathname).toEqual('/ru');

    instance['langList']?.children[2].dispatchEvent(new MouseEvent('click'));

    expect(location.pathname).toEqual('/en');

    instance['list']?.children[0].dispatchEvent(new MouseEvent('mouseenter'));

    expect(instance['drawerElem']?.classList.contains('drawer-hover')).toBeTruthy();

    instance['drawerElem']?.dispatchEvent(new MouseEvent('mouseleave'));

    expect(instance['drawerElem']?.classList.contains('drawer-hover')).toBeFalsy();

    instance['drawerElem']?.querySelector('.drawer-lang-bar')?.dispatchEvent(new MouseEvent('mouseenter'));

    expect(instance['drawerElem']?.classList.contains('drawer-hover')).toBeTruthy();

    instance['searchInput']?.dispatchEvent(new FocusEvent('focus'));

    expect(instance['searchPanel']?.classList.contains('search-focus')).toBeTruthy();  

    (instance['searchInput'] as HTMLInputElement).value = 'Hello World!';

    instance['searchForm']?.querySelector('.search-icon-right')?.dispatchEvent(new MouseEvent('click'));

    expect(instance['searchPanel']?.classList.contains('search-focus')).toBeTruthy();
    expect(instance['searchInput']?.value).toBeFalsy();

    instance['searchForm']?.querySelector('.search-icon-left')?.dispatchEvent(new MouseEvent('click'));

    expect(instance['searchPanel']?.classList.contains('search-focus')).toBeFalsy();

    instance['searchInput']?.dispatchEvent(new FocusEvent('focus'));

    expect(instance['searchPanel']?.classList.contains('search-focus')).toBeTruthy();

    instance['searchForm']?.dispatchEvent(new Event('submit'));

    expect(instance['searchPanel']?.classList.contains('search-focus')).toBeFalsy();
  });
});
