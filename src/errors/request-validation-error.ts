import { ValidationError } from 'express-validator';

export class RequestValidatonError extends Error {
  constructor(public errors: Array<ValidationError>) {
    super();

    Object.setPrototypeOf(this, RequestValidatonError.prototype);
  }
}
