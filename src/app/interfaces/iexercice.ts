export interface Iexercice {
    _id: {
        $oid: string;
      };
      name: string;
      exerciceId: BigInteger;
      description: string;
      time: BigInteger;
}
