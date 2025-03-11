import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { OrderServices } from './order.service';

export const createOrder = CatchAsync(async (req, res) => {
  const user = req.user;

  console.log(user);
  const order = await OrderServices.createOrderIntoDB(
    req.body,
    user?.id,
    req.ip!,
  );
  console.log(order);
  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: 201,
    data: order,
  });
});

const verifyPayment = CatchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
    success: true,
  });
});

const getOrders = CatchAsync(async (req, res) => {
  const email = req.params.email;
  const order = await OrderServices.getOrders(email);

  sendResponse(res, {
    statusCode: 200,
    message: 'Order retrieved successfully',
    data: order,
    success: true,
  });
});

export const OrderControllers = {
  createOrder,
  verifyPayment,
  getOrders,
};
