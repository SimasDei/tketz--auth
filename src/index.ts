import express, { json } from 'express';
import 'express-async-errors';

import { errorHandler } from './middlewares';
import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';
import { NotFoundError } from './errors';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening on port 🐋 3000 🐋');
});
