import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
  reason = 'Database go boom 🧨`🔥💥';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
