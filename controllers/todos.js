import TodoService from "../services/todos.js";

class TodoController {
	async create(req,res) {
		try {
			const {value, isChecked} = req.body;
			const task = TodoService.createTask(value,isChecked);

			res.json(task);
		} catch(e) {
			res.status(500).json(e);
		}
	}

	async getAll(req,res) {
		try {
			const tasks = TodoService.getTasks();
			res.json(tasks);
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async getOne(req, res) {
		try {
			const {id} = req.params;
			const task = TodoService.getTaskById(id);

			res.json(task);
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async update(req, res) {
		try {
			const body = req.body;
			const task = TodoService.updateTask(body.id, body);

			res.json(task);
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async delete(req, res) {
		try	{
			const {id} = req.params;
			const task = TodoService.deleteTask(id);

			res.json(task);
		} catch (e) {
			res.status(500).json(e);
		}
	}
}

export default new TodoController();