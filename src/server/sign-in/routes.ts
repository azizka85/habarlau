import '../declarations';

import express from 'express';

import { 
  DEFAULT_LANGUAGE,
  PAGE_ROOT
} from '../../globals';

import { renderPage } from '../helpers/layout-helpers';

import { version } from '../../../package.json';

import signInPage from '../templates/pages/sign-in-page';

import { trimSlashes } from '../../helpers';
import { Langs } from '../helpers/locale-helpers';

import authServiceComponent from '../templates/components/auth-service-component';

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


      res.send(
        renderPage(
          lang,
          rootLink,
          version,
          req,
          'sign-in-page',
          signInPage, 
          data,
          undefined, {
            'auth-service-component': authServiceComponent
          }
        )
      );
    }
  } finally {
    res.end();
  }
});

export default router;
