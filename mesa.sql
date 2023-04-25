-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2023 at 05:20 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mesa`
--
CREATE DATABASE IF NOT EXISTS `mesa` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `mesa`;

-- --------------------------------------------------------

--
-- Table structure for table `artistas`
--

DROP TABLE IF EXISTS `artistas`;
CREATE TABLE IF NOT EXISTS `artistas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fechaAlta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rutaImagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `canciones`
--

DROP TABLE IF EXISTS `canciones`;
CREATE TABLE IF NOT EXISTS `canciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaAlta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rutaImagen` varchar(255) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `artistaId` int DEFAULT NULL,
  `generoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artista_cancion` (`artistaId`),
  KEY `genero_cancion` (`generoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
CREATE TABLE IF NOT EXISTS `generos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fechaAlta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rutaImagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `mails`
--

DROP TABLE IF EXISTS `mails`;
CREATE TABLE IF NOT EXISTS `mails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `texto` text NOT NULL,
  `emailEmisor` varchar(255) NOT NULL,
  `fechaAlta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` int NOT NULL DEFAULT '0',
  `fechaAlta` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechaUltimoAcesso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `artista_cancion` FOREIGN KEY (`artistaId`) REFERENCES `artistas` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `genero_cancion` FOREIGN KEY (`generoId`) REFERENCES `generos` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
