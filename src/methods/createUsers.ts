import http from 'http';

export const createUsers = (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    console.log('create', req, res);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('created'));
  } catch (error) {
    console.log(error);
  }
};
