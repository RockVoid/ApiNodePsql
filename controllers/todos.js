import { Router } from "express";
import { issuesDb } from "../models/todos.js";
import { todoState } from "../utils/verificationRequest.js";

const router = Router();

export const getTodos = async (req, res) => {
    try {
        const allTodos = await issuesDb.query("SELECT * FROM issues");
        res.status(200).json(allTodos.rows);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getTodosById = async (req, res) => {
    try {
        const { issue_id } = req.params;
        const todo = await issuesDb.query("SELECT * FROM issues WHERE issue_id = $1", [issue_id]);
        
        if(!todo.rowCount) {
            res.status(404).json({ message: "Id não encontrado." });
        };

        res.status(200).json(todo.rows[0]);
    } catch(err) {
        res.status(500).json({ err: err.message });      
    }
};

export const postTodo = async (req, res) => {
    try {
        const { user_id } = req.params;
        let { 
            description,
            todo,
            doing,
            done
        } = req.body;

        todo = true;
        doing = false;
        done = false;

        const newTodo = await issuesDb.query(`
            INSERT INTO issues (description, todo, doing, done) 
            VALUES($1, $2, $3, $4) 
            RETURNING *`, [description, todo, doing, done]);

        const { issue_id } = newTodo.rows[0];

        await issuesDb.query(`
            INSERT INTO issue_has_user (user_id, issue_id) 
            VALUES($1, $2)`, [user_id, issue_id]);

        res.json(newTodo.rows[0]);
    } catch (err) {        
        res.status(404).json({ message: err.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { issue_id } = req.params;
        let { 
            description, 
        } = req.body;

        let {
            todo, 
            doing, 
            done
        } = todoState(req.body.todo, req.body.doing, req.body.done);

        await issuesDb.query(`
            UPDATE issues 
            SET description = $1,  
            todo = $2, 
            doing = $3,
            done = $4  
            WHERE issue_id = $5`, [description, todo, doing, done, issue_id]
        );

        res.status(200).json({ message: "Issue atualizada com sucesso" });
    } catch(err) {
        res.status(204).json({ message: err.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { issue_id } = req.params;
        const todoToDel = await issuesDb.query("DELETE FROM issues WHERE issue_id = $1", [issue_id]);

        if(!todoToDel.rowCount) {
            return res.status(404).json({ message: "Id não encontrado." });
        }

        res.status(200).json({ message: "Issue removida com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default router;