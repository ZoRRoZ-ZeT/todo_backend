import Router from 'express';
import { decorate, inject, injectable } from 'inversify';
// eslint-disable-next-line import/extensions
import TYPES from '../constants/types.js';

class UserRouter {
  constructor(userController) {
    this.userController = userController;

    this.initializeRouter();
  }

  initializeRouter() {
    this.router = new Router();

    this.router.post('/register', this.userController.register);
    this.router.post('/login', this.userController.login);
    this.router.post('/logout', this.userController.logout);

    this.router.get('/activate/:link', this.userController.activate);
    this.router.get('/refresh', this.userController.refresh);
  }

  getRouter() {
    return this.router;
  }
}

decorate(injectable(), UserRouter);
decorate(inject(TYPES.UserController), UserRouter, 0);

export default UserRouter;
