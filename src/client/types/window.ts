import { Page, Router } from "@azizka/router";

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
  }
}
