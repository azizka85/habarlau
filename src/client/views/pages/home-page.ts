import { toCamel } from '../../../utils/formatter';

export class HomePage {
  protected static page: HomePage;

  static get instance() {
    if(!HomePage.page) {
      HomePage.page = new HomePage();
    }

    return HomePage.page;
  }

  load(pageName: string) {
    console.log(HomePage.name, 'loaded', pageName, toCamel(pageName));         
  }
}
