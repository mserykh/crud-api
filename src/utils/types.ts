export interface User {
  id: string;
  name: string;
  age: number;
  hobbies: Array<string>;
};

export interface Db {
  users: Array<User>;
};

export type UrlArgs = Array<string>;

export type HttpError = {
  statusCode: number;
  message: string;
};
