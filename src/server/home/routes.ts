import '../declarations';

import { 
  DEFAULT_LANGUAGE,
  PAGE_ROOT
} from '../../globals';

import express from 'express';

import { getLayoutHandlers, renderPage, stringToArray } from '../helpers/layout-helpers';

import homePage from '../templates/pages/home-page';

import { trimSlashes } from '../../helpers';
import { Langs } from '../helpers/locale-helpers';

import { version } from '../../../package.json';

const router = express.Router({
  mergeParams: true
});

router.get('', (req, res) => {
  try {
    const params = req.params as any;
    const lang = trimSlashes(params[0] || DEFAULT_LANGUAGE) as Langs;

    const rootLink = PAGE_ROOT + (params[0] ? `${lang}/` : '');

    const data: any = {
      time: Date.now()      
    };
  
    if(req.query.ajax && !req.query.init) {
      res.send(data);
    } else {             
      const layouts = !req.query.ajax 
        ? ['main-layout'] 
        : stringToArray(req.query.layouts as string);
  
      const layoutHandlers = getLayoutHandlers(layouts);
  
      res.send(
        renderPage(
          lang,
          rootLink,
          version,
          req,
          'home-page',
          homePage,
          data,
          layoutHandlers
        )
      );
    }
  } finally {
    res.end();
  }
});

export default router;
