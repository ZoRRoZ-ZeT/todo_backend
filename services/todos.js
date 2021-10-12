import { decorate, inject, injectable } from 'inversify';
// eslint-disable-next-line import/extensions
import TYPES from '../constants/types.js';

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async createTask(todoDto, userId) {
    const createdTask = await this.todoRepository.createTask(todoDto, userId);
    return createdTask;
  }

  async getTasks(userId) {
    const tasks = await this.todoRepository.getTasksByUser(userId);
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
    const fillValue = await this.todoRepository.toggleTasks(userId);
    return fillValue;
  }

  async deleteTask(todoDto) {
    const deletedTask = await this.todoRepository.deleteTask(todoDto.id);
    return deletedTask;
  }

  async deleteCompleted(filter, userId) {
    const deletedTasks = await this.todoRepository.deleteCompleted(filter, userId);
    return deletedTasks;
  }
}

decorate(injectable(), TodoService);
decorate(inject(TYPES.TodoRepository), TodoService, 0);

export default TodoService;
