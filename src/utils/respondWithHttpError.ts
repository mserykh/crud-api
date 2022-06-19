import http from 'http';

export const respondWithHttpError = (
  res: http.ServerResponse,
  statusCode: number,
  message: string,
): number => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
  return statusCode;
};
