import * as router from '@azizka/router';

import { Component, Page } from "../view";

import { DEFAULT_LANGUAGE } from '../../../globals';

export class AuthServiceComponent implements Component {
  protected titleElem: HTMLElement | null = null;

  protected googleBtn: HTMLElement | null = null;

  async init(page: Page, firstTime: boolean): Promise<void> {
    this.titleElem = page.elem?.querySelector('[data-title="auth-service"]') || null;

    this.googleBtn = page.elem?.querySelector('[data-button="auth-service-google"]') || null;
  }

  async load(lang: string, page: router.Page, firstLoad: boolean): Promise<void> {
    if(this.titleElem) {
      this.titleElem.textContent = window.tr('Or use the service');
    }

    if(this.googleBtn) {
      const langQuery = lang === DEFAULT_LANGUAGE ? '' : `?lang=${lang}`;

      this.googleBtn.setAttribute('href', `/auth/service/github${langQuery}`);
    }
  }
}
