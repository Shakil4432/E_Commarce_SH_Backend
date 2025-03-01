import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status';

const updateUserByAdmin = CatchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await AdminServices.updateUserByAdmin(userId);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});



export const AdminControllers = {
  updateUserByAdmin,
  
};
