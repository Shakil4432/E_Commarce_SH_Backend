import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';
const router = express.Router();
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.updateUserByAdmin,
);



export const AdminRoutes = router;
