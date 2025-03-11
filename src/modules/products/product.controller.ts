import { IImageFiles } from '../interface/IImageFile';
import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = CatchAsync(async (req, res) => {
  console.log(req.user?.id);
  const result = await ProductServices.createProductIntoDB(
    req.files as IImageFiles,
    req.body,
    req.user?.id,
  );
  sendResponse(res, {
    success: true,
    message: 'Product created successfully',
    statusCode: 201,
    data: result,
  });
});

const getAllProduct = CatchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'All Products retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const getSingleProduct = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Product retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const updateProduct = CatchAsync(async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const result = await ProductServices.updateProductIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    message: 'Product updated successfully',
    statusCode: 200,
    data: result,
  });
});

const deleteProduct = CatchAsync(async (req, res) => {
  const { id } = req.params;
  await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Product deleted successfully',
    statusCode: 200,
  });
});

const getProductsByUserID = CatchAsync(async (req, res) => {
  const userId = req?.user?.id;
  console.log(userId);
  const result = await ProductServices.getProductsByUserID(userId, req.query);
  sendResponse(res, {
    success: true,
    message: 'Products retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const getSalesByUserID = CatchAsync(async (req, res) => {
  const userId = req?.user?.id;
  console.log(userId);
  const result = await ProductServices.getSalesByUserID(userId, req.query);
  sendResponse(res, {
    success: true,
    message: 'Products retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserID,
  getSalesByUserID,
};
