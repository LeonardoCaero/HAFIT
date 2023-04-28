export interface IProduct {
  _id: {
    $oid: string;
  };
  productId: number;
  name: string;
  price: {
    $numberDecimal: string;
  };
  description: string;
  type: string;
  stock: string;
  image: string;
  quantity: number;
}
