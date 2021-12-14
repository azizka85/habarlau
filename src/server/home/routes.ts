import '../declarations';

import { 
  PAGE_ROOT
} from '../../globals';

import express from 'express';

import { getLayoutHandlers, renderPage, stringToArray } from '../helpers/layout-helpers';

import homePage from '../templates/pages/home-page';

import { version } from '../../../package.json';

const router = express.Router();

router.get('', (req, res) => {
  try {
    let data: any = {
      time: Date.now(),
      PAGE_ROOT
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
