import '../../types/window';

import {
  DEFAULT_LANGUAGE
} from '../../../globals';

import { JSDOM } from 'jsdom';

import { Router } from '@azizka/router';

import { MainLayout } from "./main-layout";

import { LocationMock } from '../../mocks/location-mock';
import { HistoryMock } from '../../mocks/history-mock';

import { toggleQueryParameter, condition } from "../../../helpers";

describe('MainLayout test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
    global.window = (dom.window as unknown) as Window & typeof globalThis;  
    global.location = (new LocationMock() as unknown) as Location;
    global.history = (new HistoryMock(location) as unknown) as History;

    location.pathname = '/';
    location.search = '?main-layout-navigation=1&test=123';  

    global.HTMLElement = dom.window.HTMLElement;
    global.HTMLFormElement = dom.window.HTMLFormElement;

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

    expect(instance['list']).toBeFalsy();

    expect(instance['searchForm']).toBeFalsy();   
  });

  test('Should init from html', async () => {
    const query = window.router.query;

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
        <aside class="drawer ${ condition(navigation, 'drawer-open', '') }">
          <div class="drawer-header">
            <a 
              data-button="header-navigation"
              href="?${ toggleQueryParameter(query, 'main-layout-navigation') }"
            >
              <label data-icon="header-navigation-icon" class='drawer-header-icon-hide'></label>
            </a>
          </div>
          <div class="drawer-content">
            <div class="list">
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

    expect(instance['list']).toBeTruthy();
    expect(instance['list']).toBeInstanceOf(HTMLElement);
    expect(instance['list']?.children.length).toEqual(3);

    expect(instance['searchForm']).toBeTruthy();
    expect(instance['searchForm']).toBeInstanceOf(HTMLFormElement);
  });

  test('Handlers should work correctly', async () => {        
    const query = window.router.query;

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
        <aside class="drawer ${ condition(navigation, 'drawer--open', '') }">
          <div class="drawer-header">
            <a 
              data-button="header-navigation"
              href="?${ toggleQueryParameter(query, 'main-layout-navigation') }"
            ></a>
          </div>
          <div class="drawer-content">
            <div class="list">
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
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-navigation=1`);
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1`);

    instance['searchIcon']?.dispatchEvent(new MouseEvent('click'));

    await instance.load(DEFAULT_LANGUAGE, {
      fragment: window.router.fragment,
      query: window.router.query,
      match: [],
      options: {}
    }, false);

    expect(instance['navIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1&main-layout-navigation=1`);
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1&main-layout-navigation=1`);
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?test=${query.test}`);

    instance['headerIconBtn']?.dispatchEvent(new MouseEvent('click'));

    await instance.load(DEFAULT_LANGUAGE, {
      fragment: window.router.fragment,
      query: window.router.query,
      match: [],
      options: {}
    }, false);

    expect(instance['drawerElem']?.classList.contains('drawer-open')).toBeTruthy();
    expect(instance['navIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1`);
    expect(instance['headerIconBtn']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-search=1`);
    expect(instance['searchIcon']?.getAttribute('href')).toEqual(`?test=${query.test}&main-layout-navigation=1`);

    instance['list']?.children[0].dispatchEvent(new MouseEvent('mouseenter'));

    expect(instance['drawerElem']?.classList.contains('drawer-hover')).toBeTruthy();

    instance['drawerElem']?.dispatchEvent(new MouseEvent('mouseleave'));

    expect(instance['drawerElem']?.classList.contains('drawer-hover')).toBeFalsy();

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
