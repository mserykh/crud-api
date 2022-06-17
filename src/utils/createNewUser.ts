import crypto from 'crypto';
import { User } from './types';

export default class NewUser {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;

  constructor(data: Omit<User, 'id'>) {
    this.username = data.username;
    this.age = data.age;
    this.hobbies = data.hobbies;
    this.id = crypto.randomUUID();
  }
}

export const createNewUser = (data: Omit<User, 'id'>): User => {
  const user = new NewUser(data);
  return user;
};
