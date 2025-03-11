import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { AuthServices } from './auth.service';

const registrationUser = CatchAsync(async (req, res) => {
  const result = await AuthServices.userRegistration(req.body);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
  });

  console.log(result);
  sendResponse(res, {
    success: true,
    message: 'User Registration successful',
    statusCode: 200,
    data: {
      token: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

const loginUser = CatchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

const refreshToken = CatchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    message: 'Access Token retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

export const AuthControllers = {
  registrationUser,
  loginUser,
  refreshToken,
};
