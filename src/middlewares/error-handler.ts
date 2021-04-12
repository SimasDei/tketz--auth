import { Request, Response } from 'express';

import { CustomError } from '../errors';

export const errorHandler = (err: Error, _: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: err.message || 'Kaboom! 🧨💥' }],
  });
};
