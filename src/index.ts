import express, { json } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

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

const init = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to db 🦀🦀');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 🐋 3000 🐋');
  });
};

init();
