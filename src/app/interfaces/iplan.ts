export interface IPlan {
    _id: {
        $oid: string,
      },
      name: string,
      planId: BigInteger,
      description: string,
      featuredImage: string
}
