import { Router } from "express";

import { 
    getTodos,
    getTodosById,
    updateTodo,
    postTodo,
    deleteTodo
} from "../controllers/todos.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodosById);
router.post("/", postTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;