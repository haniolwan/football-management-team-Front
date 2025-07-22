import { env } from '@/config/env';
import { AuthResponse } from '@/types/api';
import Cookies from 'js-cookie';

const isProduction = env.NODE_ENV === 'production';

const config = {
  expires: 7,
  path: '/',
  sameSite: isProduction ? ('strict' as 'strict') : ('lax' as 'lax'),
  ...(window.location.hostname === 'localhost' && { domain: 'localhost' }),
};

const storeCredentials = (
  user: AuthResponse['user'],
  tokens: AuthResponse['tokens'],
) => {
  Cookies.set('accessToken', tokens.access.token, config);
  Cookies.set('accessToken-expires', tokens.access.expires, config);
  Cookies.set('refreshToken', tokens.refresh.token, config);
  Cookies.set('refreshToken-expires', tokens.refresh.expires, config);
  localStorage.setItem('user', JSON.stringify(user));
};

const deleteCredentials = () => {
  Cookies.remove('accessToken');
  Cookies.remove('accessToken-expires');
  Cookies.remove('refreshToken');
  Cookies.remove('refreshToken-expires');
  localStorage.removeItem('user');
};

export { storeCredentials, deleteCredentials };
