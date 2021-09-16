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
      priority: todoDto.priority,
    };

    const createdTask = await Task.create(task);
    return createdTask;
  }

  async getTaskById(id) {
    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError([{
        message: 'Task not found',
      }]);
    }

    return task;
  }

  async getTasks() {
    const tasks = await Task.find();

    return tasks;
  }

  async updateTask(id, todoDto) {
    const updatedTask = await Task.findByIdAndUpdate(id, todoDto, { new: true });
    if (!updatedTask) {
      throw new NotFoundError([{
        message: 'Task not found',
      }]);
    }

    return updatedTask;
  }

  async deleteTask(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new NotFoundError([{
        message: 'Task not found',
      }]);
    }

    return deletedTask;
  }

  checkTask(task) {
    return task === undefined;
  }
}

decorate(injectable(), TodoRepository);

export default TodoRepository;
