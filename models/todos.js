import pkg from "pg";

const { Pool } = pkg;

export const issuesDb = new Pool({
    user: "postgres",
    password: "PLqueste3",
    host: "localhost",
    port: "5432",
    database: "aspectest",
});