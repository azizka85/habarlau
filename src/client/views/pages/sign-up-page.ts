import { toCamel } from '../../../utils/formatter';

export class SignUpPage {
  protected static page: SignUpPage;

  static get instance() {
    if(!SignUpPage.page) {
      SignUpPage.page = new SignUpPage();
    }

    return SignUpPage.page;
  }

  load(pageName: string) {
    console.log(SignUpPage.name, 'loaded', pageName, toCamel(pageName));     
  }
}
