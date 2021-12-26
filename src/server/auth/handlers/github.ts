import express from 'express';

import fetch from 'node-fetch';

import { getQueryParameters } from '../../../helpers';

const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubUserInfoUrl = 'https://api.github.com/user';

export default {
  service(req: express.Request, res: express.Response) {
    const params = {
      client_id: process.env.GITHUB_CLIENT_ID
    } as any;    

    res.redirect(`${githubAuthorizeUrl}?${getQueryParameters(params)}`);
  },

  async callback(req: express.Request, res: express.Response) {
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

      const data = {
        name: userData.name,
        email: userData.email,
        photo: userData.avatar_url,
      };

      if(req.session) {
        req.session.oauthApp = 'github';
        req.session.accessToken = responseData.access_token;
        req.session.tokenType = responseData.token_type;
        req.session.scope = responseData.scope;
        req.session.user = data;
      }      

      res.redirect('/');
    } else {
      res.statusCode = 401;
      res.send(responseData);
    }
  }
};