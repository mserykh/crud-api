export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export interface Db {
  users: Array<User>;
}

export type UrlArgs = Array<string>;

export type HttpError = {
  statusCode: number;
  message: string;
};

export type EndpointResult<TPayload> = {
  statusCode: number;
  payload?: TPayload;
};

export class ValidationError extends Error {
  statusCode = 400;
  constructor(statusCode: number, message: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
