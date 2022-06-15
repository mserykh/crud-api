import http from 'http';

export const deleteUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    console.log('delete');
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('deleted'));
  } catch (error) {
    console.log(error);
  }
};
