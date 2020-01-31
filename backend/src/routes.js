import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Distribuidora FastFeet' }));

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

export default routes;
