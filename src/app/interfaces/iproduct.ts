export interface IProduct {
  _id: {
    $oid: string;
  };
  name: string;
  price: {
    $numberDecimal: string;
  };
  description: string;
  type: string;
  stock: string;
  image: string;
}
