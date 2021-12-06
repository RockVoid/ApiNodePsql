import { Router } from "express";
import {
    getUsers,
    getUserById,
    getUserIssues,
    postUsers,
    updateUser,
    deleteUser
} from "../controllers/users.js";

const router = Router();

router.get("/", getUsers);
router.get("/:user_id", getUserById);
router.get("/issues/:user_id", getUserIssues);
router.post("/", postUsers);
router.put("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);

export default router;