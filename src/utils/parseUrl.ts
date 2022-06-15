import { UrlArgs } from './types';

export const parseUrl = (path: string): UrlArgs | undefined => {
  try {
    const [arg1, arg2, userId] = path.substring(1).split('/');
    return [arg1, arg2, userId];
  } catch (error) {
    console.log(error);
  }
};
