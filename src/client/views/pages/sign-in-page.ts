import { toCamel } from '../../../utils/formatter';

export class SignInPage {
  protected static page: SignInPage;

  static get instance() {
    if(!SignInPage.page) {
      SignInPage.page = new SignInPage();
    }

    return SignInPage.page;
  }

  load(pageName: string) {
    console.log(SignInPage.name, 'loaded', pageName, toCamel(pageName));       
  }
}
