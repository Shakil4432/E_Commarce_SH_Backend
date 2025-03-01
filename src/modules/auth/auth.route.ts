import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/register',
  validateRequest(AuthValidations.registrationUserValidation),
  AuthControllers.registrationUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
export const AuthRoutes = router;
