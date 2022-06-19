import http from 'http';
import { User } from './types';

export const getData = async (req: http.IncomingMessage): Promise<string> => {
  return new Promise(async (resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(body);
    });
  });
};
