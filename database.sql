CREATE DATABASE aspectest;

CREATE TABLE issues(
    issue_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    todo boolean,
    doing boolean,
    done boolean
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE issue_has_user(
    user_id INT NOT NULL,
    issue_id INT NOT NULL
);
