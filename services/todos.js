import TodoRepository from "../repositories/todos.js";

class TodoService {
	
	createTask(value, isChecked) {
		const createdTask = TodoRepository.createTask({value, isChecked});
		return createdTask;
	}

	getTasks() {
		const tasks = TodoRepository.getTasks();
		return tasks;
	}

	getTaskById(id) {
		const task = TodoRepository.getTaskById(id);
		return task;
	}

	updateTask(id, task) {
		const updatedTask = TodoRepository.updateTask(id,task);
		return updatedTask;
	}

	deleteTask(id) {
		const deletedTask = TodoRepository.deleteTask(id);
		return deletedTask;
	}
}

export default new TodoService();