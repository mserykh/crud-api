import { UrlArgs as EndpointArgs } from './types';

export const parseRoute = (url: string): EndpointArgs => {
  let urlToTest = url;

  const hasApiArg = urlToTest.startsWith('/api/') || url.startsWith('/api');
  if (hasApiArg) {
    urlToTest = urlToTest.slice(4, urlToTest.length);
  } else {
    return ['', '', ''];
  }

  const hasUsersArg = urlToTest.startsWith('/users/') || urlToTest.startsWith('/users');
  if (hasUsersArg) {
    urlToTest = urlToTest.slice(6, urlToTest.length);
  } else {
    return ['api', '', ''];
  }

  const userId = urlToTest.slice(1, urlToTest.length).replace('/', '');

  return ['api', 'users', userId];
  // const regex =
  //   /^\/(?<api>api)\/(?<users>users)\/?(?<userIdRaw>(.+)\/?)?$/;
  // const matches = url.match(regex);
  // const { api, users, userIdRaw } = matches?.groups
  //   ? matches.groups
  //   : { api: '', users: '', userIdRaw: '' };
  // const userId = userIdRaw ? userIdRaw.replace('/', '') : '';
};
