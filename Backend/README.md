1. Install Postgres

2. Run the below command to login to postgres environment:
   `psql -U postgres`

3. Run the following script to setup the local database:

```
CREATE USER smartbudget WITH PASSWORD 'smartbudget';

CREATE DATABASE smart_budget;

GRANT ALL PRIVILEGES ON DATABASE smart_budget TO smartbudget;

DROP TABLE IF EXISTS profiles;

CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE
);


CREATE TABLE IF NOT EXISTS incomes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  category VARCHAR(50),
  amount DECIMAL(10, 2) NOT NULL,
  date_added DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);


CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  category VARCHAR(50),
  amount DECIMAL(10, 2) NOT NULL,
  date_added DATE NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

```
