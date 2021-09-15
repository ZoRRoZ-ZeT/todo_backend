/* eslint-disable import/extensions */
import { decorate, inject, injectable } from 'inversify';

import TYPES from '../constants/types.js';
import CreateTodoDto from '../dto/createTodo.js';
import DeleteTodoDto from '../dto/deleteTodo.js';
import GetTodoDto from '../dto/getTodo.js';
import UpdateTodoDto from '../dto/updateTodo.js';
import TodoDto from '../dto/todos.js';

class TodoController {
  constructor(todoService) {
    this.todoService = todoService;

    this.createTask = this.createTask.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.getOneTask = this.getOneTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async createTask(req, res, next) {
    try {
      console.log(req.body);
      const todoDto = new CreateTodoDto(req.body);
      const task = await this.todoService.createTask(todoDto);
      const taskDto = new TodoDto(task);

      res.status(200).json({
        statusCode: 200,
        payload: taskDto,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await this.todoService.getTasks();
      const tasksDto = tasks.map((task) => new TodoDto(task));

      res.status(200).json({
        statusCode: 200,
        payload: tasksDto,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneTask(req, res, next) {
    try {
      const todoDto = new GetTodoDto(req.params);
      const task = await this.todoService.getTaskById(todoDto);
      const taskDto = new TodoDto(task);

      res.status(200).json({
        statusCode: 200,
        payload: taskDto,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const todoDto = new UpdateTodoDto(req.body);
      const task = await this.todoService.updateTask(todoDto);
      const taskDto = new TodoDto(task);

      res.status(200).json({
        statusCode: 200,
        payload: taskDto,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const todoDto = new DeleteTodoDto(req.params);
      const task = await this.todoService.deleteTask(todoDto);
      const taskDto = new TodoDto(task);

      res.status(200).json({
        statusCode: 200,
        payload: taskDto,
      });
    } catch (error) {
      next(error);
    }
  }
}

decorate(injectable(), TodoController);
decorate(inject(TYPES.TodoService), TodoController, 0);

export default TodoController;
