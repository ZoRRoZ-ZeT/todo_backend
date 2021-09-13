import { decorate, inject, injectable } from 'inversify';
// eslint-disable-next-line import/extensions
import TYPES from '../constant/types.js';

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  createTask(todoDto) {
    const createdTask = this.todoRepository.createTask(todoDto);
    return createdTask;
  }

  getTasks() {
    const tasks = this.todoRepository.getTasks();
    return tasks;
  }

  getTaskById(todoDto) {
    const task = this.todoRepository.getTaskById(todoDto.id);
    return task;
  }

  updateTask(id, todoDto) {
    const updatedTask = this.todoRepository.updateTask(id, todoDto);
    return updatedTask;
  }

  deleteTask(todoDto) {
    const deletedTask = this.todoRepository.deleteTask(todoDto.id);
    return deletedTask;
  }
}

decorate(injectable(), TodoService);
decorate(inject(TYPES.TodoRepository), TodoService, 0);

export default TodoService;
