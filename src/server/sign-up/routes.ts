import '../declarations';

import express from "express";

import defaultLayout from '../templates/layouts/default-layout';
import signUpPage from '../templates/pages/sign-up-page';

import { version } from '../../../package.json';

const router = express.Router();

router.get('', (req, res) => {
  try {
    res.send(
      defaultLayout({
        data: {
          version,
          content: 'sign-up-page',
          contentData: {
            time: Date.now()
          }
        }
      }, {
        partials: {
          'sign-up-page': signUpPage
        }
      })
    );
  } finally {
    res.end();
  }
});

export default router;
