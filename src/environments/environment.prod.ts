const BASE_URL = 'https://app/api';

export const environment = {
  production: true,

  WhitelistedDomains: [/app/],
  BlacklistedDomains: [/\/api\/oauth\/token/, /\/api\/public\/user\/register/],

  URL_AUTH: BASE_URL + '/oauth/token',
  URL_USER: BASE_URL + '/public/user',
  URL_TOKEN_REVOKE: BASE_URL + '/token/revoke',
  URL_PERSON: BASE_URL + '/person',
  URL_CHAT: BASE_URL + '/chat'
};
