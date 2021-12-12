import express from "express";

import homeRoutes from './home/routes';

import signInRoutes from './sign-in/routes';
import signUpRoutes from './sign-up/routes';

export const app = express();
export const port = parseInt(process.env.PORT || '3000');

app.use(express.static('public'));

app.use('/', homeRoutes);

app.use('/sign-in', signInRoutes);
app.use('/sign-up', signUpRoutes);
