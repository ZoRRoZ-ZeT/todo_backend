class TodoRepository {
	constructor() {
		this.tasks = [];
		this.currentId = 0;
	}

	createTask({value, isChecked}) {
		const task = {
			id: this.currentId++,
			value,
			isChecked
		};
		this.tasks.push(task);

		return task;
	}

	getTaskById(id) {
		const task = this.tasks.find((x) => x.id === +id);
		return task;
	}

	getTasks() {
		return this.tasks.slice();
	}

	updateTask(id, task) {
		const oldTask = this.getTaskById(id);
		oldTask.value = task.value;
		oldTask.isChecked = task.isChecked;

		return oldTask;
	}

	deleteTask(id) {
		const taskIndex = this.tasks.findIndex((x) => x.id === +id);
		const deletedTask = this.tasks.splice(taskIndex,1);

		return deletedTask;
	}
}

export default new TodoRepository();