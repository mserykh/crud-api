import http from 'http';

export const respondWithHttpError = (
  res: http.ServerResponse,
  statusCode: number,
  message: string,
): void => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};
