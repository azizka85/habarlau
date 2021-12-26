import express from 'express';

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

export default router;