export default class AppError extends Error {
  constructor({
    message = 'An error occured',
    code = 500 || '500',
    hint = '',
  } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = code;
    this.hint = hint;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      hint: this.hint,
    };
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }

  toResponse() {
    return {
      error: this.message,
      hint: this.hint,
      statusCode: this.statusCode,
    };
  }

  toObject() {
    return this.toJSON();
  }
}
