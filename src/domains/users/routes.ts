import { Router } from 'express';

import { createUserController } from './use-cases/create-user';
import { authenticateUserController } from './use-cases/authenticate-user';
import { forgotPasswordController } from './use-cases/forgot-password';
import { resetPasswordController } from './use-cases/reset-password';

const ROUTE_PREFIX = 'users';

const router = Router();

router.post('/signup', (request, response) => {
  return createUserController.handle(request, response);
});

router.post('/signin', (request, response) => {
  return authenticateUserController.handle(request, response);
});

router.post('/forgot-password', (request, response) => {
  return forgotPasswordController.handle(request, response);
});

router.post('/reset-password', (request, response) => {
  return resetPasswordController.handle(request, response);
});

const prefix = ROUTE_PREFIX;

export { router, prefix };
