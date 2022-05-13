DROP TABLE IF EXISTS employee;
-- employees table
CREATE TABLE employee
(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email TEXT,
    leviathanID TEXT,
    telephone TEXT NOT NULL,
    role TEXT NOT NULL
);
