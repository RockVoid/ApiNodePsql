import pkg from "pg";

const { Pool } = pkg;

export const issuesDb = new Pool({
    user: "homestead",
    password: "secret",
    host: "127.0.0.1",
    port: "54320",
    database: "aspectest",
});