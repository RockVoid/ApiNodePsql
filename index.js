import cors from "cors";
import express from "express";

import todosRoutes from "./routes/todos.js";
import usersRoutes from "./routes/users.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/issues", todosRoutes);
app.use("/users", usersRoutes);

app.listen(3001, () => console.log(`Servidor iniciado na porta ${PORT}`));