import * as router from '@azizka/router';

import { SCROLL_THRESHOLD } from "../../../globals";
import { Page } from '../view';
import { BaseLayout } from "./base-layout";

import { toggleQueryParameter } from "../../../helpers";
import { mount, navigateHandler, unmount } from '../../helpers';

import { ScrollActionTo, ScrollActionTop, ScrollEventData, ScrollEventType } from '../../types/scroll';

export class MainLayout extends BaseLayout implements Page {
  protected static layout: MainLayout | null = null;    

  protected node: HTMLElement | null = null;

  protected appBarElem: HTMLElement | null = null;
  protected drawerElem: HTMLElement | null = null;  

  protected navIcon: HTMLElement | null = null;
  protected searchIcon: HTMLElement | null = null;

  protected headerIcon: HTMLElement | null = null;
  protected headerIconBtn: HTMLElement | null = null;

  protected list: HTMLElement | null = null;

  protected searchPanel: HTMLElement | null = null;
  protected searchForm: HTMLFormElement | null = null;  
  protected searchInput: HTMLInputElement | null = null;

  static get instance(): MainLayout {
    if(!MainLayout.layout) {
      MainLayout.layout = new MainLayout();
    }

    return MainLayout.layout;
  }

  get elem(): HTMLElement | null {
    return this.node;
  }

  async init(parent: HTMLElement | null, firstTime: boolean) {
    let content = parent || document.body;

    this.node = content.querySelector('[data-layout="main-layout"]') || null; 

    if(this.node) {
      this.appBarElem = this.node.querySelector('.app-bar'); 
      this.drawerElem = this.node.querySelector('.drawer');      

      this.navIcon = this.appBarElem?.querySelector('[data-button="navigation"]') || null;
      this.navIcon?.addEventListener('click', event => navigateHandler(event, this.navIcon as HTMLElement));

      this.searchIcon = this.appBarElem?.querySelector('[data-button="search"]') || null;
      this.searchIcon?.addEventListener('click', event => navigateHandler(event, this.searchIcon as HTMLElement));      

      this.headerIconBtn = this.drawerElem?.querySelector('[data-button="header-navigation"]') || null;

      if(this.headerIconBtn) {
        this.headerIcon = this.headerIconBtn.querySelector('[data-icon="header-navigation-icon"]');

        this.headerIconBtn.addEventListener('click', event => navigateHandler(event, this.headerIconBtn as HTMLElement));
      }

      this.list = this.drawerElem?.querySelector('.list') || null;

      if(this.list) {
        for(const item of this.list.children) {
          item.addEventListener(
            'mouseenter', 
            () => this.drawerElem?.classList.add('drawer-hover')
          );
        }

        this.drawerElem?.addEventListener(
          'mouseleave', 
          () => this.drawerElem?.classList.remove('drawer-hover')
        );
      }

      this.searchPanel = this.appBarElem?.querySelector('.search') || null;

      this.searchForm = this.searchPanel?.querySelector('form') || null; 

      this.searchInput = this.searchForm?.querySelector('.search-input') as HTMLInputElement;

      this.searchInput?.addEventListener('focus', () => {              
        this.searchPanel?.classList.add('search-focus');
      });

      this.searchForm?.querySelector('.search-icon-right')?.addEventListener('click', () => {        
        if(this.searchInput) {
          this.searchInput.value = '';
          this.searchInput.focus();
        }
      });

      this.searchForm?.querySelector('.search-icon-left')?.addEventListener('click', () => {
        this.searchPanel?.classList.remove('search-focus');
      });

      this.searchForm?.addEventListener('submit', event => {
        event.preventDefault();

        const data = new FormData(this.searchForm as HTMLFormElement);

        console.log('Form submited: ');          

        for(let item of data.entries()) {
          console.log(item[0] + ':', item[1]);          
        }
      });

      let prevScroll = 0;

      window.addEventListener('scroll', () => {      
        const currScroll = window.scrollY || 0;
  
        if(Math.abs(currScroll - prevScroll) > SCROLL_THRESHOLD) {
          if(prevScroll >= currScroll) {
            this.appBarElem?.classList.remove('app-bar-hide');            
          } else {
            this.appBarElem?.classList.add('app-bar-hide');
          }
        }      
  
        if(currScroll <= 0) {
          this.appBarElem?.classList.remove('app-bar-scrolled');
        } else {
          this.appBarElem?.classList.add('app-bar-scrolled');
        }
  
        this.node?.dispatchEvent(new CustomEvent<ScrollEventData>(ScrollEventType, {
          detail: {
            currScroll,
            prevScroll
          }
        }));
        
        prevScroll = currScroll;
      });
    }

    return content;
  }

  async mount() {
    await mount(this.node);      
  }

  async unmount() {
    await unmount(this.node);    
  } 

  async load(page: router.Page, firstLoad: boolean) {    
    const navigation = page.query['main-layout-navigation'];    

    if(this.navIcon) {      
      const path = `?${toggleQueryParameter(page.query, 'main-layout-navigation')}`;

      this.navIcon.setAttribute('href', path);
    }

    if(this.headerIconBtn) {
      const path = `?${toggleQueryParameter(page.query, 'main-layout-navigation')}`;

      this.headerIconBtn.setAttribute('href', path);
    }

    if(this.searchIcon) {    
      const path = `?${toggleQueryParameter(page.query, 'main-layout-search')}`;

      this.searchIcon.setAttribute('href', path);
    }

    if(navigation) {
      this.headerIcon?.classList.remove('drawer-header-icon-hide');
      this.drawerElem?.classList.add('drawer-open');
    } else {
      this.headerIcon?.classList.add('drawer-header-icon-hide'); 
      this.drawerElem?.classList.remove('drawer-open');
    }
  }

  listen(type: string, listener: EventListenerOrEventListenerObject) {
    this.node?.addEventListener(type, listener);
  }

  doAction(type: string, data: any) {
    switch(type) {
      case ScrollActionTop:
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        break;
      case ScrollActionTo: 
        window.scrollTo({
          top: data?.top,
          behavior: data?.noSmooth ? 'auto' : 'smooth'
        });                
        break;
    }
  }
}
