import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './modules/user/user.route';
import { AuthRoutes } from './modules/auth/auth.route';
import { ProductRoutes } from './modules/products/product.route';
import { AdminRoutes } from './modules/admin/admin.route';
import { OrderRoutes } from './modules/orders/order.route';
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// application routes
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/order', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Book Shop server running');
});

app.use(globalErrorHandler);

export default app;
