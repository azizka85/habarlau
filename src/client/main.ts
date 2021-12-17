import './types/window';

import { DEFAULT_LANGUAGE, PAGE_ROOT } from '../globals';

import { Router } from '@azizka/router';

import { LoaderPage } from './views/pages/loader-page';

import { loadPage } from './loader';
import { localeRoute, trimSlashes } from '../helpers';

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let firstTime = true;    

    LoaderPage.instance.init(null, firstTime);
  
    const router = new Router({
      root: PAGE_ROOT,
      routes: [{
        rule: `${localeRoute}/?`,
        async handler(page) {
          await loadPage(
            trimSlashes(page.match[0] || DEFAULT_LANGUAGE),
            page, 'home-page', 
            ['main-layout'],
            firstTime
          );
        },
        options: {}
      }, {
        rule: `${localeRoute}/?sign-in`,
        async handler(page) {
          await loadPage(
            trimSlashes(page.match[0] || DEFAULT_LANGUAGE),
            page, 
            'sign-in-page', 
            [], 
            firstTime
          );
        },
        options: {}
      }, {
        rule: `${localeRoute}/?sign-up`,
        async handler(page) {
          await loadPage(
            trimSlashes(page.match[0] || DEFAULT_LANGUAGE),
            page, 
            'sign-up-page', 
            [], 
            firstTime
          );
        }, 
        options: {}
      }]
    });
    
    window.pages = {};
    window.layouts = {};
    window.languages = {};
    window.router = router;
    
    router.addUriListener();
    
    router
      .processUri()
      .catch(
        reason => console.error(reason)      
      )
      .finally(() => firstTime = false);
  }, 500);  
});
