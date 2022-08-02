import http from 'http';

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
