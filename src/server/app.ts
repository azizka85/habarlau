import express from "express";

import { localeRoute } from "../helpers";

import homeRoutes from './home/routes';

import signInRoutes from './sign-in/routes';
import signUpRoutes from './sign-up/routes';

export const app = express();
export const port = parseInt(process.env.PORT || '3000');

app.use(express.static('public'));

app.use(`/?${localeRoute}/`, homeRoutes);

app.use(`/?${localeRoute}/sign-in`, signInRoutes);
app.use(`/?${localeRoute}/sign-up`, signUpRoutes);
