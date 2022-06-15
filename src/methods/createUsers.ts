import http from 'http';

export const createUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    console.log('create');
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('created'));
  } catch (error) {
    console.log(error);
  }
};
