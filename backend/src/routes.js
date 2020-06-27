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
import ChekInDeliveryController from './app/controllers/ChekInDeliveryController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryDeliveriesController from './app/controllers/DeliveryDeliveriesController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ message: 'Distribuidora FastFeet' }));

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// Exibir um destinatario
routes.get('/deliveries/:id', DeliveriesController.index);

// Retirada de encomenda
routes.put('/deliveries/:id/:delivery_id', ChekInDeliveryController.update);

// Exibir varios entregas pendentes
routes.get('/delivery/:id/deliveries', DeliveryDeliveriesController.index);

// Cadastra problema
routes.post('/deliveries/problems', DeliveryProblemController.store);

// Upload de foto
routes.post('/files', upload.single('file'), FileController.store);

// Verifica token
routes.use(authMiddleware);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.get('/recipients', RecipientController.index);

routes.post('/deliverymans', DeliverymanController.store);
routes.get('/deliverymans', DeliverymanController.index);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.destroy);

routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.destroy);

routes.put('/problem/cancel-delivery/:id', DeliveryProblemController.update);

export default routes;
