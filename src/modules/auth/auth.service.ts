import httpStatus from 'http-status';
import AppError from '../error/AppError';
import { User } from '../user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';

import config from '../../config';
import { createToken } from './auth.utils';

const userRegistration = async (payload: TLoginUser) => {
  const userExists = await User.isUserExist(payload?.email);

  if (userExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have already registered');
  }

  const newUser = await User.create(payload);

  const jwtPayload = {
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret_key as string,
    '10d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_key as string,
    '365d',
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExist(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    id: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret_key as string,
    '10d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_key as string,
    '365d',
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_key as string,
  ) as JwtPayload;

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret_key as string,
    '10d',
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  userRegistration,
  loginUser,
  refreshToken,
};
