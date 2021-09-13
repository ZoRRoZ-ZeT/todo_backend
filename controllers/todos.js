/* eslint-disable import/extensions */
import { decorate, inject, injectable } from 'inversify';

import TYPES from '../constant/types.js';
import CreateTodoDto from '../dto/createTodo.js';
import DeleteTodoDto from '../dto/deleteTodo.js';
import GetTodoDto from '../dto/getTodo.js';
import UpdateTodoDto from '../dto/updateTodo.js';

class TodoController {
  constructor(todoService) {
    this.todoService = todoService;

    this.createTask = this.createTask.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.getOneTask = this.getOneTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async createTask(req, res) {
    try {
      const todoDto = new CreateTodoDto(req.body);
      const task = this.todoService.createTask(todoDto);

      res.status(200).json(task);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await this.todoService.getTasks();
      res.status(200).json(tasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOneTask(req, res) {
    try {
      const todoDto = new GetTodoDto(req.params);
      const task = this.todoService.getTaskById(todoDto);

      res.status(200).json(task);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async updateTask(req, res) {
    try {
      const todoDto = new UpdateTodoDto(req.body);
      const task = this.todoService.updateTask(todoDto);

      res.status(200).json(task);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteTask(req, res) {
    try {
      const todoDto = new DeleteTodoDto(req.params);
      const task = this.todoService.deleteTask(todoDto);

      res.status(200).json(task);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

decorate(injectable(), TodoController);
decorate(inject(TYPES.TodoService), TodoController, 0);

export default TodoController;
