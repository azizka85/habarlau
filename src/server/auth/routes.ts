import express from 'express';

import { Session } from '../../data/session';

import { signOut } from '../helpers/auth-helpers';

import github from './handlers/github';

const router = express.Router();

router.get('/service/:name', (req, res) => {
  switch(req.params.name) {
    case 'github': 
      github.service(req, res);
      break;
  }
});

router.get('/callback/:name', async (req, res) => {
  switch(req.params.name) {
    case 'github': 
      await github.callback(req, res);
      break;
  }
});

router.get('/sign-out', (req, res) => {
  if(req.session) {
    signOut(req.session as Session);
  }

  const redirectUrl = (req.query.redirect || '/') as string;

  res.redirect(redirectUrl);
});

export default router;