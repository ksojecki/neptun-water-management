import crypto from 'crypto';

export type User = {
  username: string;
  password: string;
  email: string;
  forceChangePassword: boolean;
}

export type AuthCredentials = Pick<User, 'username' | 'password'>;

export function hashPassword(data: AuthCredentials): AuthCredentials {
  return {
    username: data.username,
    password: crypto.createHash('md5')
      .update(data.password)
      .digest('hex')
  }
}
