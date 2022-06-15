import http from 'http';

export const throwHttpError = (
  res: http.ServerResponse,
  statusCode: number,
  message: string,
): void => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};
