/* eslint-disable import/extensions */
import { decorate, inject, injectable } from 'inversify';
import TYPES from '../constants/types.js';
import NotFoundError from '../exceptions/notFound.js';

class TodoService {
  constructor(todoRepository, userService) {
    this.todoRepository = todoRepository;
    this.userService = userService;
  }

  async getUserById(id) {
    const userFromDb = await this.userService.getTaskById(id);
    if (!userFromDb) {
      throw new NotFoundError([{
        message: 'User not found',
      }]);
    }
    return userFromDb;
  }

  async createTask(todoDto, userId) {
    const user = await this.getUserById(userId);
    const createdTask = await this.todoRepository.createTask(todoDto, user.id);
    return createdTask;
  }

  async getTasks(userId) {
    const user = await this.getUserById(userId);
    const tasks = await this.todoRepository.getTasksByUser(user.id);
    return tasks;
  }

  async getTaskById(todoDto) {
    const task = await this.todoRepository.getTaskById(todoDto.id);
    return task;
  }

  async updateTask(todoDto) {
    const updatedTask = await this.todoRepository.updateTask(todoDto.id, todoDto);
    return updatedTask;
  }

  async toggleTasks(userId) {
    const user = await this.getUserById(userId);
    const fillValue = await this.todoRepository.toggleTasks(user.id);
    return fillValue;
  }

  async deleteTask(todoDto) {
    const deletedTask = await this.todoRepository.deleteTask(todoDto.id);
    return deletedTask;
  }

  async deleteCompleted(filter, userId) {
    const user = await this.getUserById(userId);
    const deletedTasks = await this.todoRepository.deleteCompleted(filter, user.id);
    return deletedTasks;
  }
}

decorate(injectable(), TodoService);
decorate(inject(TYPES.TodoRepository), TodoService, 0);
decorate(inject(TYPES.UserService), TodoService, 1);

export default TodoService;
