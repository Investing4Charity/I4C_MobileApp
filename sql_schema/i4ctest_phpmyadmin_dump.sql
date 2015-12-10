-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2015 at 05:54 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `i4ctest`
--

-- --------------------------------------------------------

--
-- Table structure for table `charity_list`
--

CREATE TABLE IF NOT EXISTS `charity_list` (
  `Sector` varchar(18) NOT NULL,
  `Name_of_charity` varchar(50) NOT NULL,
  `Financial_year` int(11) NOT NULL,
  `Gov_Grants` varchar(7) NOT NULL,
  `Fundrasing_income` varchar(7) NOT NULL,
  `total_revenues` varchar(8) NOT NULL,
  `Cost_of_fundraising` varchar(8) NOT NULL,
  `Employee_Benefits_Exp` varchar(8) NOT NULL,
  `Administration_Exp` varchar(7) NOT NULL,
  `CAPEX` varchar(7) NOT NULL,
  `total_Expense` varchar(8) NOT NULL,
  `Net_Income` varchar(6) NOT NULL,
  `KPI_A_employee_benefittotal_revenues` decimal(4,2) DEFAULT NULL,
  `KPI_Bcost_of_fundraisingfundraising_income` varchar(4) NOT NULL,
  `KPI_C_admin_costtotal_revenues` varchar(4) DEFAULT NULL,
  `KPI_D_professional_service_costtotal_cost` varchar(4) DEFAULT NULL,
  `KPI_E_CAPEXTotal_Revenue` decimal(5,3) DEFAULT NULL,
  `net_income_growth` varchar(8) NOT NULL,
  `gov_funding_growth_` varchar(4) DEFAULT NULL,
  `vote_count` varchar(1) DEFAULT NULL,
  `logo` longblob,
  PRIMARY KEY (`Name_of_charity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `charity_list`
--

INSERT INTO `charity_list` (`Sector`, `Name_of_charity`, `Financial_year`, `Gov_Grants`, `Fundrasing_income`, `total_revenues`, `Cost_of_fundraising`, `Employee_Benefits_Exp`, `Administration_Exp`, `CAPEX`, `total_Expense`, `Net_Income`, `KPI_A_employee_benefittotal_revenues`, `KPI_Bcost_of_fundraisingfundraising_income`, `KPI_C_admin_costtotal_revenues`, `KPI_D_professional_service_costtotal_cost`, `KPI_E_CAPEXTotal_Revenue`, `net_income_growth`, `gov_funding_growth_`, `vote_count`, `logo`) VALUES
('Children and Youth', 'Childhood Fundation', 2014, '-', '$4,466', '$10,851', '-$1,821', '-$6,435', '-$1,558', '$0', '-$10,851', '$0.63', '0.59', '0.41', '0.14', NULL, '0.000', '-99.73%', NULL, NULL, NULL),
('Children and Youth', 'Half The Sky', 2014, '-', '$892', '$893', '-$7', '-', '-', '-', '-$184', '$707', NULL, '0.01', NULL, NULL, NULL, '1604.26%', NULL, NULL, NULL),
('Children and Youth', 'Marist Youth Care', 2014, '$17,300', '-', '$34,884', '-', '-$23,871', '-', '-$1,820', '-$33,311', '$2,488', '0.68', '-', '-', '-', '0.050', '26%', '-15%', NULL, NULL),
('Children and Youth', 'Reachout Inspire Foundation', 2014, '$3,550', '$1,848', '$5,595', '-$201', '-$2,625', '-$248', '-$24', '-$5,450', '$144', '0.47', '0.11', '0.04', '0.96', '0.075', '-62%', '27%', NULL, NULL),
('Children and Youth', 'The smith family', 2014, '$26,138', '$78,370', '$100,847', '-$13,032', '-$39,142', '-', '-$147', '-$98,685', '$3,004', '0.39', '0.17', NULL, NULL, '0.004', '120%', '7%', NULL, NULL),
('Children and Youth', 'Tweddle Child and Family Health Service', 2014, '$4,180', '-', '$4,623', '-', '-$3,622', '-', '-$1,444', '-$4,728', '$1,572', '0.78', '-', '-', '-', '0.091', '349%', '2%', NULL, NULL),
('Children and Youth', 'Varity', 2014, '-', '$8,960', '$9,959', '-$4,624', '-$457', '-$1,451', '-$101', '-$4,846', '$488', '0.05', '0.52', '0.15', NULL, '0.010', '-54%', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `email`, `password`, `username`) VALUES
('Fadel Tommay', 'Fadel@test.com', 'Hello', 'Fadel'),
('test test', 'test@gmail.com', 'Password', 'testing');

-- --------------------------------------------------------

--
-- Table structure for table `user_votes`
--

CREATE TABLE IF NOT EXISTS `user_votes` (
  `user` varchar(50) NOT NULL,
  `charity` varchar(50) NOT NULL,
  PRIMARY KEY (`user`,`charity`),
  KEY `charity` (`charity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_votes`
--

INSERT INTO `user_votes` (`user`, `charity`) VALUES
('Fadel', 'Childhood Fundation'),
('testing', 'Childhood Fundation'),
('Fadel', 'Half The Sky'),
('testing', 'Marist Youth Care'),
('testing', 'Varity');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_votes`
--
ALTER TABLE `user_votes`
  ADD CONSTRAINT `user_votes_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `user_votes_ibfk_2` FOREIGN KEY (`charity`) REFERENCES `charity_list` (`Name_of_charity`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
