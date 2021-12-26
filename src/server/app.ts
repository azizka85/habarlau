import dotenv from 'dotenv';

import express from "express";
import cookieSession from 'cookie-session';

import { localeRoute } from "../helpers";

import homeRoutes from './home/routes';

import signInRoutes from './sign-in/routes';
import signUpRoutes from './sign-up/routes';

import authRoutes from './auth/routes';

dotenv.config();

export const app = express();
export const port = parseInt(process.env.PORT || '3000');

app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: ['oauthApp', 'accessToken', 'tokenType', 'scope', 'user']
}));

app.use(`/?${localeRoute}/`, homeRoutes);

app.use(`/?${localeRoute}/sign-in`, signInRoutes);
app.use(`/?${localeRoute}/sign-up`, signUpRoutes);

app.use('/auth', authRoutes);
