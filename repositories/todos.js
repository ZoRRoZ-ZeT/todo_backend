import { decorate, injectable } from 'inversify';
// eslint-disable-next-line import/extensions
import NotFoundError from '../exceptions/notFound.js';

class TodoRepository {
  constructor() {
    this.tasks = [];
    this.currentId = 0;
  }

  createTask(todoDto) {
    const task = {
      id: this.currentId,
      value: todoDto.value,
      isChecked: todoDto.isChecked,
    };
    this.tasks.push(task);
    this.currentId += 1;

    return task;
  }

  getTaskById(id) {
    const task = this.tasks.find((x) => x.id === +id);
    if (task === undefined) {
      throw new NotFoundError([{
        message: 'Task not found',
      }]);
    }
    return task;
  }

  getTasks() {
    return this.tasks.slice();
  }

  updateTask(id, todoDto) {
    const oldTask = this.getTaskById(id);
    oldTask.value = todoDto.value;
    oldTask.isChecked = todoDto.isChecked;

    return oldTask;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex((x) => x.id === +id);
    const deletedTask = this.tasks.splice(taskIndex, 1);

    return deletedTask;
  }
}

decorate(injectable(), TodoRepository);

export default TodoRepository;
