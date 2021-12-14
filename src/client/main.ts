import './types/window';

import { PAGE_ROOT } from '../globals';

import { Router } from '@azizka/router';

import { LoaderPage } from './views/pages/loader-page';

import { loadPage } from './loader';

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let firstTime = true;    

    LoaderPage.instance.init(null, firstTime);
  
    const router = new Router({
      root: PAGE_ROOT,
      routes: [{
        rule: '',
        async handler(page) {
          await loadPage(
            page, 'home-page', 
            ['main-layout'],
            firstTime
          );
        },
        options: {}
      }, {
        rule: '/sign-in',
        async handler(page) {
          await loadPage(
            page, 
            'sign-in-page', 
            [], 
            firstTime
          );
        },
        options: {}
      }, {
        rule: '/sign-up',
        async handler(page) {
          await loadPage(
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
