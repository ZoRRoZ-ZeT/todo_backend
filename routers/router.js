import Router from "express";
import TodoController from "../controllers/todos.js";

const router = new Router();

router.post('/todo', TodoController.create);
router.get('/todo', TodoController.getAll);
router.get('/todo/:id', TodoController.getOne);
router.put('/todo', TodoController.update);
router.delete('/todo/:id', TodoController.delete);

export default router;