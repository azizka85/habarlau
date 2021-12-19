import '../../types/window';

import * as router from '@azizka/router';

import { Page } from "../view";

import { loadContent, mount, mountClientNavigation, unmount } from '../../helpers';

import { ScrollActionTo, ScrollActionTop, ScrollEventData, ScrollEventType } from '../../types/scroll';

export class HomePage implements Page {
  protected static page: HomePage | null = null;

  protected node: HTMLElement | null = null;

  protected scrollTopBtn: HTMLElement | null = null;

  protected currScroll = 0;

  static get instance(): HomePage {
    if(!HomePage.page) {
      HomePage.page = new HomePage();
    }

    return HomePage.page;
  }

  get elem(): HTMLElement | null {
    return this.node;
  }

  async init(parent: HTMLElement | null, firstTime: boolean) {
    let content = await loadContent(parent, firstTime, ['main-layout']);    

    this.node = content.querySelector('[data-page="home-page"]') || null;

    mountClientNavigation(this.node);

    this.scrollTopBtn = this.node?.querySelector('[data-button="scroll-top"]') || null;

    this.scrollTopBtn?.addEventListener('click', () => {
      window.layouts['main-layout']?.performAction?.(ScrollActionTop, null);
    });
    
    return content;
  }

  async mount() {
    await mount(this.node);
  }

  async unmount() {
    await unmount(this.node);
  }

  async load(lang: string, page: router.Page, firstLoad: boolean) {
    if(firstLoad) {
      window.layouts['main-layout']?.listen?.(ScrollEventType, (event) => {
        const data = (event as CustomEvent<ScrollEventData>).detail;

        if(data.currScroll <= 0) {
          this.scrollTopBtn?.classList.add('btn-exited');
        } else {
          this.scrollTopBtn?.classList.remove('btn-exited');
        }

        this.currScroll = data.currScroll;
      });
    }

    window.layouts['main-layout']?.performAction?.(ScrollActionTo, {
      top: this.currScroll,
      noSmooth: true
    });
  }
}
