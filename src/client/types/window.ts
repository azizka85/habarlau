import { Page, Router } from "@azizka/router";

import i18n from 'roddeh-i18n';

import * as view from '../views/view';

import { BaseLayout } from '../views/layouts/base-layout';

declare global {
  interface Window { 
    router: Router;
    page: Page;
    pages:  {
      [key: string]: view.Page
    };
    layouts: {
      [key: string]: BaseLayout & view.Page
    }; 
    languages: {
      [key: string]: typeof i18n
    };
    tr: typeof i18n;
  }
}
