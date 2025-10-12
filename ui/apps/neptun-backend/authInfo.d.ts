import { User } from '@neptun/data-model';
declare global {
  declare namespace Express {
    export interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}
