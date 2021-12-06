import { Router } from "express";
import { issuesDb } from "../models/todos.js";

const router = Router();

export const getUsers = async (req, res) => {
    try {
        const allUsers = await issuesDb.query("SELECT * FROM users");
        res.status(200).json(allUsers.rows);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserById = async (req, res) => {
    const { user_id } = req.params;

    try {
        const requestedUser = await issuesDb.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if(requestedUser.rowCount) {
            return res.status(200).json(requestedUser.rows[0]);
        }

        res.status(404).json({message: "Usuário não encontrado!"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserIssues = async (req, res) => {
    const { user_id } = req.params;

    try {
        const queryUserIssues = await issuesDb.query(`
            SELECT * 
            FROM issue_has_user 
                INNER JOIN users 
                ON issue_has_user.user_id = users.user_id 
                INNER JOIN issues
                ON issue_has_user.issue_id = issues.issue_id
                WHERE users.user_id = $1
        `, [user_id]);
        
        const userIssues = queryUserIssues.rows.map(userIssue => userIssue.description);
        res.status(200).json(userIssues);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const postUsers = async (req, res) => {
    const { name } = req.body;

    if(name === null) {
        return res.status(404).json({ message: "Campo nome é obrigatório." });
    }

    try {
        await issuesDb.query("INSERT INTO users (name) VALUES($1)", [name]);
        res.status(200).json({ message: "Usuario inserido com sucesso." });
    } catch (err) {
        res.status(500).json({ mesage: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name } = req.body;

        const userToUpdate = await issuesDb.query(`
            UPDATE users 
            SET name = $1 
            WHERE user_id = $2`, [name, user_id]
        );
        
        if(userToUpdate.rowCount) {
            return res.status(200).json({ message: "Usuário atualizado com sucesso" });
        }

        res.status(404).json({ message: "Usuario não encontrado!" });
    } catch(err) {
        res.status(204).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const userAndIssuesToDel = await issuesDb.query("DELETE FROM users WHERE user_id = $1", [user_id]);

        if(!userAndIssuesToDel.rowCount) {
            return res.status(404).json({ message: "Id não encontrado." });
        }

        res.status(200).json({ message: "Usuario removido com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default router;