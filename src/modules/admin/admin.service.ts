
import AppError from '../error/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const updateUserByAdmin = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  return result;
};



export const AdminServices = {
  updateUserByAdmin,
  
};
