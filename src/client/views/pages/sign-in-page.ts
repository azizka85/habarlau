import * as router from '@azizka/router';

import { Page } from '../view';

import { loadContent, mount, navigateHandler, unmount } from '../../helpers';

import { AuthServiceComponent } from '../components/auth-service-component';

import { DEFAULT_LANGUAGE } from '../../../globals';

export class SignInPage implements Page {
  protected static page: SignInPage | null = null;

  protected node: HTMLElement | null = null;

  protected titleElem: HTMLElement | null = null;

  protected passwordLabelElem: HTMLElement | null = null;

  protected signUpBtn: HTMLElement | null = null;
  protected signInBtn: HTMLElement | null = null;
  protected cancelBtn: HTMLElement | null = null;

  protected authService: AuthServiceComponent | null = null;

  protected signUpBtnClickHandler: (event: MouseEvent) => void;
  protected cancelBtnClickHandler: (event: MouseEvent) => void;

  protected formSubmitHandler: (event: SubmitEvent) => void;

  static get instance(): SignInPage {
    if(!SignInPage.page) {
      SignInPage.page = new SignInPage();
    }

    return SignInPage.page;
  }

  constructor() {
    this.formSubmitHandler = event => {
      event.preventDefault();

      const form = this.node?.querySelector('.main-card form') as HTMLFormElement;
      const data = new FormData(form as HTMLFormElement);

      console.log('Form submited: ');          

      for(let item of data.entries()) {
        console.log(item[0] + ':', item[1]);          
      }
    };

    this.signUpBtnClickHandler = event => navigateHandler(event, this.signUpBtn as HTMLElement);
    this.cancelBtnClickHandler = event => navigateHandler(event, this.cancelBtn as HTMLElement);
  }

  get elem(): HTMLElement | null {
    return this.node;
  }

  async init(parent: HTMLElement | null, firstTime: boolean) {
    let content = await loadContent(parent, firstTime, []);    

    this.node = content.querySelector('[data-page="signin-page"]') || null;    

    const form = this.node?.querySelector('.main-card form') as HTMLFormElement;

    this.titleElem = this.node?.querySelector('[data-title="main"]') || null;

    this.passwordLabelElem = form?.querySelector('#password-label') || null;

    this.signUpBtn = form?.querySelector('[data-button="sign-up"]') || null;
    this.signInBtn = form?.querySelector('[data-button="sign-in"]') || null;
    this.cancelBtn = form?.querySelector('[data-button="cancel"]') || null;    

    this.authService = new AuthServiceComponent();
    await this.authService.init(this, firstTime);
    
    return content;
  }

  async mount() {
    const form = this.node?.querySelector('.main-card form') as HTMLFormElement;

    form?.addEventListener('submit', this.formSubmitHandler);
    this.signUpBtn?.addEventListener('click', this.signUpBtnClickHandler);
    this.cancelBtn?.addEventListener('click', this.cancelBtnClickHandler);

    await mount(this.node);
  }

  async unmount() {
    const form = this.node?.querySelector('.main-card form') as HTMLFormElement;

    form?.removeEventListener('submit', this.formSubmitHandler);
    this.signUpBtn?.removeEventListener('click', this.signUpBtnClickHandler);
    this.cancelBtn?.removeEventListener('click', this.cancelBtnClickHandler);

    await unmount(this.node);
  }

  async load(lang: string , page: router.Page, firstLoad: boolean): Promise<void> {
    if(this.titleElem) {
      this.titleElem.textContent = window.tr('Sign In');
    }

    if(this.passwordLabelElem) {
      this.passwordLabelElem.textContent = window.tr('Password');
    }

    if(this.signUpBtn) {
      this.signUpBtn.textContent = window.tr('Sign Up');
    }

    if(this.signInBtn) {
      this.signInBtn.textContent = window.tr('Sign In');
    }

    if(this.cancelBtn) {
      this.cancelBtn.textContent = window.tr('Cancel');
    }

    this.signUpBtn?.setAttribute('href', (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`) + '/sign-up');
    this.cancelBtn?.setAttribute('href', (lang === DEFAULT_LANGUAGE ? '' : `/${lang}`) + '/');

    await this.authService?.load?.(lang, page, firstLoad);
  }
}
