import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { DatabaseConnectionError, RequestValidatonError } from '../errors';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidatonError(errors.array());
    }
    const { email, password } = req.body;

    console.log('Creating a user with email', email);
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };