import '../declarations';

import express from 'express';

import { 
  PAGE_ROOT
} from '../../globals';

import { renderPage } from '../helpers/layout-helpers';

import { version } from '../../../package.json';

import signInPage from '../templates/pages/sign-in-page';

import authServiceComponent from '../templates/components/auth-service-component';

const router = express.Router();

router.get('', (req, res) => {
  try {
    const data: any = {
      time: Date.now(),
      PAGE_ROOT
    };
  
    if(req.query.ajax && !req.query.init) {
      res.send(data);
    } else {          


      res.send(
        renderPage(
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
