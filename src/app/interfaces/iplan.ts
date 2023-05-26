import { IUser } from "./iuser"

export interface IPlan {
    _id: {
        $oid: string,
      },
      name: string,
      planId: BigInteger,
      description: string,
      featuredImg: string,
      user?: IUser,
      view: Number
}
