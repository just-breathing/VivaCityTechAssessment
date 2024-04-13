CREATE DATABASE "applicantsInfo";
\c "applicantsInfo";


CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE ,
    email VARCHAR(100) NOT NULL UNIQUE,
    age NUMERIC(3),
    linkedINProfile VARCHAR(150) UNIQUE,
    GithubProfile VARCHAR(150) UNIQUE
);


INSERT INTO applicants (username, email, age,linkedINProfile,GithubProfile)
VALUES
    ('Sundeep','sundeep.reddy.n.2000@gmail.com',23,'https://www.linkedin.com/in/sundeep-reddy-nallamilli-270a0119b/','https://github.com/just-breathing');

\c "postgres";
