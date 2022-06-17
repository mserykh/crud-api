import { UrlArgs as EndpointArgs } from './types';

export const parseRoute = (url: string): EndpointArgs => {
  const regex =
    /^\/(?<api>api)\/(?<users>users)\/?(?<userIdRaw>([a-fA-f0-9]{8})(-([a-fA-f0-9]{4})){3}-([a-fA-f0-9]{12})\/?)?$/;
  const matches = url.match(regex);
  const { api, users, userIdRaw } = matches?.groups
    ? matches.groups
    : { api: '', users: '', userIdRaw: '' };
  const userId = userIdRaw ? userIdRaw.replace('/', '') : '';

  return [api, users, userId];
};
