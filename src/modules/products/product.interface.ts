import { Types } from 'mongoose';

export type TProduct = {
  title: string;
  description: string;
  price: number;
  condition?: 'new' | 'used';
  images: string[];
  userID: Types.ObjectId;
  status?: 'available' | 'sold';

  category?:
    | 'Mobile Phones & Accessories'
    | 'Electronics & Gadgets'
    | 'Clothing & Fashion'
    | 'Home & Garden'
    | 'Sports & Outdoors'
    | 'Books & Magazines'
    | 'Toys & Hobbies'
    | 'Pet Supplies'
    | 'Health & Beauty'
    | 'Other';
};
