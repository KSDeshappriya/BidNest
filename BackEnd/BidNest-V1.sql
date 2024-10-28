-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 28, 2024 at 11:50 AM
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
-- Database: `BidNest-V1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bids`
--

CREATE TABLE `Bids` (
  `Id` int(11) NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `BidTime` datetime(6) NOT NULL,
  `BidderId` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `IsHighest` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Bids`
--

INSERT INTO `Bids` (`Id`, `Amount`, `BidTime`, `BidderId`, `ItemId`, `IsHighest`) VALUES
(1, 25.000000000000000000000000000000, '2024-10-15 14:00:00.000000', 1, 1, 1),
(2, 160.000000000000000000000000000000, '2024-10-16 15:00:00.000000', 2, 2, 1),
(3, 310.000000000000000000000000000000, '2024-10-18 16:00:00.000000', 3, 3, 1),
(4, 80.000000000000000000000000000000, '2024-10-19 17:00:00.000000', 4, 4, 1),
(5, 55.000000000000000000000000000000, '2024-10-19 09:00:00.000000', 1, 5, 1),
(6, 210.000000000000000000000000000000, '2024-10-20 11:00:00.000000', 2, 6, 1),
(7, 110.000000000000000000000000000000, '2024-10-21 10:00:00.000000', 3, 7, 1),
(8, 160.000000000000000000000000000000, '2024-10-22 13:00:00.000000', 4, 8, 1),
(9, 125.000000000000000000000000000000, '2024-10-23 12:00:00.000000', 1, 9, 1),
(10, 85.000000000000000000000000000000, '2024-10-24 15:00:00.000000', 2, 10, 1),
(11, 65.000000000000000000000000000000, '2024-10-25 17:00:00.000000', 3, 11, 1),
(12, 45.000000000000000000000000000000, '2024-10-26 16:00:00.000000', 4, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Feedbacks`
--

CREATE TABLE `Feedbacks` (
  `Id` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `Comments` longtext NOT NULL,
  `DateGiven` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Feedbacks`
--

INSERT INTO `Feedbacks` (`Id`, `ItemId`, `UserId`, `Rating`, `Comments`, `DateGiven`) VALUES
(1, 1, 1, 5, 'Great e-book, very informative on AI topics.', '2024-10-18 17:00:00.000000'),
(2, 2, 2, 4, 'Useful software for graphic design.', '2024-10-20 18:00:00.000000'),
(3, 3, 3, 5, 'Beautiful digital art, worth every penny.', '2024-10-21 19:00:00.000000'),
(4, 4, 4, 4, 'Good quality music, perfect for my projects.', '2024-10-22 20:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `Id` int(11) NOT NULL,
  `Title` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `StartingPrice` decimal(65,30) NOT NULL,
  `StartTime` datetime(6) NOT NULL,
  `EndTime` datetime(6) NOT NULL,
  `IsAuctionLive` tinyint(1) NOT NULL,
  `SellerId` int(11) NOT NULL,
  `ImagePath` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`Id`, `Title`, `Description`, `StartingPrice`, `StartTime`, `EndTime`, `IsAuctionLive`, `SellerId`, `ImagePath`) VALUES
(1, 'E-Book on AI', 'A comprehensive e-book covering artificial intelligence concepts.', 20.000000000000000000000000000000, '2024-10-10 10:00:00.000000', '2024-10-20 10:00:00.000000', 0, 5, '/images/items/ebook.jpg'),
(2, 'Graphic Design Software License', 'Lifetime license for a professional graphic design tool.', 150.000000000000000000000000000000, '2024-10-12 12:00:00.000000', '2024-10-22 12:00:00.000000', 0, 5, '/images/items/software.jpg'),
(3, 'Digital Art Collection', 'Exclusive digital artwork collection by a renowned artist.', 300.000000000000000000000000000000, '2024-10-15 13:00:00.000000', '2024-10-25 13:00:00.000000', 0, 6, '/images/items/digital_art.jpg'),
(4, 'Premium Music Pack', 'A premium pack of royalty-free music for projects.', 75.000000000000000000000000000000, '2024-10-18 14:00:00.000000', '2024-10-19 17:00:00.000000', 0, 6, '/images/items/music_pack.jpg'),
(5, 'Stock Photo Bundle', 'High-resolution stock photos for commercial use.', 50.000000000000000000000000000000, '2024-10-18 08:00:00.000000', '2024-10-28 08:00:00.000000', 0, 5, '/images/items/stock_photo_bundle.jpg'),
(6, 'Virtual Reality Game', 'Access code to a virtual reality game set in a sci-fi universe.', 200.000000000000000000000000000000, '2024-10-19 10:00:00.000000', '2024-10-29 10:00:00.000000', 1, 6, '/images/items/vr_game.jpg'),
(7, 'Online Coding Course', 'Full access to an advanced online coding course on web development.', 100.000000000000000000000000000000, '2024-10-20 09:00:00.000000', '2024-10-30 09:00:00.000000', 1, 5, '/images/items/coding_course.jpg'),
(8, '3D Model Pack', 'Pack of high-quality 3D models for game development and animations.', 150.000000000000000000000000000000, '2024-10-21 12:00:00.000000', '2024-10-31 12:00:00.000000', 1, 6, '/images/items/3d_models.jpg'),
(9, 'Digital Marketing Toolkit', 'Comprehensive toolkit with templates, guides, and software for digital marketing.', 120.000000000000000000000000000000, '2024-10-22 11:00:00.000000', '2024-11-01 11:00:00.000000', 1, 5, '/images/items/marketing_toolkit.jpg'),
(10, 'E-Library Subscription', 'One-year subscription to a digital library with thousands of e-books.', 80.000000000000000000000000000000, '2024-10-23 14:00:00.000000', '2024-11-02 14:00:00.000000', 1, 6, '/images/items/elibrary.jpg'),
(11, 'Podcast Series', 'Exclusive access to a podcast series by industry experts.', 60.000000000000000000000000000000, '2024-10-24 16:00:00.000000', '2024-11-03 16:00:00.000000', 1, 5, '/images/items/podcast_series.jpg'),
(12, 'Digital Comic Collection', 'Collection of exclusive digital comics.', 40.000000000000000000000000000000, '2024-10-25 15:00:00.000000', '2024-11-04 15:00:00.000000', 1, 6, '/images/items/digital_comic.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `Id` int(11) NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `PaymentTime` datetime(6) NOT NULL,
  `PayerId` int(11) NOT NULL,
  `StripePaymentIntentId` varchar(255) DEFAULT NULL,
  `BidId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`Id`, `Amount`, `PaymentTime`, `PayerId`, `StripePaymentIntentId`, `BidId`) VALUES
(1, 25.000000000000000000000000000000, '2024-10-17 16:00:00.000000', 1, 'pi_1Hh4FeH8KXcX5z', 1),
(2, 160.000000000000000000000000000000, '2024-10-19 17:30:00.000000', 2, 'pi_1Hh4GeH8KXcX6y', 2),
(3, 310.000000000000000000000000000000, '2024-10-20 18:00:00.000000', 3, 'pi_1Hh4HeH8KXcX7z', 3),
(4, 80.000000000000000000000000000000, '2024-10-21 19:30:00.000000', 4, 'pi_1Hh4IeH8KXcX8a', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `Id` int(11) NOT NULL,
  `UserName` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `PasswordHash` longtext NOT NULL,
  `Role` longtext NOT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `ProfilePicturePath` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`Id`, `UserName`, `Email`, `PasswordHash`, `Role`, `PhoneNumber`, `Address`, `DateOfBirth`, `ProfilePicturePath`) VALUES
(1, 'John Doe', 'johndoe@example.com', '$2a$10$pxIB/k8a/oNXvYhrwIaaUO1f5glxS51hL6FY9.f19osVAcdc00PEa', 'Buyer', '1234567890', '123 Main St, Cityville', '1985-04-12', '/images/profiles/dp1.jpg'),
(2, 'Jane Smith', 'janesmith@example.com', '$2a$10$pxIB/k8a/oNXvYhrwIaaUO1f5glxS51hL6FY9.f19osVAcdc00PEa', 'Buyer', '0987654321', '456 Side St, Townsville', '1990-07-23', '/images/profiles/dp1.jpg'),
(3, 'Mike Johnson', 'mikejohnson@example.com', '$2a$10$pxIB/k8a/oNXvYhrwIaaUO1f5glxS51hL6FY9.f19osVAcdc00PEa', 'Buyer', '1122334455', '789 Broadway, Metropolis', '1988-01-15', '/images/profiles/dp1.jpg'),
(4, 'Emily Davis', 'emilydavis@example.com', '$2a$10$pxIB/k8a/oNXvYhrwIaaUO1f5glxS51hL6FY9.f19osVAcdc00PEa', 'Buyer', '6677889900', '321 Elm St, Countryside', '1992-10-30', '/images/profiles/dp1.jpg'),
(5, 'Anna Brown', 'annabrown@example.com', '$2a$10$pxIB/k8a/oNXvYhrwIaaUO1f5glxS51hL6FY9.f19osVAcdc00PEa', 'Seller', '5554443322', '654 Maple Rd, Smalltown', '1983-03-22', '/images/profiles/dp2.jpg'),
(6, 'Tom White', 'tomwhite@example.com', '$2a$10$pxIB/k8a/oNXvYhrwIaaUO1f5glxS51hL6FY9.f19osVAcdc00PEa', 'Seller', '4433221100', '987 Oak Dr, Bigcity', '1975-11-17', '/images/profiles/dp2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `__EFMigrationsHistory`
--

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__EFMigrationsHistory`
--

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
('20241017175514_InitialCreate', '8.0.8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bids`
--
ALTER TABLE `Bids`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Bids_BidderId` (`BidderId`),
  ADD KEY `IX_Bids_ItemId` (`ItemId`);

--
-- Indexes for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Feedbacks_ItemId` (`ItemId`),
  ADD KEY `IX_Feedbacks_UserId` (`UserId`);

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Items_SellerId` (`SellerId`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Payments_PayerId` (`PayerId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `__EFMigrationsHistory`
--
ALTER TABLE `__EFMigrationsHistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bids`
--
ALTER TABLE `Bids`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Bids`
--
ALTER TABLE `Bids`
  ADD CONSTRAINT `FK_Bids_Items_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `Items` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Bids_Users_BidderId` FOREIGN KEY (`BidderId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  ADD CONSTRAINT `FK_Feedbacks_Items_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `Items` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Feedbacks_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `FK_Items_Users_SellerId` FOREIGN KEY (`SellerId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `FK_Payments_Users_PayerId` FOREIGN KEY (`PayerId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
