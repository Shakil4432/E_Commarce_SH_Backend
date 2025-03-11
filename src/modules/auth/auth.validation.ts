import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const registrationUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    number: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits' })
      .max(15, { message: 'Phone number must be at most 15 digits' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    role: z.enum(['user', 'admin']).optional().default('user'),
    isBlocked: z.boolean().optional().default(false),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidations = {
  registrationUserValidation,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
