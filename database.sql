CREATE DATABASE aspectest;

CREATE TABLE issues(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    todo boolean,
    doing boolean,
    done boolean
);