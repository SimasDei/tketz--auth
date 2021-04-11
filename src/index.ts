import express, { json } from 'express';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log('listening on port 🐋 3000 🐋');
});
