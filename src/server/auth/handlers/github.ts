import express from 'express';

import fetch from 'node-fetch';

import { Session } from '../../../data/session';
import { User } from '../../../data/user';

import { getQueryParameters } from '../../../helpers';
import { setAccessToken } from '../../helpers/auth-helpers';

const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubUserInfoUrl = 'https://api.github.com/user';

export default {
  service(req: express.Request, res: express.Response) {
    const params = {
      client_id: process.env.GITHUB_CLIENT_ID
    } as any;    

    if(req.query.lang) {
      params.state = req.query.lang;
    }

    res.redirect(`${githubAuthorizeUrl}?${getQueryParameters(params)}`);
  },

  async callback(req: express.Request, res: express.Response) {
    const lang = req.query.state || '';

    const params = new URLSearchParams();

    params.append('client_id', process.env.GITHUB_CLIENT_ID as string);
    params.append('client_secret', process.env.GITHUB_CLIENT_SECRET as string);
    params.append('code', req.query.code as string);

    const response = await fetch(
      githubAccessTokenUrl, {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: params
      }
    );

    const responseData = await response.json() as any;       

    if(responseData.access_token) {
      const userResponse = await fetch(
        githubUserInfoUrl, {
          headers: { Authorization: `token ${responseData.access_token}` }
        }
      );

      const userData = await userResponse.json() as any;

      const data: User = {
        name: userData.name,
        email: userData.email,
        photo: userData.avatar_url,
      };

      if(req.session) {
        setAccessToken(
          req.session as Session,
          'github',
          responseData.access_token,
          responseData.token_type,
          responseData.scope,
          data
        );
      }      

      res.redirect('/' + lang);
    } else {
      res.statusCode = 401;
      res.send(responseData);
    }
  }
};