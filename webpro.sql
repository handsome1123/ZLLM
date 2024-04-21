-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2024 at 06:17 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webpro`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(5) NOT NULL,
  `room_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `date` datetime NOT NULL,
  `time` int(4) NOT NULL,
  `status` int(3) NOT NULL,
  `description` varchar(50) NOT NULL,
  `lecturer_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(5) NOT NULL,
  `room_name` varchar(20) NOT NULL,
  `room_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `room_name`, `room_type`) VALUES
(1, 'Room1', 'room1'),
(2, 'Room2', 'room2'),
(3, 'Room3', 'room3');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `time` varchar(50) NOT NULL,
  `status` enum('free','pending','reserved','disabled') NOT NULL DEFAULT 'free',
  `room_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `time`, `status`, `room_id`) VALUES
(1, '08:00-10:00', 'pending', 1),
(2, '10:00-12:00', 'free', 1),
(3, '13:00-15:00', 'reserved', 1),
(4, '15:00-17:00', 'disabled', 1),
(5, '08:00-10:00', 'free', 2),
(6, '10:00-12:00', 'free', 2),
(7, '13:00-15:00', 'free', 2),
(8, '15:00-17:00', 'free', 2),
(9, '08:00-10:00', 'free', 3),
(10, '10:00-12:00', 'free', 3),
(11, '13:00-15:00', 'free', 3),
(12, '15:00-17:00', 'free', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(5) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `lecturer_id` (`lecturer_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5` (`room_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`lecturer_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
