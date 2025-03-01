import { Types } from 'mongoose';
import { z } from 'zod';

const OrderSchema = z.object({
  productId: z.string().refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid productId format',
  }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const OrderValidationSchema = z.object({
  body: z.object({
    products: z
      .array(OrderSchema)
      .min(1, { message: 'At least one item is required' }),
  }),
});


export const OrderValidations = {
  OrderValidationSchema,
};
