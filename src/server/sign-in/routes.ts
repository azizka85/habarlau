import '../declarations';

import express from "express";

import defaultLayout from '../templates/layouts/default-layout';
import signInPage from '../templates/pages/sign-in-page';

import { version } from '../../../package.json';

const router = express.Router();

router.get('', (req, res) => {
  try {
    res.send(
      defaultLayout({
        data: {
          version,
          content: 'sign-in-page',
          contentData: {
            time: Date.now()
          }
        }
      }, {
        partials: {
          'sign-in-page': signInPage
        }
      })
    );
  } finally {
    res.end();
  }
});

export default router;
