import { IUser } from "./iuser";

export interface Iexercice {
    _id: {
        $oid: string;
      };
      name: string;
      exerciceId: BigInteger;
      description: string;
      time: BigInteger;
      featuredImg: string,
      user?: IUser,
      view: Number
}
