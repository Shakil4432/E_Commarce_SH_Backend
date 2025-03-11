import { Types } from 'mongoose';

export type TProductOrder = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TOrders = {
  userId: Types.ObjectId;
  products: TProductOrder[];
  totalPrice: number;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  status?: 'pending' | 'shipped' | 'paid' | 'completed' | 'cancelled';
};
