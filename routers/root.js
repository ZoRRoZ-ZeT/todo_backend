/* eslint-disable import/extensions */
import { Router } from 'express';
import { decorate, inject, injectable } from 'inversify';

import TYPES from '../constants/types.js';
import authMiddleware from '../middleware/auth.js';

class RootRouter {
  constructor(todoRouter, userRouter) {
    this.todoRouter = todoRouter;
    this.userRouter = userRouter;

    this.initialize();
  }

  initialize() {
    this.router = new Router();

    this.router.use('/api', this.userRouter.getRouter());
    this.router.use('/api', authMiddleware, this.todoRouter.getRouter());
  }

  getRouter() {
    return this.router;
  }
}

decorate(injectable(), RootRouter);
decorate(inject(TYPES.TodoRouter), RootRouter, 0);
decorate(inject(TYPES.UserRouter), RootRouter, 1);

export default RootRouter;
