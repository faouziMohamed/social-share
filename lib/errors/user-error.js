import AppError from './sc-error-base';

export default class UserError extends AppError {
  constructor({
    message = 'Post has errors',
    code = 500 || '500',
    hint = '',
  } = {}) {
    super({ message, hint, code });
  }
}
