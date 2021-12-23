import * as router from '@azizka/router';

import Modal from 'bootstrap/js/dist/modal';

import { Component, Page } from "../view";

export class AuthServiceComponent implements Component {
  protected titleElem: HTMLElement | null = null;

  protected googleBtn: HTMLElement | null = null;

  protected dialog: Modal | null = null;
  protected dialogTitle: HTMLElement | null = null;
  protected dialogContent: HTMLIFrameElement | null = null;

  protected googleBtnClickHandler: (event: MouseEvent) => void;

  constructor() {
    this.googleBtnClickHandler = event => {
      event.preventDefault();

      this.dialog?.show();      

      if(this.dialogTitle) {
        this.dialogTitle.textContent = `Google - ${window.tr('Auth service')}`;
      }

      if(this.dialogContent) {
        this.dialogContent.src = this.googleBtn?.getAttribute('href') || '';
      }
    };
  }

  async init(page: Page, firstTime: boolean): Promise<void> {
    this.titleElem = page.elem?.querySelector('[data-title="auth-service"]') || null;

    this.googleBtn = page.elem?.querySelector('[data-button="auth-service-google"]') || null;

    const dialogElem = page.elem?.querySelector('.modal');

    if(dialogElem) {
      this.dialog = new Modal(dialogElem);
      this.dialogTitle = dialogElem.querySelector('.modal-title');
      this.dialogContent = dialogElem.querySelector('.modal-body');
    }
  }

  async mount() {
    this.googleBtn?.addEventListener('click', this.googleBtnClickHandler);
  }

  async unmount() {
    this.googleBtn?.removeEventListener('click', this.googleBtnClickHandler);
  }

  async load(lang: string, page: router.Page, firstLoad: boolean): Promise<void> {
    if(this.titleElem) {
      this.titleElem.textContent = window.tr('Or use the service');
    }
  }
}
