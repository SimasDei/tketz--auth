import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler } from '@tketz/common';
import cookieSession from 'cookie-session';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
