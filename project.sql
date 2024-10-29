-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `player_id` int NOT NULL AUTO_INCREMENT,
  `player_last_name` varchar(50) NOT NULL,
  `player_first_name` varchar(50) NOT NULL,
  `player_acc` varchar(50) NOT NULL,
  `player_psw` varchar(50) NOT NULL,
  `player_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (63,'a','a','project','12345678',NULL),(64,'111','11111','projectAJDHKF','12345678FJAD;LADJKFL;',NULL),(65,'dd','d','dddd','aaa',NULL),(66,'a','a','aaaaefaa','dffdfe',NULL),(67,'a','aa','projectaaaaaaadd','12345678adfa',NULL),(68,'afd','af','projectddddddddddd','12345678ddddddddd',NULL),(69,'aaa','aaa','projectadfdfdfadf','12345678aadfadfa',NULL),(70,'aaaa','aaaaaaaa','projectaaa','12345678',NULL),(71,'aaaa','aaaaa','projectaaaaaaaaaaaaaaaaaaaaaa','12345678aaa',NULL),(72,'aaaa','aaaaa','projectaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaa',NULL),(73,'a','a','projectaaa22','12345678aaaa',NULL),(74,'aaaaaa','aa','project454545','12345678',NULL),(75,'aaa','a','project232323','12345678',NULL),(76,'aaa','aaa','md6projectafaaaaaaaaaaaaad','12345678adfadfaf',NULL),(77,'aaaaaaaaaaa','asfda','md6projectfffffffffffff','12345678afadfa',NULL),(78,'aa','aa','md5(project34253333)','adadafdaf',NULL),(79,'a','a','1673448ee7064c989d02579c534f6b66','project4545544',NULL),(80,'z','zz','1673448ee7064c989d02579c534f6b66','project2344444444444444443114',NULL),(81,'a','aa','5b1b543af19ad4df09f863dce0c1ac63','12345678244532',NULL),(82,'aaaaaaaaaa','aaaaaaaaaaa','projectaffdaf','9d379f2ff11aed77139146a8badd5381',NULL),(83,'aaaaa','aaaaa','aaa111','eabd8ce9404507aa8c22714d3f5eada9',NULL),(84,'huang','wei','lewishoung3','25d55ad283aa400af464c76d713c07ad',NULL),(85,'a','a','lewishoung3fsd','10629e2859403ef2d9f4117a0700d9e8',NULL),(86,'a','a','lewisaahoung3','e10adc3949ba59abbe56e057f20f883e',NULL),(87,'sss','sssss','aaaa','594f803b380a41396ed63dca39503542',NULL),(88,'s','s','aaaaaa','aaa',NULL),(89,'aaaaaa','aaaaaa','12345678','1bbd886460827015e5d605ed44252251',NULL),(90,'lewis','huang','lewishoung','25d55ad283aa400af464c76d713c07ad','lewishoung3@gmail.com'),(91,'huang','wei','wei','25d55ad283aa400af464c76d713c07ad',NULL),(92,'aaaa','aaa','qqqqq','437599f1ea3514f8969f161a6606ce18',NULL),(93,'1','1','test1','5a105e8b9d40e1329780d62ea2265d8a',NULL),(94,'2','2','test2','ad0234829205b9033196ba818f7a872b',NULL),(95,'3','3','test3','8ad8757baa8564dc136c1e07507f4a98',NULL),(96,'4','4','test4','86985e105f79b95d6bc918fb45ec7727',NULL),(97,'5','5','test5','e3d704f3542b44a621ebed70dc0efe13',NULL),(98,'6','6','test6','4cfad7076129962ee70c36839a1e3e15',NULL),(99,'陳','阿土伯','toto@yahoo.com','25d55ad283aa400af464c76d713c07ad',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `average_age`
--

DROP TABLE IF EXISTS `average_age`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `average_age` (
  `player_id` int NOT NULL,
  `jump_pack` int NOT NULL DEFAULT '0',
  `deep_squat` int NOT NULL DEFAULT '0',
  `left_ankle_left_knee` int NOT NULL DEFAULT '0',
  `sidebend` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`player_id`),
  CONSTRAINT `average_age_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `account` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `average_age`
--

LOCK TABLES `average_age` WRITE;
/*!40000 ALTER TABLE `average_age` DISABLE KEYS */;
/*!40000 ALTER TABLE `average_age` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `player_id` int NOT NULL,
  `dino` int DEFAULT NULL,
  `eat_star` int DEFAULT NULL,
  `aerobics` int DEFAULT NULL,
  `snake` int DEFAULT NULL,
  KEY `player_id` (`player_id`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `account` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (91,367,NULL,NULL,NULL);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marathon_aerobics`
--

DROP TABLE IF EXISTS `marathon_aerobics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marathon_aerobics` (
  `player_id` int NOT NULL,
  `jump_pack` int DEFAULT '0',
  `deep_squat` int DEFAULT '0',
  `left_ankle_left_knee` int DEFAULT '0',
  `sidebend` int DEFAULT '0',
  `frontbend` int DEFAULT '0',
  PRIMARY KEY (`player_id`),
  CONSTRAINT `marathon_aerobies_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `account` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marathon_aerobics`
--

LOCK TABLES `marathon_aerobics` WRITE;
/*!40000 ALTER TABLE `marathon_aerobics` DISABLE KEYS */;
INSERT INTO `marathon_aerobics` VALUES (91,15,11,0,18,0);
/*!40000 ALTER TABLE `marathon_aerobics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sport_aerobics`
--

DROP TABLE IF EXISTS `sport_aerobics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sport_aerobics` (
  `player_id` int NOT NULL,
  `jump_pack` int DEFAULT '0',
  `deep_squat` int DEFAULT '0',
  `left_ankle_left_knee` int DEFAULT '0',
  `sidebend` int DEFAULT '0',
  `frontbend` int DEFAULT '0',
  KEY `aerobies_ibfk_1` (`player_id`),
  CONSTRAINT `sport_aerobics_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `account` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport_aerobics`
--

LOCK TABLES `sport_aerobics` WRITE;
/*!40000 ALTER TABLE `sport_aerobics` DISABLE KEYS */;
INSERT INTO `sport_aerobics` VALUES (91,27,58,0,18,28);
/*!40000 ALTER TABLE `sport_aerobics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-19  0:58:26
