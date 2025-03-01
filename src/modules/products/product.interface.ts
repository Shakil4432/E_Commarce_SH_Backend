export type TProduct = {
  title: string;
  description: string;
  price: number;
  condition: 'New' | 'Used';
  category: string;
  images: string[];
  userID: string;
};
