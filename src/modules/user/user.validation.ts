import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['user', 'admin']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
