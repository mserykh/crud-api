import { v4 as uuidv4 } from 'uuid';
import User from './types';

class NewUser {
  id: string;
  name: string;
  age: number;
  hobbies: Array<string>;

  constructor(data: Omit<User, 'id'>) {
    this.name = data.name;
    this.age = data.age;
    this.hobbies = data.hobbies;
    this.id = uuidv4();
  }
}
export const createNewUser = (data: Omit<User, 'id'>): User => {
  const user = new NewUser(data);
  return user;
};
