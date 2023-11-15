CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE Yarns (
    yarn_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    brand VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    weight VARCHAR(20),
    quantity INT,
    notes TEXT,
    date_added TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Projects (
    project_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    project_name VARCHAR(100) NOT NULL,
    project_type VARCHAR(20),
    start_date DATE,
    end_date DATE,
    project_notes TEXT
);

CREATE TABLE Inventory (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    name VARCHAR(255),
    quantity INT
);

CREATE TABLE Progress (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    description TEXT,
    date_completed DATE
);
