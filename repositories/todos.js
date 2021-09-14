/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { decorate, injectable } from 'inversify';

import NotFoundError from '../exceptions/notFound.js';
import Task from './models/task.js';

class TodoRepository {
  async createTask(todoDto) {
    const task = {
      value: todoDto.value,
      isChecked: todoDto.isChecked,
    };

    const createdTask = await Task.create(task);
    return createdTask;
  }

  async getTaskById(id) {
    const task = await Task.findById(id);
    this.checkTask(task);

    return task;
  }

  async getTasks() {
    const tasks = await Task.find();

    return tasks;
  }

  async updateTask(id, todoDto) {
    const updatedTask = await Task.findByIdAndUpdate(id, todoDto, { new: true });
    this.checkTask(updatedTask);

    return updatedTask;
  }

  async deleteTask(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    this.checkTask(deletedTask);

    return deletedTask;
  }

  checkTask(task) {
    if (task === undefined) {
      throw new NotFoundError([{
        message: 'Task not found',
      }]);
    }
  }
}

decorate(injectable(), TodoRepository);

export default TodoRepository;
