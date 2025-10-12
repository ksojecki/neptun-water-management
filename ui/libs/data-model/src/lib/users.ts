import { ApiError } from './error';

export type User = {
  username: string;
  password: string;
  email: string;
  forceChangePassword: boolean;
}

export type AuthCredentials = Pick<User, 'username' | 'password'>;
export type UserInfo = Omit<User, 'password'>

export type SuccessAuthenticationResponse = {
  type: 'success';
  user: UserInfo;
  token: string;
}

export type AuthenticationResponse = SuccessAuthenticationResponse | ApiError;
