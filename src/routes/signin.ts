import express, { Request, Response } from 'express';
import { validateRequest, BadRequestError } from '@tketz/common';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { PasswordManager } from '../services';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be present'),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const exisingUser = await User.findOne({ email });

    if (!exisingUser) {
      throw new BadRequestError('Invalid information provided');
    }

    const isMatch = await PasswordManager.compare(exisingUser.password, password);

    if (!isMatch) {
      throw new BadRequestError('Invalid information provided');
    }

    const userJwt = jwt.sign(
      {
        id: exisingUser.id,
        email: exisingUser.email,
      },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };

    res.status(200).send(exisingUser);
  }
);

export { router as signinRouter };
