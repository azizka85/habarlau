import * as router from '@azizka/router';

import { DEFAULT_LANGUAGE, LANGUAGES, SCROLL_THRESHOLD } from "../../../globals";

import { Page } from '../view';
import { BaseLayout } from "./base-layout";

import { changeLangPath, toggleQueryParameter } from "../../../helpers";
import { mount, navigateHandler, unmount } from '../../helpers';

import { ScrollActionTo, ScrollActionTop, ScrollEventData, ScrollEventType } from '../../types/scroll';

export class MainLayout extends BaseLayout implements Page {
  protected static layout: MainLayout | null = null;    

  protected node: HTMLElement | null = null;

  protected appBarElem: HTMLElement | null = null;
  protected drawerElem: HTMLElement | null = null;  

  protected navIcon: HTMLElement | null = null;
  protected searchIcon: HTMLElement | null = null;

  protected headerIconElem: HTMLElement | null = null;
  protected headerIconBtn: HTMLElement | null = null;

  protected signInUpElem: HTMLElement | null = null;

  protected list: HTMLElement | null = null;
  protected langList: HTMLElement | null = null;

  protected langElem: HTMLElement | null = null;
  protected langImageElem: HTMLImageElement | null = null;

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
        this.headerIconElem = this.headerIconBtn.querySelector('[data-icon="header-navigation-icon"]');

        this.headerIconBtn.addEventListener('click', event => navigateHandler(event, this.headerIconBtn as HTMLElement));
      }

      const drawerAccountBar = this.drawerElem?.querySelector('.drawer-account-bar');

      drawerAccountBar?.addEventListener(
        'mouseenter',
        () => this.drawerElem?.classList.add('drawer-hover')
      );

      this.signInUpElem = drawerAccountBar?.querySelector('[data-content="sign-in-up"]') || null;

      this.signInUpElem?.addEventListener('click', event => navigateHandler(event, this.signInUpElem as HTMLElement));

      const drawerLangBar = this.drawerElem?.querySelector('.drawer-lang-bar');

      drawerLangBar?.addEventListener(
        'mouseenter',
        () => this.drawerElem?.classList.add('drawer-hover')
      );

      const drawerLangCheckbox = drawerLangBar?.querySelector('input[type="checkbox"]') as HTMLInputElement; 

      this.langElem = drawerLangBar?.querySelector('[data-content="lang"]') || null;
      this.langImageElem = drawerLangBar?.querySelector('[data-image="lang"]') || null;

      this.langList = drawerLangBar?.querySelector('[data-list="lang"]') || null;

      if(this.langList) {
        for(const item of this.langList.children) {
          item.addEventListener(
            'click',
            event => {
              navigateHandler(event, item as HTMLElement);

              if(drawerLangCheckbox) {
                drawerLangCheckbox.checked = false;
              }
            }
          );
        }
      }

      this.list = this.drawerElem?.querySelector('[data-list="main"]') || null;

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
        this.searchInput?.blur();
      });

      this.searchForm?.addEventListener('submit', event => {
        event.preventDefault();

        console.log('Form submited:', this.searchInput?.value);          

        this.searchPanel?.classList.remove('search-focus');
        this.searchInput?.blur();
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

  async load(lang: string, page: router.Page, firstLoad: boolean) {    
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
      this.headerIconElem?.classList.remove('drawer-header-icon-hide');
      this.drawerElem?.classList.add('drawer-open');
    } else {
      this.headerIconElem?.classList.add('drawer-header-icon-hide'); 
      this.drawerElem?.classList.remove('drawer-open');
    }

    if(this.signInUpElem) {
      this.signInUpElem.textContent = window.tr('Sign In/Up');
      this.signInUpElem.setAttribute('href', (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`) +  '/sign-in');
    }

    if(this.langElem) {
      this.langElem.textContent = (LANGUAGES as any)[lang]?.label;
    }

    if(this.langImageElem) {
      this.langImageElem.src = (LANGUAGES as any)[lang]?.image;
    }

    if(this.langList) {
      for(const item of this.langList.children) {
        if(item.getAttribute('data-list-item') === `lang-${lang}`) {
          item.classList.add('list-item-activated');
        } else {
          item.classList.remove('list-item-activated');
        }                

        const itemLang = item.getAttribute('data-list-item')?.split('-')[1] || DEFAULT_LANGUAGE;
        const path = changeLangPath(location.pathname, itemLang);

        item.setAttribute(
          'href', 
          `/${path + location.search}`
        );
      }
    }
  }

  listen(type: string, listener: EventListenerOrEventListenerObject) {
    this.node?.addEventListener(type, listener);
  }

  performAction(type: string, data: any) {
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
