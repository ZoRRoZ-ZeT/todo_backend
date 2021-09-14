/* eslint-disable import/extensions */
import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from '../constants/types.js';
import TodoRepository from '../repositories/todos.js';
import TodoController from '../controllers/todos.js';
import TodoRouter from '../routers/todos.js';
import TodoService from '../services/todos.js';
import RootRouter from '../routers/root.js';
import Application from './application.js';

class CompositionRoot {
  initializeContainer() {
    this.container = new Container();

    this.container.bind(TYPES.TodoRepository).to(TodoRepository);
    this.container.bind(TYPES.TodoService).to(TodoService);
    this.container.bind(TYPES.TodoController).to(TodoController);
    this.container.bind(TYPES.TodoRouter).to(TodoRouter);
    this.container.bind(TYPES.RootRouter).to(RootRouter);
    this.container.bind(TYPES.Application).to(Application).inSingletonScope();
  }

  startup() {
    this.initializeContainer();

    const application = this.container.get(TYPES.Application);
    application.bootstrap();
  }
}

export default CompositionRoot;
