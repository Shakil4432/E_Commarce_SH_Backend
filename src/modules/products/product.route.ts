import express, { NextFunction, Request, Response } from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidations } from './product.validation';
import { upload } from '../utils/sendImageToCloudinary';
const router = express.Router();
router.post(
  '/create-product',
  auth(USER_ROLE.admin, USER_ROLE.user),
  upload.fields([{ name: 'files' }]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files as Express.Multer.File[]);

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No images uploaded' });
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.productValidationSchema),
  ProductControllers.createProduct,
);
router.get('/', ProductControllers.getAllProduct);
router.get('/sales', auth(USER_ROLE.user), ProductControllers.getSalesByUserID);
router.get(
  '/byId',
  auth(USER_ROLE.user),
  ProductControllers.getProductsByUserID,
);

router.get('/:id', ProductControllers.getSingleProduct);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  upload.fields([{ name: 'files' }]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files as Express.Multer.File[]);

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No images uploaded' });
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ProductControllers.deleteProduct,
);
export const ProductRoutes = router;
