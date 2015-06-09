CREATE DATABASE i4capps;
USE i4capps;
CREATE TABLE `user info`(
    `user id` char(50) NOT NULL,
	`last name` char(50) NOT NULL,
    `first names` char(50) NOT NULL,
    `company or organization` char(50),
    email char(50) NOT NULL,
    `contact number` char(50),
    `selected charity` char(50),
    PRIMARY KEY (`user id`)
    );
    
CREATE TABLE charity_info(
    `name of charity` char(50) primary key not null,
    `year established` int not null,
    `avg government grants` DOUBLE,
    `avg donations` DOUBLE,
    `avg fundraising` DOUBLE,
    `avg finance revenue` DOUBLE,
    `avg contribution towards appeals granted` DOUBLE,
    `avg other income` DOUBLE,
    `avg employee benefits` DOUBLE,
    `avg depreciation` DOUBLE,
    `avg other expense` DOUBLE,
    `avg comprehensive income` DOUBLE,
    `avg KPI_A` DOUBLE,
    `avg KPI_B` DOUBLE,
    `avg y2y growth` DOUBLE,
    `charity category` char(50) NOT NULL
    );

CREATE DATABASE charity_list;
USE charity_list;

CREATE TABLE yots(
   `name of charity` char(50),
   sector char(50),
   `year established` int,
   `staff number` int,
   `financial year` DOUBLE primary key NOT NULL,
   `government grants` DOUBLE,
   donations DOUBLE,
   fundraising DOUBLE,
   `finance revenue` DOUBLE,
   `contribution towards appeals granted` DOUBLE,
   `other income` DOUBLE,
   `employee benefits` DOUBLE,
   depreciation DOUBLE,
   `other expense` DOUBLE,
   `comprehensive income` DOUBLE,
   KPI_A DOUBLE,
   KPI_B DOUBLE,
   `y2y growth` DOUBLE,
   `user votes` int
   );

INSERT INTO yots (`name of charity`, sector,`year established`,`staff number`,`financial year`,
`government grants`,donations,fundraising, `finance revenue`,`other income`,`employee benefits`, 
depreciation,`other expense`,`comprehensive income`,KPI_A, KPI_B, `y2y growth`)
VALUES ("youth off the street", "education", 1991, 200, 2014, 8101, 7868, 1566, 456, 512, -13215, -1132,
 -5758, -1600, 1.400151343, 0.9203183288, -52.38095238);
INSERT INTO yots (`financial year`,`government grants`,donations,fundraising,`finance revenue`,
`other income`,`employee benefits`,depreciation,`other expense`,`comprehensive income`,KPI_A,KPI_B,`y2y growth`)
VALUES (2013, 7930, 6941, 1657, 688, 102, -12732, -895, -4783, -1050, 1.360194785, 0.9406844106, -121.1907164);
INSERT INTO yots (`financial year`,`government grants`,donations,fundraising,`finance revenue`,
`other income`,`employee benefits`,depreciation,`other expense`,`comprehensive income`,KPI_A,KPI_B,`y2y growth`)
VALUES (2012, 8740, 10842, 1958, 641, 263, -11890, -631, -4968, 4955, 1.887636669, 1.283320945, -23.24969021);
INSERT INTO yots (`financial year`,`government grants`,donations,fundraising,`finance revenue`,
`other income`,`employee benefits`,depreciation,`other expense`,`comprehensive income`,KPI_A,KPI_B,`y2y growth`)
VALUES (2011, 8093, 11909, 2010, 456, 271, -11031, -458, -4794, 6456, 2.061372496, 1.396487134, 3.395259449);
INSERT INTO yots (`financial year`,`government grants`,donations,fundraising,`finance revenue`,
`other income`,`employee benefits`,depreciation,`other expense`,`comprehensive income`,KPI_A,KPI_B,`y2y growth`)
VALUES (2010, 7168, 12044, 1884, 225, 8, -10299, -408, -4378, 6244, 2.070977765, 1.413921114, 532.6241135);

USE i4capps;

CREATE TEMPORARY TABLE temptable(
    `avg government grants` DOUBLE,
    `avg donations` DOUBLE,
    `avg fundraising` DOUBLE,
    `avg finance revenue` DOUBLE,
    `avg contribution towards appeals granted` DOUBLE,
    `avg other income` DOUBLE,
    `avg employee benefits` DOUBLE,
    `avg depreciation` DOUBLE,
    `avg other expense` DOUBLE,
    `avg comprehensive income` DOUBLE,
    `avg KPI_A` DOUBLE,
    `avg KPI_B` DOUBLE,
    `avg y2y growth` DOUBLE
    );
    
INSERT INTO temptable(`avg government grants`,`avg donations`,`avg fundraising`,`avg finance revenue`,
`avg other income`,`avg employee benefits`,`avg depreciation`,`avg other expense`,`avg comprehensive income`,
`avg KPI_A`,`avg KPI_B`,`avg y2y growth`)
SELECT avg(`government grants`),avg(donations),avg(fundraising),avg(`finance revenue`),avg(`other income`),
avg(`employee benefits`),avg(depreciation),avg(`other expense`),avg(`comprehensive income`),avg(KPI_A),
avg(KPI_B),avg(`y2y growth`)
FROM charity_list.yots;

INSERT INTO charity_info (`name of charity`, `year established`, `avg government grants`,`avg donations`,
`avg fundraising`,`avg finance revenue`,`avg other income`,`avg employee benefits`,`avg depreciation`,
`avg other expense`,`avg comprehensive income`,`avg KPI_A`,`avg KPI_B`,`avg y2y growth`,`charity category`)
SELECT `name of charity`, avg(`year established`), avg(`government grants`),avg(donations),avg(fundraising),
avg(`finance revenue`),avg(`other income`),avg(`employee benefits`),avg(depreciation),avg(`other expense`),
avg(`comprehensive income`),avg(KPI_A),avg(KPI_B),avg(`y2y growth`),sector
FROM charity_list.yots, temptable
WHERE sector LIKE 'education';
    
DROP TABLE temptable;
