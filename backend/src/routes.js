import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/Multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ message: 'Distribuidora FastFeet' }));

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.get('/recipients', RecipientController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.destroy);

export default routes;
