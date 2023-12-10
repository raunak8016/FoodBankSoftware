-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: foodbankdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `a_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fname` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lname` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shift` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `coordinator_flag` int NOT NULL DEFAULT '0',
  `volunteer_flag` int NOT NULL DEFAULT '1',
  `mgr_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`a_email`),
  UNIQUE KEY `a-email_UNIQUE` (`a_email`),
  KEY `mgr-email_idx` (`mgr_email`),
  CONSTRAINT `mgr-email` FOREIGN KEY (`mgr_email`) REFERENCES `admin` (`a_email`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('BobGaines@gmail.com','Bob','Gaines','Mon-09:00-17:00,Tue-09:00-17:00',1,0,'TedBarnes@gmail.com'),('SallyWon@gmail.com','Sally','Won','Tues-08:00-18:00',0,1,'TedBarnes@gmail.com'),('TedBarnes@gmail.com','Ted','Barnes','Mon-09:00-17:00,Tue-09:00-17:00',1,0,NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donor_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `item` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `donation_date` date NOT NULL,
  PRIMARY KEY (`donor_email`,`item`,`donation_date`),
  KEY `item_idx` (`item`),
  CONSTRAINT `donor_email` FOREIGN KEY (`donor_email`) REFERENCES `user` (`u_email`) ON UPDATE CASCADE,
  CONSTRAINT `item` FOREIGN KEY (`item`) REFERENCES `item` (`item_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES ('DonaldFrump@gmail.com','Dad Cookies','2023-12-01'),('DonaldFrump@gmail.com','Dad Cookies','2023-12-05'),('DonaldFrump@gmail.com','Ultra Comfort Toilet Paper','2023-12-01');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `storage_type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `brand` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `food_flag` int NOT NULL,
  `toiletry_flag` int NOT NULL,
  PRIMARY KEY (`item_name`),
  UNIQUE KEY `item_name_UNIQUE` (`item_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES ('Dad Cookies',35,'Shelf','Mondelez',1,0),('Kellogs Corn Flakes',13,'Shelf','Kellogs',1,0),('Ultra Comfort Toilet Paper',2,'Shelf','Charmin',0,1),('Ultra Soft Toilet Paper',5,'Shelf','Charmin',0,1);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_no` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `admin_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `supplier_id` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`order_no`),
  UNIQUE KEY `order_no_UNIQUE` (`order_no`),
  KEY `admin_email_idx` (`admin_email`),
  KEY `suppplier_id_idx` (`supplier_id`),
  CONSTRAINT `admin_email` FOREIGN KEY (`admin_email`) REFERENCES `admin` (`a_email`) ON UPDATE CASCADE,
  CONSTRAINT `suppplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('3d5af866b4','2023-12-30','SallyWon@gmail.com','0000000001');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_contains`
--

DROP TABLE IF EXISTS `order_contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_contains` (
  `order_no` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `item_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`order_no`,`item_name`),
  KEY `item_name_idx` (`item_name`),
  CONSTRAINT `item_name` FOREIGN KEY (`item_name`) REFERENCES `item` (`item_name`) ON UPDATE CASCADE,
  CONSTRAINT `order_no` FOREIGN KEY (`order_no`) REFERENCES `order` (`order_no`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_contains`
--

LOCK TABLES `order_contains` WRITE;
/*!40000 ALTER TABLE `order_contains` DISABLE KEYS */;
INSERT INTO `order_contains` VALUES ('3d5af866b4','Dad Cookies'),('3d5af866b4','Kellogs Corn Flakes'),('3d5af866b4','Ultra Comfort Toilet Paper');
/*!40000 ALTER TABLE `order_contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_id` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `request_admin` varchar(30) DEFAULT NULL,
  `request_user` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pickup_date` date DEFAULT NULL,
  `request_date` date NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `request_admin_idx` (`request_admin`),
  KEY `request_user_idx` (`request_user`),
  CONSTRAINT `request_user` FOREIGN KEY (`request_user`) REFERENCES `user` (`u_email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES ('be68305bb3',NULL,'johndoe@gmail.com',NULL,'2023-12-10');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_contains`
--

DROP TABLE IF EXISTS `request_contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_contains` (
  `id_request` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `request_item` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_request`,`request_item`),
  KEY `request_item_idx` (`request_item`),
  CONSTRAINT `id_request` FOREIGN KEY (`id_request`) REFERENCES `request` (`request_id`) ON UPDATE CASCADE,
  CONSTRAINT `request_item` FOREIGN KEY (`request_item`) REFERENCES `item` (`item_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_contains`
--

LOCK TABLES `request_contains` WRITE;
/*!40000 ALTER TABLE `request_contains` DISABLE KEYS */;
INSERT INTO `request_contains` VALUES ('be68305bb3','Kellogs Corn Flakes'),('be68305bb3','Ultra Comfort Toilet Paper');
/*!40000 ALTER TABLE `request_contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `location` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `supplier_id_UNIQUE` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('0000000001','Walmart','Calgary'),('0000000002','Costco','Airdrie'),('0000000003','Sobeys','Okotoks');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `u_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fname` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lname` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `client_flag` int NOT NULL,
  `address` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `num_visits` int DEFAULT '0',
  `verify_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `donor_flag` int NOT NULL,
  PRIMARY KEY (`u_email`),
  UNIQUE KEY `u_email_UNIQUE` (`u_email`),
  KEY `verify_email_idx` (`verify_email`),
  CONSTRAINT `verify_email` FOREIGN KEY (`verify_email`) REFERENCES `admin` (`a_email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('BonnieClyde@gmail.com','Bonnie','Clyde',0,NULL,0,NULL,1),('ChiefKeef@gmail.com','Chief','Keef',0,NULL,0,NULL,1),('DonaldFrump@gmail.com','Donald','Frump',0,NULL,NULL,'SallyWon@gmail.com',1),('JaneDoe@gmail.com','Jane','Doe',1,'12,Evergarden,Road',3,'TedBarnes@gmail.com',0),('JimJong@gmail.com','Jim','Jong',0,NULL,0,NULL,1),('JohnDoe@gmail.com','John','Doe',1,'12,Evergarden,Road',2,'SallyWon@gmail.com',0),('MattLow@gmail.com','Matt','Low',0,NULL,0,NULL,1),('TomJerry@gmail.com','Tom','Jerry',1,'15,Grandville,Crescent',0,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 14:27:11
