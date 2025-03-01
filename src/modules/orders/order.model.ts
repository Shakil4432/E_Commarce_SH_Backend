import { model, Schema } from 'mongoose';

import { TOrders, TProductOrder } from './order.interface';

const OrderItemSchema = new Schema<TProductOrder>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<TOrders>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [OrderItemSchema],
    totalPrice: { type: Number, default: 0 },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'paid', 'completed', 'cancelld'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Order = model<TOrders>('Order', OrderSchema);
