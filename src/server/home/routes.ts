import '../declarations';

import express from "express";

import defaultLayout from '../templates/layouts/default-layout';
import homePage from '../templates/pages/home-page';

import { version } from '../../../package.json';

const router = express.Router();

router.get('', (req, res) => {
  try {
    res.send(
      defaultLayout({
        data: {
          version,
          content: 'home-page',
          contentData: {
            time: Date.now()
          }
        }
      }, {
        partials: {
          'home-page': homePage
        }
      })
    );
  } finally {
    res.end();
  }
});

export default router;
