import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

export const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true, min: 0 },
    condition: { type: String, required: true, enum: ['New', 'Used'] },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    userID: { type: String, required: true },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);
