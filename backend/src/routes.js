import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/Multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveriesController from './app/controllers/DeliveriesController';
import OrderController from './app/controllers/OrderController';
import OrdersDeliveriesController from './app/controllers/OrdersDeliveriesController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ message: 'Distribuidora FastFeet' }));

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);

routes.get('/deliveries/:id', DeliveriesController.index);
routes.put('/deliveries/:id/:order_id', DeliveriesController.update);

routes.get('/deliveries/:id/deliveries', OrdersDeliveriesController.index);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.get('/recipients', RecipientController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymans', DeliverymanController.store);
routes.get('/deliverymans', DeliverymanController.index);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.destroy);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.destroy);

export default routes;
