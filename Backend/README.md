1. Install Postgres

2. Run the below command to login to postgres environment:
   `psql -U postgres`

3. Run the following script to setup the local database:

```
CREATE USER smartbudget WITH PASSWORD 'smartbudget';

CREATE DATABASE smart_budget;

GRANT ALL PRIVILEGES ON DATABASE smart_budget TO smartbudget;

CREATE TABLE profiles (
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE
);
```
