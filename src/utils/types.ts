export default interface User {
  id: string;
  name: string;
  age: number;
  hobbies: Array<string>;
}

export type UrlArgs = Array<string>;

export type HttpError = {
  statusCode: number;
  message: string;
};
