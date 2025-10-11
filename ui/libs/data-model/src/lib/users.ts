export type User = {
  username: string;
  password: string;
  email: string;
  forceChangePassword: boolean;
}

export type AuthCredentials = Pick<User, 'username' | 'password'>;
