import http from 'http';

export const deleteUsers = (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    console.log('delete', req, res);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('deleted'));
  } catch (error) {
    console.log(error);
  }
};
