CREATE DATABASE i4capps;
USE i4capps;
CREATE TABLE user_info(
    id CHAR(50) NOT NULL,
    last CHAR(50) NOT NULL,
    firsts CHAR(50) NOT NULL,
    org CHAR(50),
    email CHAR(50) NOT NULL,
    contacts CHAR(50),
    selection CHAR(50),
    PRIMARY KEY (id)
    );
    
CREATE TABLE charity_info(
    name CHAR(50) primary key NOT NULL,
    avg_grants DOUBLE,
    avg_total_incomes DOUBLE,
    avg_salary DOUBLE,
    avg_expense DOUBLE,
    avg_net_income DOUBLE,
    avg_kpia DOUBLE,
    avg_kpib DOUBLE,
    avg_income_growth DOUBLE,
    avg_grants_growth DOUBLE,
    sector CHAR(50) NOT NULL
    );

CREATE DATABASE charities;
USE charities;

CREATE TABLE villa_maria(
   name CHAR(50),
   sector CHAR(50),
   fy DOUBLE primary key NOT NULL,
   grants DOUBLE,
   total_incomes DOUBLE,
   salary DOUBLE,
   expense DOUBLE,
   net_income DOUBLE,
   kpia DOUBLE,
   kpib DOUBLE,
   income_growth DOUBLE,
   grants_growth DOUBLE,
   votes int
   );

INSERT INTO villa_maria (name, sector, fy, grants, total_incomes, salary, expense, net_income, kpia, kpib, income_growth, grants_growth)
VALUES ("villa maria", "elder", 2014, 64049, 78005, -53018, -74988, 3017, 0.68, 0.96, 18, 11);
INSERT INTO villa_maria (fy, grants, total_incomes, salary, expense, net_income, kpia, kpib, income_growth, grants_growth)
VALUES (2013, 57459, 68477, -47058, -65915, 2562, 0.69, 0.96, -68, 6);
INSERT INTO villa_maria (fy, grants, total_incomes, salary, expense, net_income, kpia, kpib, income_growth, grants_growth)
VALUES (2012, 54241, 62886, -39935, -54974, 7912, 0.64, 0.87, 828, 11);
INSERT INTO villa_maria (fy, grants, total_incomes, salary, expense, net_income, kpia, kpib, income_growth, grants_growth)
VALUES (2011, 48741, 57248, -37529, -58335, -1087, 0.66, 1.02, -391, 2);
INSERT INTO villa_maria (fy, grants, total_incomes, salary, expense, net_income, kpia, kpib)
VALUES (2010, 47751, 57662, -36364, -57288, 374, 0.63, 0.99);

USE i4capps;

CREATE TEMPORARY TABLE temptable(
    avg_grants DOUBLE,
    avg_total_incomes DOUBLE,
    avg_salary DOUBLE,
    avg_expense DOUBLE,
    avg_net_income DOUBLE,
    avg_kpia DOUBLE,
    avg_kpib DOUBLE,
    avg_income_growth DOUBLE,
    avg_grants_growth DOUBLE
    );

INSERT INTO temptable(avg_grants,avg_total_incomes,avg_salary,avg_expense,
avg_net_income,avg_kpia,avg_kpib,avg_income_growth,avg_grants_growth)
SELECT avg(grants),avg(total_incomes),avg(salary),avg(expense),avg(net_income),
avg(kpia),avg(kpib),avg(income_growth),avg(grants_growth)
FROM charities.villa_maria;

INSERT INTO charity_info (name, avg_grants, avg_total_incomes, avg_salary, avg_expense, avg_net_income, 
  avg_kpia, avg_kpib, avg_income_growth, avg_grants_growth, sector)
SELECT name, avg_grants,avg_total_incomes,avg_salary,avg_expense,
avg_net_income,avg_kpia,avg_kpib,avg_income_growth,avg_grants_growth, sector
FROM charities.villa_maria, temptable
WHERE sector LIKE 'elder';

DROP TABLE temptable;
