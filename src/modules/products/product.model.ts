import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

export const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    condition: {
      type: String,
      required: true,
      enum: ['new', 'used'],
      default: 'used',
    },
    images: { type: [String], required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      required: true,
      enum: ['available', 'sold'],
      default: 'available',
    },

    category: {
      type: String,
      required: true,
      enum: [
        'Mobile Phones & Accessories',
        'Electronics & Gadgets',
        'Clothing & Fashion',
        'Home & Garden',
        'Sports & Outdoors',
        'Books & Magazines',
        'Toys & Hobbies',
        'Pet Supplies',
        'Health & Beauty',
        'Other',
      ],
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);
