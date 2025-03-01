import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    price: z.number().positive('Price must be a positive number'),
    condition: z.enum(['New', 'Used']),
    category: z.string(),
    images: z.array(z.string().url().or(z.string())),
    userID: z.string().min(1, 'User ID is required'),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters long')
      .optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    condition: z.enum(['New', 'Used']).optional(),
    category: z.string().optional(),
    images: z.array(z.string().url().or(z.string())).optional(),
    userID: z.string().min(1, 'User ID is required').optional(),
  }),
});

export const ProductValidations = {
  productValidationSchema,
  updateProductValidationSchema,
};
