import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares';
import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';
import { NotFoundError } from './errors';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
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
