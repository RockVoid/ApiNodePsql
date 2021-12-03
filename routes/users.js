import { express } from "express";

import {
    getUsers,
    getUsersIssues,
    postUsers,
    updateUser,
    deleteUser
} from "../controllers/users";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersIssues);
router.post("/", postUsers);
router.put("/:id/:id", updateUser)
router.delete("/:id", deleteUser);

export default router;