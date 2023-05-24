import { IProduct } from './iproduct';

export interface IUser {
  _id?: {
    $oid: string;
  };
  biography?: string;
  // userImage?: string;
  userId?: number;
  name?: string;
  email?: string;
  type: 'client' | 'admin' | 'soci' | 'treballador';
  products?: (IProduct & { quantity: number })[];
  auth_token?: string;
}
  