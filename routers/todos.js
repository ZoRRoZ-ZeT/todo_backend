import Router from 'express';
import { decorate, inject, injectable } from 'inversify';
// eslint-disable-next-line import/extensions
import TYPES from '../constants/types.js';

class TodoRouter {
  constructor(todoController) {
    this.todoController = todoController;

    this.initializeRouter();
  }

  initializeRouter() {
    this.router = new Router();

    this.router.post('/todos', this.todoController.createTask);
    this.router.get('/todos', this.todoController.getAllTasks);
    this.router.get('/todos/:id', this.todoController.getOneTask);

    this.router.put('/todos', this.todoController.updateTask);
    this.router.put('/todos/toggle', this.todoController.toggleTasks);

    this.router.delete('/todos/:id', this.todoController.deleteTask);
    this.router.delete('/todos', this.todoController.deleteCompleted);
  }

  getRouter() {
    return this.router;
  }
}

decorate(injectable(), TodoRouter);
decorate(inject(TYPES.TodoController), TodoRouter, 0);

export default TodoRouter;
