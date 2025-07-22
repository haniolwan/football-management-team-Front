import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';
import { AuthResponse } from '@/types/api';

import { api } from './api-client';
import Cookies from 'js-cookie';
import { storeCredentials } from './storeCredentials';

const getUser = async () => {
  const token = Cookies.get('accessToken');

  if (!token) {
    return {};
  }
  const response = await api.post('/auth/me', {
    refreshToken: token,
  });

  const { message }: any = response;

  if (message === 'Token Not Found') {
    const { user, tokens }: AuthResponse = await api.post(
      '/auth/refresh-tokens',
      {
        refreshToken: Cookies.get('refreshToken'),
      },
    );
    storeCredentials(user, tokens);

    return user;
  } else {
    return response.user;
  }
};
const logout = (): Promise<void> => {
  return api.post('/auth/logout', {
    refreshToken: Cookies.get('refreshToken'),
  });
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required'),
  password: z.string().min(5, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,

  loginFn: async (data: LoginInput) => {
    const { user, tokens } = await loginWithEmailAndPassword(data);
    storeCredentials(user, tokens);
    return user;
  },
  registerFn: async (data: RegisterInput) => {
    const { user, tokens } = await registerWithEmailAndPassword(data);
    storeCredentials(user, tokens);
    return user;
  },
  logoutFn: async () => {
    await logout();
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  },
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data } = useUser();
  const location = useLocation();

  if (!data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
