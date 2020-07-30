import { Router } from 'express';

import { createUserController } from './use-cases/create-user';
import { authenticateUserController } from './use-cases/authenticate-user';

const ROUTE_PREFIX = 'users';

const router = Router();

router.post('/signup', (request, response) => {
  return createUserController.handle(request, response);
});

router.post('/signin', (request, response) => {
  return authenticateUserController.handle(request, response);
});

const prefix = ROUTE_PREFIX;

export { router, prefix };
