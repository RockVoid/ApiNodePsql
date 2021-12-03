import { express } from "express";
import { issuesDb } from "../models/todos";

const router = express.Router();

export const getUsers = async (req, res) => {
    try {
        const allUsers = await issuesDb.query("SELECT * FROM users");
        res.status(200).json(allUsers.rows);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUsersIssues = async (req, res) => {
    const { user_id, issue_id } = req.params;
    console.log(req.params);

    try {
        const name = await issuesDb.query("SELECT name FROM users WHERE name = $1", [user_id]);
        console.log(name);

        const allUsersIssues = await issuesDb.query("SELECT * FROM issues WHERE id = $1", [issue_id]);
        res.status(200).json(allUsersIssues.rows);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const postUsers = async (req, res) => {
    const { 
        name
    } = req.body;

    if(name === null) {
        return res.status(404).json({ message: "Campo nome é obrigatório." });
    }

    try {
        await issuesDb.query("INSERT INTO users (name) VALUES($1) RETURNING *", [name]);
        res.status(200).json({ message: "Usuario inserido com sucesso." });
    } catch (err) {
        res.status(500).json({ mesage: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
        } = req.body;

        await issuesDb.query(`
            UPDATE users 
            SET name = $1 
            WHERE id = $2`, [name, id]
        );

        res.status(200).json({ message: "Usuário atualizada com sucesso" });
    } catch(err) {
        res.status(204).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToDel = await issuesDb.query("DELETE FROM users WHERE id = $1", [id]);

        if(!userToDel.rowCount) {
            return res.status(404).json({ message: "Id não encontrado." });
        }

        res.status(200).json({ message: "Usuario removida com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default router;