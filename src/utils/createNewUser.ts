import crypto from 'crypto';
import { User } from './types';

class NewUser {
  id: string;
  name: string;
  age: number;
  hobbies: Array<string>;

  constructor(data: Omit<User, 'id'>) {
    this.name = data.username;
    this.age = data.age;
    this.hobbies = data.hobbies;
    this.id = crypto.randomUUID();
  }
}

export const createNewUser = (data: Omit<User, 'id'>): User => {
  const user = new NewUser(data);
  return user;
};
