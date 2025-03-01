import mongoose from "mongoose";
import { User } from "../user/user.model";

import { TOrders, TProductOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../products/product.model";
import { orderUtils } from "./order.utils";

const createOrderIntoDB = async (payload:  { products: { productId: string; quantity: number }[] }, userId: string,client_ip:string ) => {
 

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new Error("User not found");
  }

  let totalPrice = 0;
  const updatedProducts = [];

  for (const product of payload.products) {
    const dbProduct = await Product.findById(product.productId);

    if (!dbProduct) {
      throw new Error(`Product with ID ${product.productId} not found`);
    }

    if (dbProduct.stock < product.quantity) {
      throw new Error(`Not enough stock for ${dbProduct.name}`);
    }

    totalPrice += product.quantity * dbProduct.price;
    updatedProducts.push({
      productId: dbProduct._id,
      quantity: product.quantity,
      price: dbProduct.price,
    });

  
    dbProduct.stock -= product.quantity;
    await dbProduct.save();
  }

  const orderData = {
    userId: new mongoose.Types.ObjectId(userId),
    products: updatedProducts,
    totalPrice,
  };

  
  const result = await Order.create(orderData);

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: result._id,
    currency: "BDT",
    customer_name: isUserExist.name,
    customer_address: 'The customer address field is required.',
  customer_phone: 'The customer phone field is required.',
  customer_city: 'The customer city field is required.',
   
    customer_email: isUserExist.email,
    
    client_ip,
  };

  

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  

  if (payment?.transactionStatus) {
    const result = await Order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  
  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

const getOrders = async (email:string) => {
  const user  = await  User.findOne({email})
  const userId = user?._id
 
  const data = await Order.find({userId:userId});
  return data;
};

export const OrderServices = {
  createOrderIntoDB,
  verifyPayment,
  getOrders
};
