import '../declarations';

import express from 'express';

import Handlebars from 'handlebars';

import { 
  PAGE_ROOT
} from '../../globals';

import { renderPage } from '../helpers/layout-helpers';

import { version } from '../../../package.json';

import signUpPage from '../templates/pages/sign-up-page';

import authServiceComponent from '../templates/components/auth-service-component';

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
      res.send(
        renderPage(
          version,
          req,
          'sign-up-page',
          signUpPage, 
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
