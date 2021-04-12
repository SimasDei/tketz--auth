import { ValidationError } from 'express-validator';

import { CustomError } from './custom-error';

export class RequestValidatonError extends CustomError {
  statusCode = 400;
  constructor(public errors: Array<ValidationError>) {
    super('Nein 😡');

    Object.setPrototypeOf(this, RequestValidatonError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      field: error.param,
      message: error.msg,
    }));
  }
}
