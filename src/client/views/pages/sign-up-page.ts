import * as router from '@azizka/router';

import { Page } from '../view';

import { loadContent, mount, navigateHandler, unmount } from '../../helpers';

import { AuthServiceComponent } from '../components/auth-service-component';

import { DEFAULT_LANGUAGE } from '../../../globals';

export class SignUpPage implements Page {
  protected static page: SignUpPage | null = null;

  protected node: HTMLElement | null = null;

  protected titleElem: HTMLElement | null = null;

  protected nameLabelElem: HTMLElement | null = null;
  protected passwordLabelElem: HTMLElement | null = null;

  protected signInBtn: HTMLElement | null = null;
  protected signUpBtn: HTMLElement | null = null;
  protected cancelBtn: HTMLElement | null = null;

  protected authService: AuthServiceComponent | null = null;

  static get instance(): SignUpPage {
    if(!SignUpPage.page) {
      SignUpPage.page = new SignUpPage();
    }

    return SignUpPage.page;
  }

  get elem(): HTMLElement | null {
    return this.node;
  }

  async init(parent: HTMLElement | null, firstTime: boolean) {
    let content = await loadContent(parent, firstTime, []);

    this.node = content.querySelector('[data-page="signup-page"]') || null;

    const form = this.node?.querySelector('.main-card form');

    form?.addEventListener('submit', event => {
      event.preventDefault();

      const data = new FormData(form as HTMLFormElement);

      console.log('Form submited: ');          

      for(let item of data.entries()) {
        console.log(item[0] + ':', item[1]);          
      }
    });

    this.titleElem = this.node?.querySelector('[data-title="main"]') || null;

    this.nameLabelElem = form?.querySelector('#name-label') || null;
    this.passwordLabelElem = form?.querySelector('#password-label') || null;

    this.signInBtn = form?.querySelector('[data-button="sign-in"]') || null;
    this.signInBtn?.addEventListener('click', event => navigateHandler(event, this.signInBtn as HTMLElement));

    this.signUpBtn = form?.querySelector('[data-button="sign-up"]') || null;

    this.cancelBtn = form?.querySelector('[data-button="cancel"]') || null;
    this.cancelBtn?.addEventListener('click', event => navigateHandler(event, this.cancelBtn as HTMLElement));

    this.authService = new AuthServiceComponent();
    await this.authService.init(this, firstTime);

    return content;
  }

  async mount() {
    await mount(this.node);
  }

  async unmount() {
    await unmount(this.node);
  }

  async load?(lang: string , page: router.Page, firstLoad: boolean): Promise<void> {
    if(this.titleElem) {
      this.titleElem.textContent = window.tr('Sign Up');
    }

    if(this.nameLabelElem) {
      this.nameLabelElem.textContent = window.tr('Name');
    }

    if(this.passwordLabelElem) {
      this.passwordLabelElem.textContent = window.tr('Password');
    }

    if(this.signInBtn) {
      this.signInBtn.textContent = window.tr('Sign In');
    }

    if(this.signUpBtn) {
      this.signUpBtn.textContent = window.tr('Sign Up');
    }

    if(this.cancelBtn) {
      this.cancelBtn.textContent = window.tr('Cancel');
    }

    this.signInBtn?.setAttribute('href', (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`) + '/sign-in');
    this.cancelBtn?.setAttribute('href', (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`) + '/');

    await this.authService?.load?.(lang, page, firstLoad);
  }
}
