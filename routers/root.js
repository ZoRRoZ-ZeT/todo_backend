/* eslint-disable import/extensions */
import { Router } from 'express';
import { decorate, inject, injectable } from 'inversify';

import TYPES from '../constants/types.js';
import errorMiddleware from './middleware/error.js';

class RootRouter {
  constructor(todoRouter) {
    this.todoRouter = todoRouter;

    this.initialize();
  }

  initialize() {
    this.router = new Router();
    this.router.use('/api', this.todoRouter.getRouter());
    this.router.use(errorMiddleware);
  }

  getRouter() {
    return this.router;
  }
}

decorate(injectable(), RootRouter);
decorate(inject(TYPES.TodoRouter), RootRouter, 0);

export default RootRouter;
