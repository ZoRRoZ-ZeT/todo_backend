import { decorate, inject, injectable } from 'inversify';
// eslint-disable-next-line import/extensions
import TYPES from '../constants/types.js';

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async createTask(todoDto) {
    const createdTask = await this.todoRepository.createTask(todoDto);
    return createdTask;
  }

  async getTasks() {
    const tasks = await this.todoRepository.getTasks();
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

  async toggleTasks() {
    const toggledTasks = await this.todoRepository.toggleTasks();
    return toggledTasks;
  }

  async deleteTask(todoDto) {
    const deletedTask = await this.todoRepository.deleteTask(todoDto.id);
    return deletedTask;
  }

  async deleteCompleted(filter) {
    const deletedTasks = await this.todoRepository.deleteCompleted(filter);
    return deletedTasks;
  }
}

decorate(injectable(), TodoService);
decorate(inject(TYPES.TodoRepository), TodoService, 0);

export default TodoService;
