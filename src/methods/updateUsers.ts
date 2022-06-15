import http from 'http';

export const updateUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    console.log('update');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('updated'));
  } catch (error) {
    console.log(error);
  }
};
