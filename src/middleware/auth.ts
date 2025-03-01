import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../modules/utils/CatchAsync';
import AppError from '../modules/error/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret_key as string,
    ) as JwtPayload;

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
    }

    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You do not have permission ');
    }

    req.user = { email: user.email, role: user.role, id: user._id };

    next();
  });
};

export default auth;
