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
router.get("/:issue_id", getTodosById);
router.post("/:user_id", postTodo);
router.put("/:issue_id", updateTodo);
router.delete("/:issue_id", deleteTodo);

export default router;