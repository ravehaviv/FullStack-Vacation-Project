-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2024 at 12:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vecations_project`
--
CREATE DATABASE IF NOT EXISTS `vecations_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vecations_project`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `vecation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`user_id`, `vecation_id`) VALUES
(34, 7),
(34, 3),
(36, 2),
(36, 3),
(36, 7),
(34, 1),
(37, 2),
(37, 1),
(34, 2),
(34, 23),
(34, 28),
(34, 29),
(34, 27);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(514) NOT NULL,
  `userRole` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `password`, `userRole`) VALUES
(34, 'Rave', 'Haviv', 'Rave', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'user'),
(35, 'Rave', 'Haviv', 'RaveAdmin', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'admin'),
(36, 'mayan', 'sapir', 'mayan', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'user'),
(37, 'aviv', 'haviv', 'Aviv', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `startDate` varchar(14) DEFAULT NULL,
  `endDate` varchar(14) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `photoName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `description`, `startDate`, `endDate`, `price`, `photoName`) VALUES
(1, 'Hawaii', 'Experience the beauty of the ', '2024-06-01', '2024-06-12', 3003, 'a2f2d122-776b-414b-bec9-3ad46da32498.jpg'),
(2, 'Paris', 'Explore the romantic streets of Paris, visit iconic landmarks, and indulge in delicious cuisine.', '2024-07-15', '2024-07-25', 3500, '2e33759d-96d4-49c3-870d-e9b5bc386c9e.jpg'),
(3, 'Bali', 'Relax on the stunning beaches of Bali, enjoy vibrant culture, and experience serene landscapes.', '2024-08-05', '2024-08-15', 3000, '4603eb78-7e99-4f6c-bd31-f8eb1037f425.jpg'),
(7, 'Sydney', 'Experience the vibrant culture of Sydney, explore beautiful beaches, and encounter unique wildlife.', '2024-12-01', '2024-12-10', 2900, 'a016d54c-657b-4e76-af98-731e4561ea0a.jpg'),
(8, 'Marrakech', 'Immerse yourself in the exotic charm of Marrakech, explore bustling souks, and enjoy traditional Moroccan cuisine.', '2025-01-05', '2025-01-15', 3400, '6c494ff2-0e29-4bd0-a02a-3c18db9bcd93.jpg'),
(23, 'Japan', 'We Have Sushi', '2024-06-05', '2024-06-28', 5000, 'a9ad782e-6e31-4840-b038-c8b5f7a79d9e.jpg'),
(24, 'Israel', 'Israel is a small but vibrant country in the Middle East, known for its rich history and cultural diversity. It is a significant religious center for Judaism, Christianity, and Islam, with landmarks like Jerusalem and Tel Aviv. Israel boasts technological innovation, beautiful landscapes, and a dynamic society blending ancient traditions with modern life', '2024-05-31', '2024-07-06', 5000, 'c805813a-2550-4974-b56d-3c7b8b822980.jpg'),
(26, 'Thailand', 'Thailand, a Southeast Asian country known for its tropical beaches, opulent royal palaces, ancient ruins, and ornate temples, has a rich cultural heritage. Its vibrant capital, Bangkok, offers bustling markets, street food, and a lively nightlife.', '2024-05-30', '2024-07-03', 4500, 'ffdd2d1f-36d3-488b-8049-99ad75529ac8.jpg'),
(27, 'Taiwan', 'Taiwan, an East Asian island nation, boasts modern cities, traditional Chinese temples, hot springs, and mountainous terrain. Taipei, its capital, is famous for Taipei 101, bustling night markets, and vibrant culture. Taiwan is renowned for its technological prowess and rich history.', '2024-05-30', '2024-07-05', 3500, '0293fa1c-4262-4117-9f35-b5c1bf5d2525.jpg'),
(28, 'USA', 'The USA, a vast North American nation, is known for its diverse landscapes, cultural melting pot, and significant global influence. Iconic cities like New York, Los Angeles, and Washington D.C. offer varied experiences, from skyscrapers to historic monuments. The USA is renowned for its innovation, entertainment industry, and democratic values.', '2024-06-21', '2024-07-05', 8000, '43fee668-6f63-4239-84a1-790d02a665b4.jpg'),
(29, 'Mexico', ' Mexico, a vibrant North American country, is celebrated for its rich cultural heritage, diverse landscapes, and delicious cuisine. From ancient ruins like Chichen Itza to bustling cities like Mexico City, it offers a mix of history and modernity. Mexico\'s beaches, festivals, and arts scene are world-renowned.', '2024-06-01', '2024-06-30', 1500, '5c31f0d9-7e7e-4cc5-8dfc-e025cba54ba9.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vecation_id` (`vecation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vecation_id`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
