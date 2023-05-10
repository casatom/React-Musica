-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 10, 2023 at 01:23 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `artistas`
--

INSERT INTO `artistas` (`id`, `nombre`, `descripcion`, `fechaAlta`, `rutaImagen`) VALUES
(13, 'Jimmy \"B-Rabbit\" Smith Jr.', 'Rapero blanco que lucha contra la discriminación racial.\r\n', '2023-04-23 23:11:14', 'aa0gf6fggsv1yh36vfqz'),
(14, 'Junior Toots', 'Cantante de reggae y activista por la paz.', '2023-04-23 23:16:20', 'u3pj8v56eoebpfarcvsm'),
(16, 'Steel Dragon', 'Banda de glam metal con un cantante de aspecto femenino.', '2023-04-24 02:38:31', 'l2yku5mpccw06kv8xlap'),
(19, 'Del Paxton', 'Músico de jazz legendario y mentor', '2023-04-25 00:17:20', 't2x713xoqzb4ibrpklgk'),
(20, 'Spinal Tap', 'Banda de rock inglesa con estilo extravagante y humor absurdo', '2023-04-26 04:35:52', 'urtsfxg1di9v4ax1iopl');

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
  `rutaAudio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artista_cancion` (`artistaId`),
  KEY `genero_cancion` (`generoId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `canciones`
--

INSERT INTO `canciones` (`id`, `nombre`, `fechaAlta`, `rutaImagen`, `descripcion`, `artistaId`, `generoId`, `rutaAudio`) VALUES
(10, 'Tonight I\'m Gonna Rock You Tonight', '2023-04-27 03:07:43', 'oigpjzbbtofwecaaf53h', 'Una canción de rock con riffs pesados y letras que hablan sobre el poder del rock.', 20, 36, NULL),
(11, 'Seek Your Truth', '2023-04-27 03:08:34', 'ssbkuxf32osy5lich3zc', 'Una canción de reggae que habla sobre la búsqueda de la verdad y la justicia.', 14, 38, 'wxafip3tmcvrxn45qyfc'),
(12, 'That Thing You Do!', '2023-04-27 03:09:19', 'ixlh3fwts11tt28ojop9', 'Una canción de jazz energética y divertida que se convierte en un éxito pop.', 19, 40, 'yf8nd5ul3cz9wtgh0hty'),
(13, 'Lose Yourself', '2023-04-27 03:10:05', 'klqhibbwq5qa3q5ylr1f', 'Una canción de rap intensa y emocional que habla sobre la lucha contra las adversidades.', 13, 39, 'l7claetopgwoyoyqct4a');

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `generos`
--

INSERT INTO `generos` (`id`, `nombre`, `descripcion`, `fechaAlta`, `rutaImagen`) VALUES
(36, 'Rock', 'El rock es un género musical que se originó en la década de 1950 en los Estados Unidos y que se ha expandido a nivel mundial desde entonces. El rock se caracteriza por su uso de instrumentos eléctricos como la guitarra, el bajo y la batería, así como por sus fuertes y distintivas líneas melódicas y riffs de guitarra.', '2023-04-27 02:52:09', 'q1u3j9fzmbal4ddo7a73'),
(37, 'Metal', 'El metal es un género musical que se desarrolló en la década de 1970 a partir del hard rock y el blues rock. Se caracteriza por su uso de guitarras eléctricas distorsionadas, ritmos pesados y rápidos, voces potentes y enérgicas, y a menudo se enfoca en temas oscuros, como la muerte, la guerra y la sociedad en general.', '2023-04-27 02:52:46', 'mgqgp1cukt67cztxpgoo'),
(38, 'Reggea', 'El reggae es un género musical originario de Jamaica, que se desarrolló en la década de 1960 y se hizo popular en todo el mundo en la década de 1970. Se caracteriza por sus ritmos sincopados, bajos profundos y redondos, y su uso de instrumentos como la guitarra, el teclado y la batería.', '2023-04-27 02:53:35', 'mdqlatl2olivxrzclwg9'),
(39, 'Hip-Hop', 'El hip hop es un género musical y cultural que se originó en la década de 1970 en el sur del Bronx, Nueva York. Se caracteriza por su uso de ritmos y samples basados en loops, así como por el uso de rimas habladas o cantadas, que se combinan con los beats para crear una forma de expresión única.', '2023-04-27 02:55:01', 'o8ggytajyynhcjdim20u'),
(40, 'Jazz', 'El jazz es un género musical que se originó en los Estados Unidos a finales del siglo XIX y principios del XX, y es considerado una de las formas de música más importantes e influyentes del mundo. El jazz se caracteriza por su improvisación, ritmos complejos y una combinación de influencias de diversas culturas, como la africana, la europea y la caribeña', '2023-04-27 02:56:20', 'u36kkjwpstcoydhjcdhy');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `mails`
--

INSERT INTO `mails` (`id`, `nombre`, `texto`, `emailEmisor`, `fechaAlta`) VALUES
(1, 'Tomas', 'prueba', 'tomas.casa123@gmail.com', '2023-04-22 17:04:45'),
(2, 'Tomas', 'hola', 'tomas.casa123@gmail.com', '2023-04-22 17:21:44'),
(3, 'Tomas', 'pruebaaaa', 'tomas.casa123@gmail.com', '2023-04-22 18:26:29'),
(4, 'Nico', 'Hola mando un mail', 'nico@hotmail.com', '2023-04-22 18:30:42'),
(5, 'Tomas', 'prueba', 'tomas.casa123@gmail.com', '2023-05-01 01:44:31'),
(6, 'Tomas', 'gradfsa', 'tomas.casa123@gmail.com', '2023-05-01 01:45:00');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `isAdmin`, `fechaAlta`, `fechaUltimoAcesso`) VALUES
(1, 'tomas', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2023-04-21 02:50:10', '2023-04-21 02:50:10'),
(2, 'flavia', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2023-04-21 02:50:10', '2023-04-21 02:50:10'),
(3, 'prueba', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2023-04-21 02:50:10', '2023-04-21 02:50:10'),
(4, 'prueba2', 'b0d9d612ac4f24c80b4a774baea37eed', 0, '2023-04-21 03:24:38', '2023-04-21 03:24:38');

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
