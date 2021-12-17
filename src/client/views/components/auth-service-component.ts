import * as router from '@azizka/router';

import { Component, Page } from "../view";

export class AuthServiceComponent implements Component {
  protected titleElem: HTMLElement | null = null;

  async init(page: Page, firstTime: boolean): Promise<void> {
    this.titleElem = page.elem?.querySelector('[data-title="auth-service"]') || null;
  }

  async load?(lang: string, page: router.Page, firstLoad: boolean): Promise<void> {
    if(this.titleElem) {
      this.titleElem.textContent = window.tr('Or use the service');
    }
  }
}
