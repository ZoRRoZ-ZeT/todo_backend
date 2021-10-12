/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { decorate, injectable } from 'inversify';
import UpdateTodoDto from '../dto/updateTodo.js';

import NotFoundError from '../exceptions/notFound.js';
import Task from './models/task.js';

class TodoRepository {
  async getTasksByUser(userId) {
    return Task.find({ userId });
  }

  async createTask(todoDto, userId) {
    const currentMaxSortId = (await this.getTasksByUser(userId)
      .then(
        (tasks) => (tasks.length ? Math.max(...tasks.map(
          (task) => task.sort,
        )) : 0),
      ));
    const task = {
      value: todoDto.value,
      isChecked: todoDto.isChecked,
      priority: todoDto.priority,
      sort: currentMaxSortId + 1,
      userId,
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

  async updateTask(id, todoDto) {
    const updatedTask = await Task.findByIdAndUpdate(id, todoDto, { new: true });
    if (!updatedTask) {
      throw new NotFoundError([{
        message: 'Task not found',
      }]);
    }

    return updatedTask;
  }

  async toggleTasks(userId) {
    const tasks = await this.getTasksByUser(userId).then(
      (findedTasks) => findedTasks.map(
        (task) => new UpdateTodoDto(task),
      ),
    );
    const fillValue = tasks.some((task) => task.isChecked === false);

    await Promise.all(tasks.map(async (task) => {
      await this.updateTask(task.id, {
        ...task,
        isChecked: fillValue,
      }, { new: true });
    }));

    return fillValue;
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

  async deleteCompleted(filter, userId) {
    const deletedTasks = [];
    const tasks = await this.getTasksByUser(userId);

    await Promise.all(tasks.map(async (task) => {
      if (task.isChecked === filter) {
        const { id } = task;
        const deletedTask = await Task.findByIdAndDelete(id);
        deletedTasks.push(deletedTask);
      }
    }));

    return deletedTasks;
  }

  checkTask(task) {
    return task === undefined;
  }
}

decorate(injectable(), TodoRepository);

export default TodoRepository;
