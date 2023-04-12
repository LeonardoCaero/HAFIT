import { IProduct } from './iproduct';

export interface IUser {
  _id?: {
    $oid: string;
  };
  userId?: number;
  name?: string;
  email?: string;
  type: 'client' | 'admin' | 'soci' | 'treballador';
  products?: IProduct[];
}
