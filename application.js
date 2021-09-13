/* eslint-disable import/extensions */
import 'reflect-metadata';
import { Container } from 'inversify';

import { Router } from 'express';
import TYPES from './constant/types.js';
import TodoController from './controllers/todos.js';
import TodoRepository from './repositories/todos.js';
import TodoRouter from './routers/router.js';
import TodoService from './services/todos.js';

class Application {
  initializeContainer() {
    this.container = new Container();

    this.container.bind(TYPES.TodoRepository).to(TodoRepository);
    this.container.bind(TYPES.TodoService).to(TodoService);
    this.container.bind(TYPES.TodoController).to(TodoController);
    this.container.bind(TYPES.TodoRouter).to(TodoRouter);
  }

  initializeRootRouter() {
    this.rootRouter = new Router();

    const todoRouter = this.container.get(TYPES.TodoRouter);
    /* Another routes */

    this.rootRouter.use('/api', todoRouter.getRouter());
  }

  run() {
    this.initializeContainer();

    this.initializeRootRouter();
  }

  getRootRouter() {
    return this.rootRouter;
  }
}

export default Application;
