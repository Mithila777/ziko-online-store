export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  brand:string;
  category:string;
  discount?: number | null; // optional discount percentage
  model?:string;
  totalSold?: number;

};