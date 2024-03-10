export type ProductT = {
  product: string;
  brand: string | null;
  id: string;
  price: number;
};

export type PageT = {
  [key: number]: string[];
};
