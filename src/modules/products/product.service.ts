import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../error/AppError';
import { searchAbleFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';
import { IImageFiles } from '../interface/IImageFile';

const createProductIntoDB = async (
  productImages: IImageFiles,
  productData: Partial<TProduct>,

  userId: string,
) => {
  const { files } = productImages;
  if (!files || files.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product images are required.');
  }

  productData.images = files.map((image) => image.path);
  productData.userID = new mongoose.Types.ObjectId(userId);

  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const ProductsQuery = new QueryBuilder(Product.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await ProductsQuery.countTotal();
  const result = await ProductsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById({ _id: id });
  return result;
};

const updateProductIntoDB = async (
  id: string,

  payload: Partial<TProduct>,
) => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not able to update this Product',
    );
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findOneAndDelete({ _id: id });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not able to delete this Product',
    );
  }

  return result;
};

const getProductsByUserID = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const ProductsQuery = new QueryBuilder(
    Product.find({ userID: userId }),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await ProductsQuery.countTotal();
  const result = await ProductsQuery.modelQuery;
  console.log(meta, result);

  return {
    meta,
    result,
  };
};

const getSalesByUserID = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const SalesQuery = new QueryBuilder(
    Product.find({
      $and: [{ userID: userId }, { status: 'sold' }],
    }),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await SalesQuery.countTotal();
  const result = await SalesQuery.modelQuery;

  return {
    meta,
    result,
  };
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getProductsByUserID,
  getSalesByUserID,
};
