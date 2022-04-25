-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_agriculture_db
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `crop_calendar_table`
--

DROP TABLE IF EXISTS `crop_calendar_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_calendar_table` (
  `calendar_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `land_prep_date` datetime DEFAULT NULL,
  `sowing_date` datetime DEFAULT NULL,
  `harvest_date` datetime DEFAULT NULL,
  `planting_method` enum('Irrigation','Non-Irrigation') DEFAULT NULL,
  `seed_planted` int DEFAULT NULL,
  `status` enum('Active','Inactive','In-Progress','Completed') DEFAULT NULL,
  `seed_rate` int NOT NULL,
  `harvest_yield` int DEFAULT NULL,
  `crop_plan` varchar(45) NOT NULL,
  `method` enum('Transplanting','Direct Seeding') NOT NULL,
  PRIMARY KEY (`calendar_id`),
  UNIQUE KEY `calendar_id_UNIQUE` (`calendar_id`),
  KEY `seed_to_calendar_idx` (`seed_planted`),
  KEY `farm_to_calendar_idx` (`farm_id`),
  CONSTRAINT `farm_to_calendar` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`),
  CONSTRAINT `seed_to_calendar` FOREIGN KEY (`seed_planted`) REFERENCES `seed_table` (`seed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_calendar_table`
--

LOCK TABLES `crop_calendar_table` WRITE;
/*!40000 ALTER TABLE `crop_calendar_table` DISABLE KEYS */;
INSERT INTO `crop_calendar_table` VALUES (42,54,'2019-04-03 00:00:00','2019-04-11 00:00:00','2019-05-18 00:00:00',NULL,4,'Completed',90,90,'Early 2019','Transplanting'),(43,55,'2019-03-21 00:00:00','2019-03-29 00:00:00','2019-05-05 00:00:00',NULL,4,'Completed',90,100,'Early 2019','Transplanting'),(44,56,'2019-04-23 00:00:00','2019-05-01 00:00:00','2019-06-07 00:00:00',NULL,4,'Completed',60,80,'Early 2019','Transplanting'),(45,57,'2019-04-08 00:00:00','2019-04-16 00:00:00','2019-05-23 00:00:00',NULL,4,'Completed',70,60,'Early 2019','Transplanting'),(46,58,'2019-04-10 00:00:00','2019-04-18 00:00:00','2019-05-20 00:00:00',NULL,6,'Completed',80,90,'Early 2019','Direct Seeding'),(47,54,'2019-10-31 00:00:00','2019-11-08 00:00:00','2019-12-25 00:00:00',NULL,5,'Completed',60,100,'Late 2019','Direct Seeding'),(48,55,'2019-11-12 00:00:00','2019-11-20 00:00:00','2020-01-06 00:00:00',NULL,5,'Completed',80,96,'Late 2019','Transplanting'),(49,56,'2019-11-11 00:00:00','2019-11-19 00:00:00','2019-12-26 00:00:00',NULL,7,'Completed',50,70,'Late 2019','Transplanting'),(50,57,'2019-10-26 00:00:00','2019-11-03 00:00:00','2019-12-20 00:00:00',NULL,5,'Completed',80,50,'Late 2019','Transplanting'),(51,58,'2010-11-01 00:00:00','2019-11-09 00:00:00','2019-12-16 00:00:00',NULL,4,'Completed',50,70,'Late 2019','Transplanting'),(52,54,'2020-04-01 00:00:00','2020-04-09 00:00:00','2020-05-16 00:00:00',NULL,4,'Completed',50,60,'Early 2020','Transplanting'),(53,55,'2020-03-31 00:00:00','2020-04-08 00:00:00','2020-05-15 00:00:00',NULL,7,'Completed',45,100,'Early 2020','Direct Seeding'),(54,56,'2020-04-14 00:00:00','2020-04-22 00:00:00','2020-05-24 00:00:00',NULL,6,'Completed',50,95,'Early 2020','Direct Seeding'),(55,57,'2020-03-20 00:00:00','2020-03-28 00:00:00','2020-05-14 00:00:00',NULL,5,'Completed',70,70,'Early 2020','Transplanting'),(56,58,'2020-04-15 00:00:00','2020-04-23 00:00:00','2020-06-09 00:00:00',NULL,5,'Completed',40,80,'Early 2020','Transplanting'),(57,54,'2020-10-21 00:00:00','2020-10-29 00:00:00','2020-12-05 00:00:00',NULL,4,'Completed',90,100,'Late 2020','Transplanting'),(58,55,'2022-01-26 00:00:00','2022-02-03 00:00:00','2022-03-12 00:00:00',NULL,4,'Completed',60,90,'Late 2020','Transplanting'),(59,56,'2020-10-28 00:00:00','2020-11-05 00:00:00','2020-12-22 00:00:00',NULL,5,'Completed',50,60,'Late 2020','Transplanting'),(60,57,'2020-10-28 00:00:00','2020-11-05 00:00:00','2020-12-12 00:00:00',NULL,4,'Completed',60,30,'Late 2020','Transplanting'),(61,58,'2020-10-19 00:00:00','2020-10-27 00:00:00','2020-12-03 00:00:00',NULL,4,'Completed',50,50,'Late 2020','Transplanting'),(64,57,'2021-08-06 00:00:00','2021-08-28 00:00:00','2022-02-09 00:00:00',NULL,4,'In-Progress',45,NULL,'Early 2022','Transplanting'),(65,54,'2021-08-06 00:00:00','2021-08-28 00:00:00','2022-02-01 00:00:00',NULL,4,'In-Progress',45,NULL,'Early 2022','Transplanting'),(67,59,'2021-08-19 00:00:00','2021-09-10 00:00:00','2022-02-01 00:00:00',NULL,6,'In-Progress',55,NULL,'Early 2022','Transplanting'),(68,58,'2022-02-17 00:00:00','2022-02-28 00:00:00','2022-08-09 00:00:00',NULL,7,'In-Progress',50,NULL,'Early 2022','Direct Seeding');
/*!40000 ALTER TABLE `crop_calendar_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_cycle_table`
--

DROP TABLE IF EXISTS `crop_cycle_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_cycle_table` (
  `cycle_id` int NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `seed_planted` int NOT NULL,
  PRIMARY KEY (`cycle_id`),
  UNIQUE KEY `cycle_id_UNIQUE` (`cycle_id`),
  KEY `seed_to_cycle_idx` (`seed_planted`),
  CONSTRAINT `seed_to_cycle` FOREIGN KEY (`seed_planted`) REFERENCES `seed_table` (`seed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_cycle_table`
--

LOCK TABLES `crop_cycle_table` WRITE;
/*!40000 ALTER TABLE `crop_cycle_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `crop_cycle_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_data`
--

DROP TABLE IF EXISTS `daily_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_data` (
  `data_id` int NOT NULL,
  `farm_id` int NOT NULL,
  `min_temp` float DEFAULT NULL,
  `max_temp` float DEFAULT NULL,
  `pressure` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `precipitation` float DEFAULT NULL,
  `temp10` float DEFAULT NULL,
  `soil_moisture` float DEFAULT NULL,
  `surface_temp` float DEFAULT NULL,
  `UVI` float DEFAULT NULL,
  `NDVI` float DEFAULT NULL,
  PRIMARY KEY (`data_id`),
  KEY `farm_index_idx` (`farm_id`),
  CONSTRAINT `farm_index` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_data`
--

LOCK TABLES `daily_data` WRITE;
/*!40000 ALTER TABLE `daily_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis`
--

DROP TABLE IF EXISTS `diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis` (
  `diagnosis_id` int NOT NULL AUTO_INCREMENT,
  `type` enum('Pest','Disease') NOT NULL,
  `date_diagnosed` date NOT NULL,
  `date_solved` date DEFAULT NULL,
  `farm_id` int NOT NULL,
  `value` tinytext,
  `pd_id` int NOT NULL,
  `calendar_id` int DEFAULT NULL,
  `status` enum('Present','Solved') DEFAULT 'Present',
  `stage_diagnosed` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`diagnosis_id`),
  KEY `diag_farm_idx` (`farm_id`),
  KEY `calendar_id_diagnosis_idx` (`calendar_id`),
  CONSTRAINT `calendar_id_diagnosis` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`),
  CONSTRAINT `diag_farm` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
INSERT INTO `diagnosis` VALUES (61,'Pest','2019-05-01','2019-05-08',54,NULL,1,42,'Solved','Vegetation'),(62,'Pest','2019-05-05','2019-05-12',54,NULL,3,42,'Solved','Reproduction'),(63,'Pest','2019-07-04','2019-07-11',54,NULL,5,42,'Solved','Ripening'),(64,'Disease','2019-06-03','2019-06-10',54,NULL,1,42,'Solved','Ripening'),(65,'Pest','2019-05-09','2019-05-16',55,NULL,4,43,'Solved','Harvesting'),(66,'Disease','2019-05-21','2019-05-28',55,NULL,3,43,'Solved','Ripening'),(67,'Pest','2019-05-30','2019-06-06',55,NULL,7,43,'Solved','Harvesting'),(68,'Pest','2022-01-09','2022-01-16',56,NULL,3,59,'Solved','Ripening'),(69,'Disease','2019-06-14','2019-06-21',56,NULL,1,44,'Solved','Ripening'),(70,'Pest','2019-05-18','2019-05-25',57,NULL,4,45,'Solved','Vegetation'),(71,'Disease','2019-07-16','2019-07-23',57,NULL,3,45,'Solved','Reproduction'),(72,'Disease','2019-06-11','2019-06-18',57,NULL,1,45,'Solved','Ripening'),(73,'Pest','2019-11-13','2019-11-20',54,NULL,3,47,'Solved','Sowing'),(74,'Disease','2019-11-24','2019-12-01',54,NULL,3,47,'Solved','Vegetation'),(75,'Pest','2019-12-04','2019-12-11',54,NULL,1,47,'Solved','Ripening'),(76,'Pest','2019-10-22','2019-10-29',55,NULL,4,43,'Solved','Reproduction'),(77,'Disease','2019-11-12','2019-11-19',55,NULL,4,48,'Solved','Land Preparation'),(78,'Pest','2019-10-24','2019-10-31',56,NULL,7,44,'Solved','Harvesting'),(79,'Disease','2019-11-14','2019-11-21',56,NULL,3,49,'Solved','Land Preparation'),(80,'Pest','2019-11-19','2019-11-26',57,NULL,5,50,'Solved','Reproduction'),(81,'Disease','2019-10-31','2019-11-07',57,NULL,2,50,'Solved','Land Preparation'),(82,'Pest','2019-11-09','2019-11-16',57,NULL,9,50,'Solved','Sowing'),(83,'Pest','2019-12-20','2019-12-27',58,NULL,3,51,'Solved','Ripening'),(84,'Disease','2019-12-29','2020-01-05',58,NULL,2,51,'Solved','Reproduction'),(85,'Pest','2020-04-27','2020-05-04',54,NULL,5,52,'Solved','Vegetation'),(86,'Pest','2020-06-09','2020-06-16',54,NULL,1,52,'Solved','Reproduction'),(87,'Disease','2022-05-24','2022-05-31',54,NULL,2,57,'Solved','Ripening'),(88,'Pest','2020-06-05','2020-06-12',55,NULL,2,53,'Solved','Reproduction'),(89,'Disease','2020-05-18','2020-05-25',55,NULL,5,53,'Solved','Ripening'),(90,'Pest','2020-06-12','2020-06-19',55,NULL,5,53,'Solved','Harvesting'),(91,'Pest','2020-05-11','2020-05-18',56,NULL,3,54,'Solved','Reproduction'),(92,'Pest','2020-06-03','2020-06-10',56,NULL,7,54,'Solved','Harvesting'),(93,'Disease','2020-04-14','2020-04-21',57,NULL,1,55,'Solved','Vegetation'),(94,'Pest','2020-06-12','2020-06-19',57,NULL,8,55,'Solved','Ripening'),(95,'Pest','2020-06-08','2020-06-15',58,NULL,1,56,'Solved','Vegetation'),(96,'Disease','2020-07-22','2020-07-29',58,NULL,4,56,'Solved','Ripening'),(97,'Pest','2020-09-17','2020-09-24',54,NULL,3,47,'Solved','Reproduction'),(98,'Disease','2020-10-20','2020-10-27',54,NULL,5,52,'Solved','Harvesting'),(99,'Pest','2020-10-20','2020-10-27',55,NULL,3,53,'Solved','Reproduction'),(100,'Disease','2020-09-25','2020-10-02',55,NULL,3,53,'Solved','Ripening'),(101,'Pest','2020-11-26','2020-12-03',56,NULL,5,59,'Solved','Reproduction'),(102,'Disease','2020-10-09','2020-10-16',56,NULL,2,54,'Solved','Ripening'),(103,'Pest','2020-10-21','2020-10-28',57,NULL,6,55,'Solved','Harvesting'),(104,'Disease','2020-12-23','2020-12-30',57,NULL,4,60,'Solved','Ripening'),(105,'Pest','2020-10-09','2020-10-16',58,NULL,5,56,'Solved','Harvesting'),(106,'Disease','2020-11-06','2020-11-13',58,NULL,1,61,'Solved','Vegetation'),(107,'Pest','2020-12-04','2020-12-11',56,NULL,2,59,'Solved','Vegetation'),(108,'Pest','2022-01-14',NULL,54,NULL,8,57,'Present','Harvesting');
/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis_symptom`
--

DROP TABLE IF EXISTS `diagnosis_symptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis_symptom` (
  `diagnosis_symptom_id` int NOT NULL AUTO_INCREMENT,
  `diagnosis_id` int NOT NULL,
  `symptom_id` int NOT NULL,
  PRIMARY KEY (`diagnosis_symptom_id`),
  KEY `diagnosis_id_symp_idx` (`diagnosis_id`),
  KEY `symptom_diagnosis_fk_idx` (`symptom_id`),
  CONSTRAINT `diagnosis_id_symp` FOREIGN KEY (`diagnosis_id`) REFERENCES `diagnosis` (`diagnosis_id`),
  CONSTRAINT `symptom_diagnosis_fk` FOREIGN KEY (`symptom_id`) REFERENCES `symptoms_table` (`symptom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis_symptom`
--

LOCK TABLES `diagnosis_symptom` WRITE;
/*!40000 ALTER TABLE `diagnosis_symptom` DISABLE KEYS */;
INSERT INTO `diagnosis_symptom` VALUES (102,61,1),(103,62,5),(104,62,6),(105,62,7),(106,62,8),(107,63,12),(108,63,13),(109,63,14),(110,63,15),(111,64,12),(112,64,15),(113,64,22),(114,65,9),(115,65,10),(116,65,11),(117,66,24),(118,66,26),(119,66,27),(120,66,25),(121,67,16),(122,67,17),(123,67,18),(124,67,19),(125,68,5),(126,68,6),(127,68,7),(128,68,8),(129,69,12),(130,69,15),(131,69,22),(132,70,9),(133,70,10),(134,70,11),(135,71,24),(136,71,26),(137,71,27),(138,71,25),(139,72,12),(140,72,15),(141,72,22),(142,73,5),(143,73,6),(144,73,7),(145,73,8),(146,74,24),(147,74,26),(148,74,27),(149,74,25),(150,75,1),(151,76,9),(152,76,10),(153,76,11),(154,77,28),(155,77,29),(156,77,30),(157,78,16),(158,78,17),(159,78,18),(160,78,19),(161,79,24),(162,79,26),(163,79,27),(164,79,25),(165,80,12),(166,80,13),(167,80,14),(168,80,15),(169,81,22),(170,81,28),(171,81,24),(172,82,21),(173,82,22),(174,82,24),(175,83,5),(176,83,6),(177,83,7),(178,83,8),(179,84,22),(180,84,28),(181,84,24),(182,85,12),(183,85,13),(184,85,14),(185,85,15),(186,86,1),(187,87,22),(188,87,28),(189,87,24),(190,88,2),(191,88,3),(192,88,4),(193,89,29),(194,89,30),(195,89,31),(196,90,12),(197,90,13),(198,90,14),(199,90,15),(200,91,5),(201,91,6),(202,91,7),(203,91,8),(204,92,16),(205,92,17),(206,92,18),(207,92,19),(208,93,12),(209,93,15),(210,93,22),(211,94,21),(212,94,20),(213,95,1),(214,96,28),(215,96,29),(216,96,30),(217,97,5),(218,97,6),(219,97,7),(220,97,8),(221,98,29),(222,98,30),(223,98,31),(224,99,1),(225,100,24),(226,100,26),(227,100,27),(228,100,25),(229,101,12),(230,101,13),(231,101,14),(232,101,15),(233,102,22),(234,102,28),(235,102,24),(236,103,16),(237,103,17),(238,103,18),(239,103,19),(240,104,28),(241,104,29),(242,104,30),(243,105,12),(244,105,13),(245,105,14),(246,105,15),(247,106,12),(248,106,15),(249,106,22),(250,107,2),(251,107,3),(252,107,4),(253,108,21),(254,108,20);
/*!40000 ALTER TABLE `diagnosis_symptom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disaster_logs`
--

DROP TABLE IF EXISTS `disaster_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disaster_logs` (
  `disaster_id` int NOT NULL AUTO_INCREMENT,
  `max_temp` float DEFAULT NULL,
  `min_temp` float DEFAULT NULL,
  `pressure` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `weather` tinytext,
  `description` tinytext,
  `wind_speed` float DEFAULT NULL,
  `rainfall` float DEFAULT NULL,
  `wind_direction` float DEFAULT NULL,
  `status` int NOT NULL,
  `type` tinytext NOT NULL,
  `date_recorded` datetime NOT NULL,
  `target_date` datetime NOT NULL,
  PRIMARY KEY (`disaster_id`),
  UNIQUE KEY `disaster_id_UNIQUE` (`disaster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disaster_logs`
--

LOCK TABLES `disaster_logs` WRITE;
/*!40000 ALTER TABLE `disaster_logs` DISABLE KEYS */;
INSERT INTO `disaster_logs` VALUES (3,25.31,24.49,1005,95,'502','heavy intensity rain',3.43,78.36,301,1,'Heavy Rainfall','2022-01-23 00:00:00','2022-02-20 00:00:00');
/*!40000 ALTER TABLE `disaster_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease_table`
--

DROP TABLE IF EXISTS `disease_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease_table` (
  `disease_id` int NOT NULL AUTO_INCREMENT,
  `disease_name` varchar(45) NOT NULL,
  `disease_desc` tinytext NOT NULL,
  `scientific_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`disease_id`),
  UNIQUE KEY `disease_name_UNIQUE` (`disease_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease_table`
--

LOCK TABLES `disease_table` WRITE;
/*!40000 ALTER TABLE `disease_table` DISABLE KEYS */;
INSERT INTO `disease_table` VALUES (1,'Bacterial Blight','It causes wilting of seedlings and yellowing and drying of leaves.','Xanthomonas oryzae pv. oryzae.'),(2,'Bacterial leaf streak','Infected plants show browning and drying of leaves. ','Xanthomonas oryzae pv. oryzicola'),(3,'Blast (leaf and collar)',' It can affect all above ground parts of a rice plant: leaf, collar, node, neck, parts of panicle, and sometimes leaf sheath.','Magnaporthe oryzae'),(4,'Brown spot','Brown spot has been historically largely ignored as one of the most common and most damaging rice diseases.','N/A'),(5,'False smut','False smut causes chalkiness of grains which leads to reduction in grain weight. It also reduces seed germination.','N/A'),(6,'Rice grassy stunt','Rice grassy stunt virus reduces yields by inhibiting panicle production.','N/A'),(7,'Bakanae','Bakanae is a seedborne fungal disease. The fungus infects plants through the roots or crowns. It then grows systemically within the plant.','N/A');
/*!40000 ALTER TABLE `disease_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effects_disease`
--

DROP TABLE IF EXISTS `effects_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `effects_disease` (
  `effects_id` int NOT NULL,
  `disease_id` int NOT NULL,
  `effects_disease_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`effects_disease_id`),
  KEY `fk_effects_table_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_effects_table_has_disease_table_effects_table1_idx` (`effects_id`),
  CONSTRAINT `fk_effects_table_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_effects_table_has_disease_table_effects_table1` FOREIGN KEY (`effects_id`) REFERENCES `effects_table` (`effects_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effects_disease`
--

LOCK TABLES `effects_disease` WRITE;
/*!40000 ALTER TABLE `effects_disease` DISABLE KEYS */;
/*!40000 ALTER TABLE `effects_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effects_pest`
--

DROP TABLE IF EXISTS `effects_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `effects_pest` (
  `effects_pest_id` int NOT NULL,
  `effects_id` int NOT NULL,
  `pest_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`effects_pest_id`),
  KEY `fk_effects_table_has_pest_table_pest_table1_idx` (`pest_id`),
  KEY `fk_effects_table_has_pest_table_effects_table1_idx` (`effects_id`),
  CONSTRAINT `fk_effects_table_has_pest_table_effects_table1` FOREIGN KEY (`effects_id`) REFERENCES `effects_table` (`effects_id`),
  CONSTRAINT `fk_effects_table_has_pest_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effects_pest`
--

LOCK TABLES `effects_pest` WRITE;
/*!40000 ALTER TABLE `effects_pest` DISABLE KEYS */;
/*!40000 ALTER TABLE `effects_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effects_table`
--

DROP TABLE IF EXISTS `effects_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `effects_table` (
  `effects_id` int NOT NULL AUTO_INCREMENT,
  `effect_name` varchar(45) NOT NULL,
  `effect_desc` tinytext,
  PRIMARY KEY (`effects_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effects_table`
--

LOCK TABLES `effects_table` WRITE;
/*!40000 ALTER TABLE `effects_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `effects_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `element_table`
--

DROP TABLE IF EXISTS `element_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `element_table` (
  `element_id` int NOT NULL AUTO_INCREMENT,
  `element_name` int DEFAULT NULL,
  PRIMARY KEY (`element_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `element_table`
--

LOCK TABLES `element_table` WRITE;
/*!40000 ALTER TABLE `element_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `element_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_table`
--

DROP TABLE IF EXISTS `employee_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_table` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `position` enum('Office Worker','Farm Manager','Farmer','Owner') NOT NULL DEFAULT 'Farmer',
  `last_name` varchar(25) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `idemployee_table_UNIQUE` (`employee_id`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_table`
--

LOCK TABLES `employee_table` WRITE;
/*!40000 ALTER TABLE `employee_table` DISABLE KEYS */;
INSERT INTO `employee_table` VALUES (1,'Office Worker','Thomas','Jeffry','9293150238'),(3,'Office Worker','Ramon','Gabio','9293150233'),(4,'Farmer','Acena','Orlino','9138457394'),(5,'Farmer','Acena','Pablo','9453945345'),(6,'Farm Manager','Sina','Reymund','9543534535'),(7,'Farm Manager','Soriano','Paulino','1345672874'),(8,'Farmer','Baldemor','Jose Marlon','9823143544'),(9,'Farmer','Villanueva','Joseph','9324292433'),(10,'Farm Manager','Ubay','Bernardo','9645325244'),(11,'Farmer','Balneg','Jaime','9325214355'),(12,'Farm Manager','Tolentino','Bonnie','9352666224'),(13,'Farm Manager','Banay','Elmer','9326255552'),(14,'Farm Manager','Rosario','Marilou','9326262444'),(15,'Farm Manager','Mary','Bricka','9324266222'),(16,'Farm Manager','Harry','Brocka','9324222242'),(17,'Farmer','Lorenz','Kalitio','9231113679'),(18,'Farmer','Lita','Balako','9234226683'),(19,'Farmer','Remy','Ronalda','9436317797'),(20,'Farmer','Rando','Ricky','9342346623'),(21,'Farmer','Loly','Labuyo','9324252452'),(22,'Farmer','Jona','Kalindro','9342352622'),(23,'Farmer','Kany','Kalaw','9234229424');
/*!40000 ALTER TABLE `employee_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_assignment`
--

DROP TABLE IF EXISTS `farm_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `farm_id` int NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  PRIMARY KEY (`assignment_id`),
  UNIQUE KEY `assignment_id_UNIQUE` (`assignment_id`),
  KEY `employee_id_idx` (`employee_id`),
  KEY `farm_id_idx` (`farm_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee_table` (`employee_id`),
  CONSTRAINT `farm_farm_assignment_id` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_assignment`
--

LOCK TABLES `farm_assignment` WRITE;
/*!40000 ALTER TABLE `farm_assignment` DISABLE KEYS */;
INSERT INTO `farm_assignment` VALUES (45,4,54,'Active'),(46,5,54,'Active'),(47,7,54,'Active'),(48,8,55,'Active'),(49,11,55,'Active'),(50,17,55,'Active'),(51,4,55,'Active'),(52,6,55,'Active'),(53,9,56,'Active'),(54,22,56,'Active'),(55,23,56,'Active'),(56,13,56,'Active'),(57,18,57,'Active'),(58,10,57,'Active'),(59,20,58,'Active'),(60,21,58,'Active'),(61,12,58,'Active');
/*!40000 ALTER TABLE `farm_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_materials`
--

DROP TABLE IF EXISTS `farm_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_materials` (
  `farm_mat_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `item_type` enum('Pesticide','Fertilizer','Seed','Others') NOT NULL,
  `current_amount` float DEFAULT '0',
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`farm_mat_id`),
  KEY `farm_id_idx` (`farm_id`),
  CONSTRAINT `farm_id` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_materials`
--

LOCK TABLES `farm_materials` WRITE;
/*!40000 ALTER TABLE `farm_materials` DISABLE KEYS */;
INSERT INTO `farm_materials` VALUES (25,54,4,'Seed',120,1),(26,54,1,'Fertilizer',9,1),(27,54,11,'Pesticide',20,1),(28,54,9,'Pesticide',20,1),(29,54,6,'Pesticide',35,1),(30,54,7,'Fertilizer',9,1),(31,54,2,'Fertilizer',8,1),(32,54,7,'Pesticide',20,1),(33,54,5,'Seed',40,1),(34,54,8,'Pesticide',40,1),(35,55,1,'Fertilizer',9,1),(36,55,4,'Seed',0,1),(37,55,7,'Fertilizer',8,1),(38,55,2,'Fertilizer',6,1),(39,55,6,'Pesticide',40,1),(40,55,10,'Pesticide',40,1),(41,55,5,'Seed',0,1),(42,55,11,'Pesticide',40,1),(43,55,7,'Pesticide',40,1),(44,55,7,'Seed',10,1),(45,55,9,'Pesticide',40,1),(46,56,4,'Seed',20,1),(47,56,2,'Fertilizer',13,1),(48,56,7,'Fertilizer',11,1),(49,56,1,'Fertilizer',10,1),(50,56,7,'Seed',10,1),(51,56,10,'Pesticide',40,1),(52,56,6,'Pesticide',40,1),(53,56,9,'Pesticide',30,1),(54,56,11,'Pesticide',15,1),(55,56,7,'Pesticide',25,1),(56,56,6,'Seed',90,1),(57,56,5,'Seed',90,1),(58,56,8,'Pesticide',40,1),(59,57,2,'Fertilizer',46,1),(60,57,1,'Fertilizer',43,1),(61,57,7,'Fertilizer',49,1),(62,57,4,'Seed',25,1),(63,57,5,'Seed',23,1),(64,57,9,'Pesticide',40,1),(65,57,10,'Pesticide',40,1),(66,57,7,'Pesticide',40,1),(67,57,6,'Pesticide',40,1),(68,57,8,'Pesticide',40,1),(69,58,2,'Fertilizer',12,1),(70,58,7,'Fertilizer',11,1),(71,58,1,'Fertilizer',5,1),(72,58,6,'Seed',3,1),(73,58,4,'Seed',15,1),(74,58,7,'Pesticide',40,1),(75,58,10,'Pesticide',40,1),(76,58,11,'Pesticide',40,1),(77,58,6,'Pesticide',40,1),(78,58,5,'Seed',20,1);
/*!40000 ALTER TABLE `farm_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_plots`
--

DROP TABLE IF EXISTS `farm_plots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_plots` (
  `plot_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `x_coord` int NOT NULL,
  `y_coord` int NOT NULL,
  PRIMARY KEY (`plot_id`),
  UNIQUE KEY `plot_id_UNIQUE` (`plot_id`),
  KEY `plot_to_farm_idx` (`farm_id`),
  CONSTRAINT `plot_to_farm` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_plots`
--

LOCK TABLES `farm_plots` WRITE;
/*!40000 ALTER TABLE `farm_plots` DISABLE KEYS */;
/*!40000 ALTER TABLE `farm_plots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_table`
--

DROP TABLE IF EXISTS `farm_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_table` (
  `farm_id` int NOT NULL AUTO_INCREMENT,
  `farm_name` varchar(45) NOT NULL,
  `farm_desc` varchar(45) DEFAULT NULL,
  `farm_area` float DEFAULT NULL,
  `land_type` enum('Lowland','Upland') NOT NULL DEFAULT 'Lowland',
  `status` enum('Active','Inactive','In-Progress') DEFAULT 'Active',
  PRIMARY KEY (`farm_id`),
  UNIQUE KEY `farm_id_UNIQUE` (`farm_id`),
  UNIQUE KEY `farm_name_UNIQUE` (`farm_name`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_table`
--

LOCK TABLES `farm_table` WRITE;
/*!40000 ALTER TABLE `farm_table` DISABLE KEYS */;
INSERT INTO `farm_table` VALUES (54,'Socoro Farm 1','This is the first farm created by the system',2.65,'Lowland','Active'),(55,'LA Farm WEST','This is the farm from the WEST',2.45,'Upland','Active'),(56,'LA Farm EAST','Farm from the EAST side of Socorro',3.04,'Lowland','Active'),(57,'LA Farm NORTH','Farm from the NORTH',5.78,'Lowland','Active'),(58,'LA Farm SOUTH','This is the SOUTHERN farm',3.18,'Lowland','Active'),(59,'Soccoro Farm 2','Second Soccoro Farm',2.85,'Lowland','Active');
/*!40000 ALTER TABLE `farm_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_types`
--

DROP TABLE IF EXISTS `farm_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_types` (
  `farm_type_id` int NOT NULL AUTO_INCREMENT,
  `farm_type` varchar(45) NOT NULL,
  `farm_type_desc` tinytext NOT NULL,
  PRIMARY KEY (`farm_type_id`),
  UNIQUE KEY `farm_type_UNIQUE` (`farm_type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_types`
--

LOCK TABLES `farm_types` WRITE;
/*!40000 ALTER TABLE `farm_types` DISABLE KEYS */;
INSERT INTO `farm_types` VALUES (1,'Upland','The farm is upland'),(2,'Lowland','The farm is lowland'),(3,'Irrigation','The farm is irrigated'),(4,'Rainfed','The farm is rainfed'),(5,'Transplanting','Planting method used is transplanting'),(6,'Direct Seeding','Direct seeding is the method used for sowing.');
/*!40000 ALTER TABLE `farm_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farm_types_disease`
--

DROP TABLE IF EXISTS `farm_types_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_types_disease` (
  `farm_types_disease_id` int NOT NULL AUTO_INCREMENT,
  `farm_type_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`farm_types_disease_id`),
  KEY `fk_farm_types_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_farm_types_has_disease_table_farm_types1_idx` (`farm_type_id`),
  CONSTRAINT `fk_farm_types_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_farm_types_has_disease_table_farm_types1` FOREIGN KEY (`farm_type_id`) REFERENCES `farm_types` (`farm_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_types_disease`
--

LOCK TABLES `farm_types_disease` WRITE;
/*!40000 ALTER TABLE `farm_types_disease` DISABLE KEYS */;
INSERT INTO `farm_types_disease` VALUES (3,2,1),(4,3,1),(5,4,1),(6,4,7);
/*!40000 ALTER TABLE `farm_types_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmer_queries`
--

DROP TABLE IF EXISTS `farmer_queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmer_queries` (
  `query_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `message` mediumtext,
  PRIMARY KEY (`query_id`),
  KEY `farmer_ref_idx` (`employee_id`),
  CONSTRAINT `farmer_ref` FOREIGN KEY (`employee_id`) REFERENCES `employee_table` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmer_queries`
--

LOCK TABLES `farmer_queries` WRITE;
/*!40000 ALTER TABLE `farmer_queries` DISABLE KEYS */;
/*!40000 ALTER TABLE `farmer_queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmtypes_pest`
--

DROP TABLE IF EXISTS `farmtypes_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmtypes_pest` (
  `farmtypes_pest_id` int NOT NULL AUTO_INCREMENT,
  `farm_type_id` int NOT NULL,
  `pest_id` int NOT NULL,
  PRIMARY KEY (`farmtypes_pest_id`),
  KEY `fk_farm_types_has_pest_table_pest_table1_idx` (`pest_id`),
  KEY `fk_farm_types_has_pest_table_farm_types1_idx` (`farm_type_id`),
  CONSTRAINT `fk_farm_types_has_pest_table_farm_types1` FOREIGN KEY (`farm_type_id`) REFERENCES `farm_types` (`farm_type_id`),
  CONSTRAINT `fk_farm_types_has_pest_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmtypes_pest`
--

LOCK TABLES `farmtypes_pest` WRITE;
/*!40000 ALTER TABLE `farmtypes_pest` DISABLE KEYS */;
INSERT INTO `farmtypes_pest` VALUES (6,3,1),(7,3,2),(8,4,2),(9,6,2),(10,6,3),(11,3,3),(12,5,3),(13,1,5),(14,4,5),(15,1,6),(16,4,7),(17,6,7),(18,4,8),(19,3,9),(20,4,9),(21,3,10),(22,6,10);
/*!40000 ALTER TABLE `farmtypes_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizer_disease`
--

DROP TABLE IF EXISTS `fertilizer_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_disease` (
  `fertilizer_disease_id` int NOT NULL,
  `fertilizier_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`fertilizer_disease_id`),
  KEY `fk_fertilizer_table_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_fertilizer_table_has_disease_table_fertilizer_table1_idx` (`fertilizier_id`),
  CONSTRAINT `fk_fertilizer_table_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_fertilizer_table_has_disease_table_fertilizer_table1` FOREIGN KEY (`fertilizier_id`) REFERENCES `fertilizer_table` (`fertilizer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_disease`
--

LOCK TABLES `fertilizer_disease` WRITE;
/*!40000 ALTER TABLE `fertilizer_disease` DISABLE KEYS */;
/*!40000 ALTER TABLE `fertilizer_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizer_elements`
--

DROP TABLE IF EXISTS `fertilizer_elements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_elements` (
  `fertilizer_elements` int NOT NULL AUTO_INCREMENT,
  `fertilizer_id` int NOT NULL,
  `element_id` int NOT NULL,
  `amount` float DEFAULT NULL,
  PRIMARY KEY (`fertilizer_elements`),
  KEY `fk_fertilizer_table_has_element_table_element_table1_idx` (`element_id`),
  KEY `fk_fertilizer_table_has_element_table_fertilizer_table1` (`fertilizer_id`),
  CONSTRAINT `fk_fertilizer_table_has_element_table_element_table1` FOREIGN KEY (`element_id`) REFERENCES `element_table` (`element_id`),
  CONSTRAINT `fk_fertilizer_table_has_element_table_fertilizer_table1` FOREIGN KEY (`fertilizer_id`) REFERENCES `fertilizer_table` (`fertilizer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_elements`
--

LOCK TABLES `fertilizer_elements` WRITE;
/*!40000 ALTER TABLE `fertilizer_elements` DISABLE KEYS */;
/*!40000 ALTER TABLE `fertilizer_elements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizer_pest`
--

DROP TABLE IF EXISTS `fertilizer_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_pest` (
  `fertilizer_pest_id` int NOT NULL AUTO_INCREMENT,
  `pest_id` int NOT NULL,
  `fertilizer_id` int NOT NULL,
  PRIMARY KEY (`fertilizer_pest_id`),
  KEY `fk_pest_table_has_fertilizer_table_fertilizer_table1_idx` (`fertilizer_id`),
  KEY `fk_pest_table_has_fertilizer_table_pest_table1_idx` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_fertilizer_table_fertilizer_table1` FOREIGN KEY (`fertilizer_id`) REFERENCES `fertilizer_table` (`fertilizer_id`),
  CONSTRAINT `fk_pest_table_has_fertilizer_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_pest`
--

LOCK TABLES `fertilizer_pest` WRITE;
/*!40000 ALTER TABLE `fertilizer_pest` DISABLE KEYS */;
/*!40000 ALTER TABLE `fertilizer_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizer_recommendation_items`
--

DROP TABLE IF EXISTS `fertilizer_recommendation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_recommendation_items` (
  `fr_item_id` int NOT NULL AUTO_INCREMENT,
  `fr_plan_id` int NOT NULL,
  `target_application_date` date NOT NULL,
  `fertilizer_id` int NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `amount` float NOT NULL,
  `nutrient` enum('N','P','K') NOT NULL,
  `isCreated` tinyint NOT NULL,
  `wo_id` int DEFAULT NULL,
  PRIMARY KEY (`fr_item_id`),
  UNIQUE KEY `fr_item_id_UNIQUE` (`fr_item_id`),
  KEY `fr_plan_id_idx` (`fr_plan_id`),
  KEY `wo_id_idx` (`wo_id`),
  CONSTRAINT `fr_plan_id` FOREIGN KEY (`fr_plan_id`) REFERENCES `fertilizer_recommendation_plan` (`fr_plan_id`),
  CONSTRAINT `wo_id` FOREIGN KEY (`wo_id`) REFERENCES `work_order_table` (`work_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_recommendation_items`
--

LOCK TABLES `fertilizer_recommendation_items` WRITE;
/*!40000 ALTER TABLE `fertilizer_recommendation_items` DISABLE KEYS */;
INSERT INTO `fertilizer_recommendation_items` VALUES (154,23,'2019-04-03',2,'Phosphorous Application (P)',40,'P',1,162),(155,23,'2019-04-03',7,'Basal Potassium Application (K)',6,'K',1,163),(156,23,'2019-05-16',7,'Early Panicle Potassium Application (K)',6,'K',1,164),(157,24,'2019-03-21',2,'Phosphorous Application (P)',37,'P',1,173),(158,24,'2019-03-21',7,'Basal Potassium Application (K)',6,'K',1,174),(159,24,'2019-05-03',7,'Early Panicle Potassium Application (K)',6,'K',1,175),(160,25,'2019-04-23',2,'Phosphorous Application (P)',45,'P',1,183),(161,25,'2019-04-23',7,'Basal Potassium Application (K)',7,'K',1,184),(162,25,'2019-06-05',7,'Early Panicle Potassium Application (K)',7,'K',1,185),(163,26,'2019-04-08',2,'Phosphorous Application (P)',86,'P',1,194),(164,26,'2019-04-08',7,'Basal Potassium Application (K)',13,'K',1,195),(165,26,'2019-05-21',7,'Early Panicle Potassium Application (K)',13,'K',1,196),(166,27,'2019-04-10',7,'Basal Potassium Application (K)',8,'K',1,203),(167,27,'2019-04-30',2,'Phosphorous Application (P)',48,'P',1,204),(168,27,'2019-05-23',7,'Early Panicle Potassium Application (K)',8,'K',1,205),(169,28,'2019-10-31',7,'Basal Potassium Application (K)',6,'K',1,218),(170,28,'2019-11-20',2,'Phosphorous Application (P)',40,'P',1,219),(171,28,'2019-12-13',7,'Early Panicle Potassium Application (K)',6,'K',1,220),(172,29,'2019-11-12',2,'Phosphorous Application (P)',37,'P',1,233),(173,29,'2019-11-12',7,'Basal Potassium Application (K)',6,'K',1,234),(174,29,'2019-12-25',7,'Early Panicle Potassium Application (K)',6,'K',1,235),(175,30,'2019-11-11',2,'Phosphorous Application (P)',45,'P',1,248),(176,30,'2019-11-11',7,'Basal Potassium Application (K)',7,'K',1,249),(177,30,'2019-12-24',7,'Early Panicle Potassium Application (K)',7,'K',1,250),(178,31,'2019-10-26',2,'Phosphorous Application (P)',86,'P',1,263),(179,31,'2019-10-26',7,'Basal Potassium Application (K)',13,'K',1,264),(180,31,'2019-12-08',7,'Early Panicle Potassium Application (K)',13,'K',1,265),(181,32,'2019-11-01',2,'Phosphorous Application (P)',48,'P',1,278),(182,32,'2019-11-01',7,'Basal Potassium Application (K)',8,'K',1,279),(183,32,'2019-12-14',7,'Early Panicle Potassium Application (K)',8,'K',1,280),(184,33,'2020-04-01',2,'Phosphorous Application (P)',40,'P',1,293),(185,33,'2020-04-01',7,'Basal Potassium Application (K)',6,'K',1,294),(186,33,'2020-05-14',7,'Early Panicle Potassium Application (K)',6,'K',1,295),(187,34,'2020-03-31',7,'Basal Potassium Application (K)',6,'K',1,308),(188,34,'2020-04-20',2,'Phosphorous Application (P)',37,'P',1,309),(189,34,'2020-05-13',7,'Early Panicle Potassium Application (K)',6,'K',1,310),(190,35,'2020-04-14',7,'Basal Potassium Application (K)',7,'K',1,323),(191,35,'2020-05-04',2,'Phosphorous Application (P)',45,'P',1,324),(192,35,'2020-05-27',7,'Early Panicle Potassium Application (K)',7,'K',1,325),(193,36,'2020-03-20',2,'Phosphorous Application (P)',86,'P',1,338),(194,36,'2020-03-20',7,'Basal Potassium Application (K)',13,'K',1,339),(195,36,'2020-05-02',7,'Early Panicle Potassium Application (K)',13,'K',1,340),(196,37,'2020-04-15',2,'Phosphorous Application (P)',48,'P',1,353),(197,37,'2020-04-15',7,'Basal Potassium Application (K)',8,'K',1,354),(198,37,'2020-05-28',7,'Early Panicle Potassium Application (K)',8,'K',1,355),(199,38,'2020-10-21',2,'Phosphorous Application (P)',40,'P',1,368),(200,38,'2020-10-21',7,'Basal Potassium Application (K)',6,'K',1,369),(201,38,'2020-12-03',7,'Early Panicle Potassium Application (K)',6,'K',1,370),(202,39,'2022-01-26',2,'Phosphorous Application (P)',37,'P',1,383),(203,39,'2022-01-26',7,'Basal Potassium Application (K)',6,'K',1,384),(204,39,'2022-02-03',1,'Basal Nitrogen Application (N)',1,'N',1,385),(205,39,'2022-02-17',1,'Tillering Nitrogen Application (N)',1,'N',1,386),(206,39,'2022-02-23',1,'Midtillering Nitrogen Application (N)',1,'N',1,387),(207,39,'2022-03-10',7,'Early Panicle Potassium Application (K)',6,'K',1,388),(208,39,'2022-03-15',1,'Panicle Nitrogen Application (N)',2,'N',1,389),(209,39,'2022-04-04',1,'Flowering Nitrogen Application (N)',1,'N',1,390),(210,40,'2020-10-28',2,'Phosphorous Application (P)',45,'P',1,403),(211,40,'2020-10-28',7,'Basal Potassium Application (K)',7,'K',1,404),(212,40,'2020-12-10',7,'Early Panicle Potassium Application (K)',7,'K',1,405),(213,41,'2020-10-28',2,'Phosphorous Application (P)',86,'P',1,418),(214,41,'2020-10-28',7,'Basal Potassium Application (K)',13,'K',1,419),(215,41,'2020-12-10',7,'Early Panicle Potassium Application (K)',13,'K',1,420),(216,42,'2020-10-19',2,'Phosphorous Application (P)',48,'P',1,433),(217,42,'2020-10-19',7,'Basal Potassium Application (K)',8,'K',1,434),(218,42,'2020-12-01',7,'Early Panicle Potassium Application (K)',8,'K',1,435),(222,44,'2021-09-20',2,'Phosphorous Application (P)',39,'P',1,594),(223,44,'2021-09-20',7,'Basal Potassium Application (K)',13,'K',1,595),(224,44,'2021-09-23',1,'Basal Nitrogen Application (N)',2,'N',1,596),(225,44,'2021-10-07',1,'Tillering Nitrogen Application (N)',3,'N',1,597),(226,44,'2021-10-13',1,'Midtillering Nitrogen Application (N)',3,'N',1,598),(227,44,'2021-10-28',7,'Early Panicle Potassium Application (K)',13,'K',1,599),(228,44,'2021-11-02',1,'Panicle Nitrogen Application (N)',3,'N',1,600),(229,44,'2021-11-22',1,'Flowering Nitrogen Application (N)',1,'N',1,601),(230,45,'2021-09-20',2,'Phosphorous Application (P)',18,'P',1,617),(231,45,'2021-09-20',7,'Basal Potassium Application (K)',6,'K',1,618),(232,45,'2021-09-23',1,'Basal Nitrogen Application (N)',2,'N',1,619),(233,45,'2021-10-07',1,'Tillering Nitrogen Application (N)',3,'N',1,620),(234,45,'2021-10-13',1,'Midtillering Nitrogen Application (N)',3,'N',1,621),(235,45,'2021-10-28',7,'Early Panicle Potassium Application (K)',6,'K',1,622),(236,45,'2021-11-02',1,'Panicle Nitrogen Application (N)',3,'N',1,623),(237,45,'2021-11-22',1,'Flowering Nitrogen Application (N)',1,'N',1,624),(238,46,'2021-10-03',2,'Phosphorous Application (P)',20,'P',0,NULL),(239,46,'2021-10-03',7,'Basal Potassium Application (K)',7,'K',0,NULL),(240,46,'2021-10-06',1,'Basal Nitrogen Application (N)',2,'N',0,NULL),(241,46,'2021-10-20',1,'Tillering Nitrogen Application (N)',3,'N',0,NULL),(242,46,'2021-10-26',1,'Midtillering Nitrogen Application (N)',3,'N',0,NULL),(243,46,'2021-11-10',7,'Early Panicle Potassium Application (K)',7,'K',0,NULL),(244,46,'2021-11-15',1,'Panicle Nitrogen Application (N)',3,'N',0,NULL),(245,46,'2021-12-05',1,'Flowering Nitrogen Application (N)',1,'N',0,NULL),(246,47,'2021-12-11',7,'Basal Potassium Application (K)',8,'K',1,639),(247,47,'2021-12-22',1,'Basal Nitrogen Application (N)',2,'N',1,640),(248,47,'2022-01-03',2,'Phosphorous Application (P)',22,'P',1,641),(249,47,'2022-01-05',1,'Tillering Nitrogen Application (N)',3,'N',1,642),(250,47,'2022-01-11',1,'Midtillering Nitrogen Application (N)',3,'N',1,643),(251,47,'2022-01-26',7,'Early Panicle Potassium Application (K)',8,'K',1,644),(252,47,'2022-01-31',1,'Panicle Nitrogen Application (N)',3,'N',1,645),(253,47,'2022-02-20',1,'Flowering Nitrogen Application (N)',1,'N',1,646);
/*!40000 ALTER TABLE `fertilizer_recommendation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizer_recommendation_plan`
--

DROP TABLE IF EXISTS `fertilizer_recommendation_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_recommendation_plan` (
  `fr_plan_id` int NOT NULL AUTO_INCREMENT,
  `calendar_id` int DEFAULT NULL,
  `last_updated` date NOT NULL,
  `farm_id` int NOT NULL,
  PRIMARY KEY (`fr_plan_id`),
  UNIQUE KEY `fr_plan_id_UNIQUE` (`fr_plan_id`),
  KEY `calendar_id_idx` (`calendar_id`),
  KEY `fr_farm_id_idx` (`farm_id`),
  CONSTRAINT `fr_plan_farm_id` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_recommendation_plan`
--

LOCK TABLES `fertilizer_recommendation_plan` WRITE;
/*!40000 ALTER TABLE `fertilizer_recommendation_plan` DISABLE KEYS */;
INSERT INTO `fertilizer_recommendation_plan` VALUES (23,42,'2022-01-05',54),(24,43,'2022-01-05',55),(25,44,'2022-01-05',56),(26,45,'2022-01-05',57),(27,46,'2022-01-05',58),(28,47,'2022-01-05',54),(29,48,'2022-01-05',55),(30,49,'2022-01-05',56),(31,50,'2022-01-05',57),(32,51,'2022-01-05',58),(33,52,'2022-01-05',54),(34,53,'2022-01-05',55),(35,54,'2022-01-05',56),(36,55,'2022-01-05',57),(37,56,'2022-01-05',58),(38,57,'2022-01-05',54),(39,58,'2022-01-05',55),(40,59,'2022-01-05',56),(41,60,'2022-01-05',57),(42,61,'2022-01-05',58),(44,64,'2022-01-26',57),(45,65,'2022-01-26',54),(46,67,'2022-01-27',59),(47,68,'2022-01-27',58);
/*!40000 ALTER TABLE `fertilizer_recommendation_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizer_table`
--

DROP TABLE IF EXISTS `fertilizer_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_table` (
  `fertilizer_id` int NOT NULL AUTO_INCREMENT,
  `fertilizer_name` varchar(20) NOT NULL,
  `fertilizer_desc` tinytext,
  `N` float DEFAULT '0',
  `P` float DEFAULT '0',
  `K` float DEFAULT '0',
  `price` float NOT NULL,
  `units` varchar(45) NOT NULL DEFAULT 'Bags',
  PRIMARY KEY (`fertilizer_id`),
  UNIQUE KEY `fertilizier_id_UNIQUE` (`fertilizer_id`),
  UNIQUE KEY `fertilizer_name_UNIQUE` (`fertilizer_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_table`
--

LOCK TABLES `fertilizer_table` WRITE;
/*!40000 ALTER TABLE `fertilizer_table` DISABLE KEYS */;
INSERT INTO `fertilizer_table` VALUES (1,'Urea 46-0-0','Concentrated Nitrogen',46,0,0,100,'Bags'),(2,'Fertilizer 16-20-0','Ammonium Phosphate Sulfate',16,20,0,55,'Bags'),(7,'Potash 0-0-60','Muriate of Potash',0,0,60,100,'Bags');
/*!40000 ALTER TABLE `fertilizer_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field_data_table`
--

DROP TABLE IF EXISTS `field_data_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field_data_table` (
  `field_data_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `cycle_id` int NOT NULL,
  PRIMARY KEY (`field_data_id`),
  UNIQUE KEY `field_data_id_UNIQUE` (`field_data_id`),
  KEY `field_data_to_cycle_idx` (`cycle_id`),
  KEY `field_data_to_farm_idx` (`farm_id`),
  CONSTRAINT `field_data_to_cycle` FOREIGN KEY (`cycle_id`) REFERENCES `crop_cycle_table` (`cycle_id`),
  CONSTRAINT `field_data_to_farm` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field_data_table`
--

LOCK TABLES `field_data_table` WRITE;
/*!40000 ALTER TABLE `field_data_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `field_data_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field_input_table`
--

DROP TABLE IF EXISTS `field_input_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field_input_table` (
  `input_id` int NOT NULL AUTO_INCREMENT,
  `field_data` int NOT NULL,
  `date_applied` datetime NOT NULL,
  `fertilizer_id` int DEFAULT NULL,
  `pesticide_id` int DEFAULT NULL,
  `amount` float NOT NULL,
  `applied_by` int NOT NULL,
  PRIMARY KEY (`input_id`),
  UNIQUE KEY `input_id_UNIQUE` (`input_id`),
  KEY `input_to_employee_applied_idx` (`applied_by`),
  KEY `fertilizer_to_input_idx` (`fertilizer_id`),
  KEY `pesticide_to_input_idx` (`pesticide_id`),
  CONSTRAINT `fertilizer_to_input` FOREIGN KEY (`fertilizer_id`) REFERENCES `fertilizer_table` (`fertilizer_id`),
  CONSTRAINT `input_to_employee_applied` FOREIGN KEY (`applied_by`) REFERENCES `employee_table` (`employee_id`),
  CONSTRAINT `pesticide_to_input` FOREIGN KEY (`pesticide_id`) REFERENCES `pesticide_table` (`pesticide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field_input_table`
--

LOCK TABLES `field_input_table` WRITE;
/*!40000 ALTER TABLE `field_input_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `field_input_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forecasted_yield`
--

DROP TABLE IF EXISTS `forecasted_yield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forecasted_yield` (
  `forecast_yield_id` int NOT NULL AUTO_INCREMENT,
  `calendar_id` int NOT NULL,
  `seed_id` int NOT NULL,
  `forecast` float DEFAULT NULL,
  `N` float DEFAULT NULL,
  `P` float DEFAULT NULL,
  `K` float DEFAULT NULL,
  `seed_rate` float DEFAULT NULL,
  `temp` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `pressure` float DEFAULT NULL,
  `rainfall` float DEFAULT NULL,
  `harvested` float DEFAULT NULL,
  PRIMARY KEY (`forecast_yield_id`),
  UNIQUE KEY `forecast_yield_id_UNIQUE` (`forecast_yield_id`),
  KEY `forecast_yield_fk_idx` (`calendar_id`),
  CONSTRAINT `forecast_yield_fk` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forecasted_yield`
--

LOCK TABLES `forecasted_yield` WRITE;
/*!40000 ALTER TABLE `forecasted_yield` DISABLE KEYS */;
INSERT INTO `forecasted_yield` VALUES (5,42,4,85,0,0,0,90,301.562,80.3003,1008.69,0.082763,90),(10,43,4,-1,0,0,0,90,301.17,79.3667,1009.64,0.0132197,100),(15,44,4,76,0,0,0,60,301.826,82.0776,1008.18,0.168501,80),(20,45,4,60,0,0,0,70,301.69,80.28,1008.46,0.11,60),(23,46,6,91,0,0,0,80,301.77,79.72,1008.37,0.1,90),(29,47,5,100,0,0,0,60,299.383,84.1302,1009.5,1.80477,100),(34,48,5,97,0,0,0,80,299.203,84.326,1010.51,1.59906,96),(37,49,7,68,0,0,0,50,299.135,84.5073,1009.85,1.88135,70),(44,50,5,46,0,0,0,80,299.54,84.33,1008.99,1.92,50),(50,51,4,73,0,0,0,50,299.36,83.96,1009.31,2.11,70),(55,52,4,58,0,0,0,50,302.002,77.0923,1009.38,0.9756,60),(57,53,7,97,0,0,0,45,302.017,77.0518,1009.55,0.953767,100),(63,54,6,91,0,0,0,50,302.198,78.207,1008.23,0.518693,95),(69,55,5,72,0,0,0,70,301.78,77.02,1009.82,0.94,70),(74,56,5,80,0,0,0,40,302.21,78.98,1008.54,0.49,80),(80,57,4,100,0,0,0,90,299.794,84.9359,1008.39,2.25626,100),(85,58,4,94,0,0,0,60,297.62,80,1015,0,90),(89,59,5,56,0,0,0,50,299.802,85.4969,1008.57,1.97756,60),(95,60,4,32,0,0,0,60,299.85,85.34,1008.53,1.94,30),(100,61,4,52,0,0,0,50,299.83,84.61,1008.6,2.3,50),(129,64,4,63,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(130,65,4,62,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(131,68,7,79,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `forecasted_yield` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `harvest_details`
--

DROP TABLE IF EXISTS `harvest_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `harvest_details` (
  `havest_id` int NOT NULL AUTO_INCREMENT,
  `sacks_harvested` float NOT NULL,
  `stage_harvested` varchar(45) NOT NULL,
  `type` enum('Early Harvest','Partial Harvest','Full Harvest') NOT NULL,
  `cct_id` int NOT NULL,
  PRIMARY KEY (`havest_id`),
  UNIQUE KEY `havest_id_UNIQUE` (`havest_id`),
  KEY `cct_id_idx` (`cct_id`),
  CONSTRAINT `cct_id` FOREIGN KEY (`cct_id`) REFERENCES `crop_calendar_table` (`calendar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `harvest_details`
--

LOCK TABLES `harvest_details` WRITE;
/*!40000 ALTER TABLE `harvest_details` DISABLE KEYS */;
INSERT INTO `harvest_details` VALUES (7,90,'Harvesting','Full Harvest',42),(8,100,'Harvesting','Full Harvest',43),(9,80,'Harvesting','Full Harvest',44),(10,60,'Harvesting','Full Harvest',45),(11,90,'Harvesting','Full Harvest',46),(12,100,'Harvesting','Full Harvest',47),(13,96,'Harvesting','Full Harvest',48),(14,70,'Harvesting','Full Harvest',49),(15,50,'Harvesting','Full Harvest',50),(16,70,'Harvesting','Full Harvest',51),(17,60,'Harvesting','Full Harvest',52),(18,100,'Harvesting','Full Harvest',53),(19,95,'Harvesting','Full Harvest',54),(20,70,'Harvesting','Full Harvest',55),(21,80,'Harvesting','Full Harvest',56),(23,100,'Harvesting','Full Harvest',57),(24,90,'Vegetation','Full Harvest',58),(25,60,'Harvesting','Full Harvest',59),(26,30,'Harvesting','Full Harvest',60),(27,50,'Harvesting','Full Harvest',61);
/*!40000 ALTER TABLE `harvest_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_table`
--

DROP TABLE IF EXISTS `notification_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_table` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `notification_title` varchar(45) DEFAULT NULL,
  `notification_desc` tinytext,
  `farm_id` int DEFAULT NULL,
  `url` tinytext,
  `icon` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `status` int DEFAULT '1',
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `farm_id_notif_idx` (`farm_id`),
  CONSTRAINT `farm_id_notif` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_table`
--

LOCK TABLES `notification_table` WRITE;
/*!40000 ALTER TABLE `notification_table` DISABLE KEYS */;
INSERT INTO `notification_table` VALUES (2,'2022-01-11','New Pest in farm 1',NULL,54,'/farms','bug','danger',0,NULL),(3,'2022-01-11','WO-149 Due today for Farm 1',NULL,54,'/farms','exclamation-triangle','warning',1,NULL),(4,'2022-01-11','WO-354 Overdue for Farm 1',NULL,54,'/farms','exclamation-triangle','danger',1,NULL),(5,'2022-01-11','New Pending purchase Farm 1',NULL,54,'/farms','money','primary',1,NULL),(6,'2022-01-14','New Pest/Disease diagnosed',NULL,54,'/pest_and_disease/diagnose_details?id=108','bug','danger',0,NULL),(7,'2022-01-17','Heavy Rainfall Alert','Expected heavy intensity rain on 2022-01-27',NULL,'/disaster_management','exclamation-triangle','danger',0,NULL),(10,'2022-01-17','Heavy Rainfall Alert','Expected heavy intensity rain on 2022-01-26',NULL,'/disaster_management','exclamation-triangle','danger',0,NULL),(11,'2022-01-17','Heavy Rainfall Alert','Expected heavy intensity rain on 2022-01-27',NULL,'/disaster_management','exclamation-triangle','danger',0,NULL),(12,'2022-01-19','Heavy Rainfall Alert','Expected heavy intensity rain on 2022-02-12',NULL,'/disaster_management','exclamation-triangle','danger',0,NULL),(13,'2022-01-19','Heavy Rainfall Alert','Expected heavy intensity rain on 2022-02-14',NULL,'/disaster_management','exclamation-triangle','danger',0,NULL),(14,'2022-01-21','Work Order due today: WO-625',NULL,54,'/farms/work_order&id=625','exclamation-triangle','warning',1,NULL),(15,'2022-01-21','Work Order due today: WO-607',NULL,54,'/farms/work_order&id=607','exclamation-triangle','warning',1,NULL),(16,'2022-01-21','Work Order due today: WO-584',NULL,57,'/farms/work_order&id=584','exclamation-triangle','warning',1,NULL),(17,'2022-01-23','Heavy Rainfall Alert','Expected heavy intensity rain on 2022-02-20',NULL,'/disaster_management','exclamation-triangle','danger',1,NULL),(130,'2022-01-28','Incoming work order: 644 due in a week','Fertilizer Application for LA Farm SOUTH with WO 644 due in a week',58,'/farms/work_order&id=644','exclamation-triangle','warning',1,NULL),(131,'2022-01-28','Overdue work order: 625','Overdue Use Biological control agents for Socoro Farm 1 with WO 625',54,'/farms/work_order&id=625','exclamation-triangle','danger',1,NULL);
/*!40000 ALTER TABLE `notification_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pd_probabilities`
--

DROP TABLE IF EXISTS `pd_probabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pd_probabilities` (
  `probability_id` int NOT NULL AUTO_INCREMENT,
  `pd_type` enum('Pest','Disease') DEFAULT NULL,
  `pd_id` int DEFAULT NULL,
  `probability` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `farm_id` int DEFAULT NULL,
  `calendar_id` int DEFAULT NULL,
  PRIMARY KEY (`probability_id`),
  KEY `farm_id_probabilities_idx` (`farm_id`),
  KEY `calendar_id_probability_idx` (`calendar_id`),
  CONSTRAINT `calendar_id_probability` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`),
  CONSTRAINT `farm_id_probabilities` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=691 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pd_probabilities`
--

LOCK TABLES `pd_probabilities` WRITE;
/*!40000 ALTER TABLE `pd_probabilities` DISABLE KEYS */;
INSERT INTO `pd_probabilities` VALUES (77,'Disease',2,38,'2022-01-05',54,42),(78,'Disease',4,38,'2022-01-05',54,42),(79,'Pest',1,38,'2022-01-05',54,42),(80,'Pest',5,38,'2022-01-05',54,42),(81,'Pest',10,38,'2022-01-05',54,42),(82,'Disease',1,25,'2022-01-05',54,42),(83,'Disease',5,25,'2022-01-05',54,42),(84,'Pest',3,25,'2022-01-05',54,42),(85,'Disease',3,13,'2022-01-05',54,42),(86,'Disease',6,13,'2022-01-05',54,42),(87,'Disease',7,13,'2022-01-05',54,42),(88,'Pest',2,13,'2022-01-05',54,42),(89,'Pest',4,13,'2022-01-05',54,42),(90,'Pest',6,13,'2022-01-05',54,42),(91,'Pest',8,13,'2022-01-05',54,42),(92,'Pest',9,13,'2022-01-05',54,42),(93,'Pest',5,50,'2022-01-05',55,43),(94,'Disease',2,38,'2022-01-05',55,43),(95,'Disease',4,38,'2022-01-05',55,43),(96,'Pest',10,38,'2022-01-05',55,43),(97,'Pest',1,38,'2022-01-05',55,43),(98,'Disease',5,25,'2022-01-05',55,43),(99,'Pest',3,25,'2022-01-05',55,43),(100,'Pest',6,25,'2022-01-05',55,43),(101,'Disease',1,13,'2022-01-05',55,43),(102,'Disease',3,13,'2022-01-05',55,43),(103,'Disease',6,13,'2022-01-05',55,43),(104,'Disease',7,13,'2022-01-05',55,43),(105,'Pest',2,13,'2022-01-05',55,43),(106,'Pest',4,13,'2022-01-05',55,43),(107,'Pest',8,13,'2022-01-05',55,43),(108,'Pest',9,13,'2022-01-05',55,43),(109,'Disease',2,38,'2022-01-05',56,44),(110,'Disease',4,38,'2022-01-05',56,44),(111,'Pest',10,38,'2022-01-05',56,44),(112,'Pest',1,38,'2022-01-05',56,44),(113,'Pest',5,38,'2022-01-05',56,44),(114,'Disease',1,25,'2022-01-05',56,44),(115,'Disease',5,25,'2022-01-05',56,44),(116,'Pest',3,25,'2022-01-05',56,44),(117,'Disease',3,13,'2022-01-05',56,44),(118,'Disease',6,13,'2022-01-05',56,44),(119,'Disease',7,13,'2022-01-05',56,44),(120,'Pest',2,13,'2022-01-05',56,44),(121,'Pest',4,13,'2022-01-05',56,44),(122,'Pest',6,13,'2022-01-05',56,44),(123,'Pest',8,13,'2022-01-05',56,44),(124,'Pest',9,13,'2022-01-05',56,44),(125,'Disease',2,38,'2022-01-05',57,45),(126,'Disease',4,38,'2022-01-05',57,45),(127,'Pest',1,38,'2022-01-05',57,45),(128,'Pest',5,38,'2022-01-05',57,45),(129,'Pest',10,38,'2022-01-05',57,45),(130,'Disease',1,25,'2022-01-05',57,45),(131,'Disease',5,25,'2022-01-05',57,45),(132,'Pest',3,25,'2022-01-05',57,45),(133,'Disease',3,13,'2022-01-05',57,45),(134,'Disease',6,13,'2022-01-05',57,45),(135,'Disease',7,13,'2022-01-05',57,45),(136,'Pest',2,13,'2022-01-05',57,45),(137,'Pest',4,13,'2022-01-05',57,45),(138,'Pest',6,13,'2022-01-05',57,45),(139,'Pest',8,13,'2022-01-05',57,45),(140,'Pest',9,13,'2022-01-05',57,45),(141,'Pest',7,13,'2022-01-05',54,47),(142,'Disease',2,38,'2022-01-05',58,51),(143,'Disease',5,38,'2022-01-05',58,51),(144,'Disease',4,38,'2022-01-05',58,51),(145,'Pest',1,38,'2022-01-05',58,51),(146,'Pest',5,38,'2022-01-05',58,51),(147,'Disease',1,25,'2022-01-05',58,51),(148,'Disease',3,25,'2022-01-05',58,51),(149,'Pest',3,25,'2022-01-05',58,51),(150,'Pest',4,25,'2022-01-05',58,51),(151,'Pest',8,25,'2022-01-05',58,51),(152,'Pest',9,25,'2022-01-05',58,51),(153,'Pest',10,25,'2022-01-05',58,51),(154,'Disease',6,13,'2022-01-05',58,51),(155,'Disease',7,13,'2022-01-05',58,51),(156,'Pest',2,13,'2022-01-05',58,51),(157,'Pest',6,13,'2022-01-05',58,51),(158,'Pest',7,13,'2022-01-05',55,53),(159,'Pest',7,13,'2022-01-05',56,54),(160,'Disease',2,50,'2022-01-12',58,46),(161,'Disease',4,38,'2022-01-12',58,46),(162,'Pest',1,38,'2022-01-12',58,46),(163,'Pest',5,38,'2022-01-12',58,46),(164,'Pest',10,38,'2022-01-12',58,46),(165,'Disease',1,25,'2022-01-12',58,46),(166,'Disease',5,25,'2022-01-12',58,46),(167,'Pest',2,25,'2022-01-12',58,46),(168,'Pest',3,25,'2022-01-12',58,46),(169,'Disease',3,13,'2022-01-12',58,46),(170,'Disease',6,13,'2022-01-12',58,46),(171,'Disease',7,13,'2022-01-12',58,46),(172,'Pest',4,13,'2022-01-12',58,46),(173,'Pest',6,13,'2022-01-12',58,46),(174,'Pest',7,13,'2022-01-12',58,46),(175,'Pest',8,13,'2022-01-12',58,46),(176,'Pest',9,13,'2022-01-12',58,46),(209,'Disease',2,30,'2022-01-14',57,64),(210,'Disease',4,30,'2022-01-14',57,64),(211,'Pest',1,30,'2022-01-14',57,64),(212,'Pest',5,30,'2022-01-14',57,64),(213,'Pest',10,30,'2022-01-14',57,64),(214,'Disease',1,20,'2022-01-14',57,64),(215,'Disease',5,20,'2022-01-14',57,64),(216,'Pest',3,20,'2022-01-14',57,64),(217,'Disease',3,10,'2022-01-14',57,64),(218,'Disease',6,10,'2022-01-14',57,64),(219,'Disease',7,10,'2022-01-14',57,64),(220,'Pest',2,10,'2022-01-14',57,64),(221,'Pest',4,10,'2022-01-14',57,64),(222,'Pest',6,10,'2022-01-14',57,64),(223,'Pest',8,10,'2022-01-14',57,64),(224,'Pest',9,10,'2022-01-14',57,64),(225,'Disease',2,30,'2022-01-14',54,65),(226,'Disease',4,30,'2022-01-14',54,65),(227,'Pest',1,30,'2022-01-14',54,65),(228,'Pest',5,30,'2022-01-14',54,65),(229,'Pest',10,30,'2022-01-14',54,65),(230,'Disease',1,20,'2022-01-14',54,65),(231,'Disease',5,20,'2022-01-14',54,65),(232,'Pest',3,20,'2022-01-14',54,65),(233,'Disease',3,10,'2022-01-14',54,65),(234,'Disease',6,10,'2022-01-14',54,65),(235,'Disease',7,10,'2022-01-14',54,65),(236,'Pest',2,10,'2022-01-14',54,65),(237,'Pest',4,10,'2022-01-14',54,65),(238,'Pest',6,10,'2022-01-14',54,65),(239,'Pest',8,10,'2022-01-14',54,65),(240,'Pest',9,10,'2022-01-14',54,65),(241,'Disease',2,30,'2022-01-16',54,65),(242,'Disease',4,30,'2022-01-16',54,65),(243,'Pest',1,30,'2022-01-16',54,65),(244,'Pest',5,30,'2022-01-16',54,65),(245,'Pest',10,30,'2022-01-16',54,65),(246,'Disease',1,20,'2022-01-16',54,65),(247,'Disease',5,20,'2022-01-16',54,65),(248,'Pest',3,20,'2022-01-16',54,65),(249,'Disease',3,10,'2022-01-16',54,65),(250,'Disease',6,10,'2022-01-16',54,65),(251,'Disease',7,10,'2022-01-16',54,65),(252,'Pest',2,10,'2022-01-16',54,65),(253,'Pest',4,10,'2022-01-16',54,65),(254,'Pest',6,10,'2022-01-16',54,65),(255,'Pest',8,10,'2022-01-16',54,65),(256,'Pest',9,10,'2022-01-16',54,65),(257,'Disease',2,30,'2022-01-16',57,64),(258,'Disease',4,30,'2022-01-16',57,64),(259,'Pest',10,30,'2022-01-16',57,64),(260,'Pest',1,30,'2022-01-16',57,64),(261,'Pest',5,30,'2022-01-16',57,64),(262,'Disease',1,20,'2022-01-16',57,64),(263,'Disease',5,20,'2022-01-16',57,64),(264,'Pest',3,20,'2022-01-16',57,64),(265,'Disease',3,10,'2022-01-16',57,64),(266,'Disease',6,10,'2022-01-16',57,64),(267,'Disease',7,10,'2022-01-16',57,64),(268,'Pest',2,10,'2022-01-16',57,64),(269,'Pest',4,10,'2022-01-16',57,64),(270,'Pest',6,10,'2022-01-16',57,64),(271,'Pest',8,10,'2022-01-16',57,64),(272,'Pest',9,10,'2022-01-16',57,64),(273,'Disease',2,30,'2022-01-17',54,65),(274,'Disease',4,30,'2022-01-17',54,65),(275,'Pest',1,30,'2022-01-17',54,65),(276,'Pest',5,30,'2022-01-17',54,65),(277,'Pest',10,30,'2022-01-17',54,65),(278,'Disease',1,20,'2022-01-17',54,65),(279,'Disease',5,20,'2022-01-17',54,65),(280,'Pest',3,20,'2022-01-17',54,65),(281,'Disease',3,10,'2022-01-17',54,65),(282,'Disease',6,10,'2022-01-17',54,65),(283,'Disease',7,10,'2022-01-17',54,65),(284,'Pest',2,10,'2022-01-17',54,65),(285,'Pest',4,10,'2022-01-17',54,65),(286,'Pest',6,10,'2022-01-17',54,65),(287,'Pest',8,10,'2022-01-17',54,65),(288,'Pest',9,10,'2022-01-17',54,65),(289,'Disease',2,30,'2022-01-17',57,64),(290,'Disease',4,30,'2022-01-17',57,64),(291,'Pest',10,30,'2022-01-17',57,64),(292,'Pest',1,30,'2022-01-17',57,64),(293,'Pest',5,30,'2022-01-17',57,64),(294,'Disease',1,20,'2022-01-17',57,64),(295,'Disease',5,20,'2022-01-17',57,64),(296,'Pest',3,20,'2022-01-17',57,64),(297,'Disease',3,10,'2022-01-17',57,64),(298,'Disease',6,10,'2022-01-17',57,64),(299,'Disease',7,10,'2022-01-17',57,64),(300,'Pest',2,10,'2022-01-17',57,64),(301,'Pest',4,10,'2022-01-17',57,64),(302,'Pest',6,10,'2022-01-17',57,64),(303,'Pest',8,10,'2022-01-17',57,64),(304,'Pest',9,10,'2022-01-17',57,64),(305,'Disease',2,30,'2022-01-18',54,65),(306,'Disease',4,30,'2022-01-18',54,65),(307,'Pest',1,30,'2022-01-18',54,65),(308,'Pest',5,30,'2022-01-18',54,65),(309,'Pest',10,30,'2022-01-18',54,65),(310,'Disease',1,20,'2022-01-18',54,65),(311,'Disease',5,20,'2022-01-18',54,65),(312,'Pest',3,20,'2022-01-18',54,65),(313,'Disease',3,10,'2022-01-18',54,65),(314,'Disease',6,10,'2022-01-18',54,65),(315,'Disease',7,10,'2022-01-18',54,65),(316,'Pest',2,10,'2022-01-18',54,65),(317,'Pest',4,10,'2022-01-18',54,65),(318,'Pest',6,10,'2022-01-18',54,65),(319,'Pest',8,10,'2022-01-18',54,65),(320,'Pest',9,10,'2022-01-18',54,65),(321,'Disease',2,30,'2022-01-18',57,64),(322,'Disease',4,30,'2022-01-18',57,64),(323,'Pest',10,30,'2022-01-18',57,64),(324,'Pest',1,30,'2022-01-18',57,64),(325,'Pest',5,30,'2022-01-18',57,64),(326,'Disease',1,20,'2022-01-18',57,64),(327,'Disease',5,20,'2022-01-18',57,64),(328,'Pest',3,20,'2022-01-18',57,64),(329,'Disease',3,10,'2022-01-18',57,64),(330,'Disease',6,10,'2022-01-18',57,64),(331,'Disease',7,10,'2022-01-18',57,64),(332,'Pest',2,10,'2022-01-18',57,64),(333,'Pest',4,10,'2022-01-18',57,64),(334,'Pest',6,10,'2022-01-18',57,64),(335,'Pest',8,10,'2022-01-18',57,64),(336,'Pest',9,10,'2022-01-18',57,64),(337,'Disease',2,30,'2022-01-19',54,65),(338,'Disease',4,30,'2022-01-19',54,65),(339,'Pest',1,30,'2022-01-19',54,65),(340,'Pest',5,30,'2022-01-19',54,65),(341,'Pest',10,30,'2022-01-19',54,65),(342,'Disease',1,20,'2022-01-19',54,65),(343,'Disease',5,20,'2022-01-19',54,65),(344,'Pest',3,20,'2022-01-19',54,65),(345,'Disease',3,10,'2022-01-19',54,65),(346,'Disease',6,10,'2022-01-19',54,65),(347,'Disease',7,10,'2022-01-19',54,65),(348,'Pest',2,10,'2022-01-19',54,65),(349,'Pest',4,10,'2022-01-19',54,65),(350,'Pest',6,10,'2022-01-19',54,65),(351,'Pest',8,10,'2022-01-19',54,65),(352,'Pest',9,10,'2022-01-19',54,65),(353,'Disease',2,30,'2022-01-19',57,64),(354,'Disease',4,30,'2022-01-19',57,64),(355,'Pest',10,30,'2022-01-19',57,64),(356,'Pest',1,30,'2022-01-19',57,64),(357,'Pest',5,30,'2022-01-19',57,64),(358,'Disease',1,20,'2022-01-19',57,64),(359,'Disease',5,20,'2022-01-19',57,64),(360,'Pest',3,20,'2022-01-19',57,64),(361,'Disease',3,10,'2022-01-19',57,64),(362,'Disease',6,10,'2022-01-19',57,64),(363,'Disease',7,10,'2022-01-19',57,64),(364,'Pest',2,10,'2022-01-19',57,64),(365,'Pest',4,10,'2022-01-19',57,64),(366,'Pest',6,10,'2022-01-19',57,64),(367,'Pest',8,10,'2022-01-19',57,64),(368,'Pest',9,10,'2022-01-19',57,64),(369,'Disease',2,30,'2022-01-20',54,65),(370,'Disease',4,30,'2022-01-20',54,65),(371,'Pest',1,30,'2022-01-20',54,65),(372,'Pest',5,30,'2022-01-20',54,65),(373,'Pest',10,30,'2022-01-20',54,65),(374,'Disease',1,20,'2022-01-20',54,65),(375,'Disease',5,20,'2022-01-20',54,65),(376,'Pest',3,20,'2022-01-20',54,65),(377,'Disease',3,10,'2022-01-20',54,65),(378,'Disease',6,10,'2022-01-20',54,65),(379,'Disease',7,10,'2022-01-20',54,65),(380,'Pest',2,10,'2022-01-20',54,65),(381,'Pest',4,10,'2022-01-20',54,65),(382,'Pest',6,10,'2022-01-20',54,65),(383,'Pest',8,10,'2022-01-20',54,65),(384,'Pest',9,10,'2022-01-20',54,65),(385,'Disease',2,30,'2022-01-20',57,64),(386,'Disease',4,30,'2022-01-20',57,64),(387,'Pest',10,30,'2022-01-20',57,64),(388,'Pest',1,30,'2022-01-20',57,64),(389,'Pest',5,30,'2022-01-20',57,64),(390,'Disease',1,20,'2022-01-20',57,64),(391,'Disease',5,20,'2022-01-20',57,64),(392,'Pest',3,20,'2022-01-20',57,64),(393,'Disease',3,10,'2022-01-20',57,64),(394,'Disease',6,10,'2022-01-20',57,64),(395,'Disease',7,10,'2022-01-20',57,64),(396,'Pest',2,10,'2022-01-20',57,64),(397,'Pest',4,10,'2022-01-20',57,64),(398,'Pest',6,10,'2022-01-20',57,64),(399,'Pest',8,10,'2022-01-20',57,64),(400,'Pest',9,10,'2022-01-20',57,64),(401,'Disease',2,30,'2022-01-21',54,65),(402,'Disease',4,30,'2022-01-21',54,65),(403,'Pest',1,30,'2022-01-21',54,65),(404,'Pest',5,30,'2022-01-21',54,65),(405,'Pest',10,30,'2022-01-21',54,65),(406,'Disease',1,20,'2022-01-21',54,65),(407,'Disease',5,20,'2022-01-21',54,65),(408,'Pest',3,20,'2022-01-21',54,65),(409,'Disease',3,10,'2022-01-21',54,65),(410,'Disease',6,10,'2022-01-21',54,65),(411,'Disease',7,10,'2022-01-21',54,65),(412,'Pest',2,10,'2022-01-21',54,65),(413,'Pest',4,10,'2022-01-21',54,65),(414,'Pest',6,10,'2022-01-21',54,65),(415,'Pest',8,10,'2022-01-21',54,65),(416,'Pest',9,10,'2022-01-21',54,65),(417,'Disease',2,30,'2022-01-21',57,64),(418,'Disease',4,30,'2022-01-21',57,64),(419,'Pest',10,30,'2022-01-21',57,64),(420,'Pest',1,30,'2022-01-21',57,64),(421,'Pest',5,30,'2022-01-21',57,64),(422,'Disease',1,20,'2022-01-21',57,64),(423,'Disease',5,20,'2022-01-21',57,64),(424,'Pest',3,20,'2022-01-21',57,64),(425,'Disease',3,10,'2022-01-21',57,64),(426,'Disease',6,10,'2022-01-21',57,64),(427,'Disease',7,10,'2022-01-21',57,64),(428,'Pest',2,10,'2022-01-21',57,64),(429,'Pest',4,10,'2022-01-21',57,64),(430,'Pest',6,10,'2022-01-21',57,64),(431,'Pest',8,10,'2022-01-21',57,64),(432,'Pest',9,10,'2022-01-21',57,64),(433,'Disease',2,30,'2022-01-23',54,65),(434,'Disease',4,30,'2022-01-23',54,65),(435,'Pest',1,30,'2022-01-23',54,65),(436,'Pest',5,30,'2022-01-23',54,65),(437,'Pest',10,30,'2022-01-23',54,65),(438,'Disease',1,20,'2022-01-23',54,65),(439,'Disease',5,20,'2022-01-23',54,65),(440,'Pest',3,20,'2022-01-23',54,65),(441,'Disease',3,10,'2022-01-23',54,65),(442,'Disease',6,10,'2022-01-23',54,65),(443,'Disease',7,10,'2022-01-23',54,65),(444,'Pest',2,10,'2022-01-23',54,65),(445,'Pest',4,10,'2022-01-23',54,65),(446,'Pest',6,10,'2022-01-23',54,65),(447,'Pest',8,10,'2022-01-23',54,65),(448,'Pest',9,10,'2022-01-23',54,65),(449,'Disease',2,30,'2022-01-23',57,64),(450,'Disease',5,30,'2022-01-23',57,64),(451,'Disease',4,30,'2022-01-23',57,64),(452,'Pest',1,30,'2022-01-23',57,64),(453,'Pest',5,30,'2022-01-23',57,64),(454,'Disease',1,20,'2022-01-23',57,64),(455,'Disease',3,20,'2022-01-23',57,64),(456,'Pest',3,20,'2022-01-23',57,64),(457,'Pest',4,20,'2022-01-23',57,64),(458,'Pest',8,20,'2022-01-23',57,64),(459,'Pest',9,20,'2022-01-23',57,64),(460,'Pest',10,20,'2022-01-23',57,64),(461,'Disease',6,10,'2022-01-23',57,64),(462,'Disease',7,10,'2022-01-23',57,64),(463,'Pest',2,10,'2022-01-23',57,64),(464,'Pest',6,10,'2022-01-23',57,64),(465,'Disease',2,30,'2022-01-24',54,65),(466,'Disease',4,30,'2022-01-24',54,65),(467,'Pest',1,30,'2022-01-24',54,65),(468,'Pest',5,30,'2022-01-24',54,65),(469,'Pest',10,30,'2022-01-24',54,65),(470,'Disease',1,20,'2022-01-24',54,65),(471,'Disease',5,20,'2022-01-24',54,65),(472,'Pest',3,20,'2022-01-24',54,65),(473,'Disease',3,10,'2022-01-24',54,65),(474,'Disease',6,10,'2022-01-24',54,65),(475,'Disease',7,10,'2022-01-24',54,65),(476,'Pest',2,10,'2022-01-24',54,65),(477,'Pest',4,10,'2022-01-24',54,65),(478,'Pest',6,10,'2022-01-24',54,65),(479,'Pest',8,10,'2022-01-24',54,65),(480,'Pest',9,10,'2022-01-24',54,65),(481,'Disease',2,30,'2022-01-24',57,64),(482,'Disease',5,30,'2022-01-24',57,64),(483,'Disease',4,30,'2022-01-24',57,64),(484,'Pest',1,30,'2022-01-24',57,64),(485,'Pest',5,30,'2022-01-24',57,64),(486,'Disease',1,20,'2022-01-24',57,64),(487,'Disease',3,20,'2022-01-24',57,64),(488,'Pest',3,20,'2022-01-24',57,64),(489,'Pest',4,20,'2022-01-24',57,64),(490,'Pest',8,20,'2022-01-24',57,64),(491,'Pest',9,20,'2022-01-24',57,64),(492,'Pest',10,20,'2022-01-24',57,64),(493,'Disease',6,10,'2022-01-24',57,64),(494,'Disease',7,10,'2022-01-24',57,64),(495,'Pest',2,10,'2022-01-24',57,64),(496,'Pest',6,10,'2022-01-24',57,64),(497,'Disease',2,30,'2022-01-25',54,65),(498,'Disease',4,30,'2022-01-25',54,65),(499,'Pest',1,30,'2022-01-25',54,65),(500,'Pest',5,30,'2022-01-25',54,65),(501,'Pest',10,30,'2022-01-25',54,65),(502,'Disease',1,20,'2022-01-25',54,65),(503,'Disease',5,20,'2022-01-25',54,65),(504,'Pest',3,20,'2022-01-25',54,65),(505,'Disease',3,10,'2022-01-25',54,65),(506,'Disease',6,10,'2022-01-25',54,65),(507,'Disease',7,10,'2022-01-25',54,65),(508,'Pest',2,10,'2022-01-25',54,65),(509,'Pest',4,10,'2022-01-25',54,65),(510,'Pest',6,10,'2022-01-25',54,65),(511,'Pest',8,10,'2022-01-25',54,65),(512,'Pest',9,10,'2022-01-25',54,65),(513,'Disease',2,30,'2022-01-25',57,64),(514,'Disease',5,30,'2022-01-25',57,64),(515,'Disease',4,30,'2022-01-25',57,64),(516,'Pest',1,30,'2022-01-25',57,64),(517,'Pest',5,30,'2022-01-25',57,64),(518,'Disease',1,20,'2022-01-25',57,64),(519,'Disease',3,20,'2022-01-25',57,64),(520,'Pest',3,20,'2022-01-25',57,64),(521,'Pest',4,20,'2022-01-25',57,64),(522,'Pest',8,20,'2022-01-25',57,64),(523,'Pest',9,20,'2022-01-25',57,64),(524,'Pest',10,20,'2022-01-25',57,64),(525,'Disease',6,10,'2022-01-25',57,64),(526,'Disease',7,10,'2022-01-25',57,64),(527,'Pest',2,10,'2022-01-25',57,64),(528,'Pest',6,10,'2022-01-25',57,64),(529,'Disease',2,30,'2022-01-26',54,65),(530,'Disease',4,30,'2022-01-26',54,65),(531,'Pest',1,30,'2022-01-26',54,65),(532,'Pest',5,30,'2022-01-26',54,65),(533,'Pest',10,30,'2022-01-26',54,65),(534,'Disease',1,20,'2022-01-26',54,65),(535,'Disease',5,20,'2022-01-26',54,65),(536,'Pest',3,20,'2022-01-26',54,65),(537,'Disease',3,10,'2022-01-26',54,65),(538,'Disease',6,10,'2022-01-26',54,65),(539,'Disease',7,10,'2022-01-26',54,65),(540,'Pest',2,10,'2022-01-26',54,65),(541,'Pest',4,10,'2022-01-26',54,65),(542,'Pest',6,10,'2022-01-26',54,65),(543,'Pest',8,10,'2022-01-26',54,65),(544,'Pest',9,10,'2022-01-26',54,65),(545,'Disease',2,30,'2022-01-26',57,64),(546,'Disease',5,30,'2022-01-26',57,64),(547,'Disease',4,30,'2022-01-26',57,64),(548,'Pest',1,30,'2022-01-26',57,64),(549,'Pest',5,30,'2022-01-26',57,64),(550,'Disease',1,20,'2022-01-26',57,64),(551,'Disease',3,20,'2022-01-26',57,64),(552,'Pest',3,20,'2022-01-26',57,64),(553,'Pest',4,20,'2022-01-26',57,64),(554,'Pest',8,20,'2022-01-26',57,64),(555,'Pest',9,20,'2022-01-26',57,64),(556,'Pest',10,20,'2022-01-26',57,64),(557,'Disease',6,10,'2022-01-26',57,64),(558,'Disease',7,10,'2022-01-26',57,64),(559,'Pest',2,10,'2022-01-26',57,64),(560,'Pest',6,10,'2022-01-26',57,64),(561,'Disease',2,30,'2022-01-27',54,65),(562,'Disease',4,30,'2022-01-27',54,65),(563,'Pest',1,30,'2022-01-27',54,65),(564,'Pest',5,30,'2022-01-27',54,65),(565,'Pest',10,30,'2022-01-27',54,65),(566,'Disease',1,20,'2022-01-27',54,65),(567,'Disease',5,20,'2022-01-27',54,65),(568,'Pest',3,20,'2022-01-27',54,65),(569,'Disease',3,10,'2022-01-27',54,65),(570,'Disease',6,10,'2022-01-27',54,65),(571,'Disease',7,10,'2022-01-27',54,65),(572,'Pest',2,10,'2022-01-27',54,65),(573,'Pest',4,10,'2022-01-27',54,65),(574,'Pest',6,10,'2022-01-27',54,65),(575,'Pest',8,10,'2022-01-27',54,65),(576,'Pest',9,10,'2022-01-27',54,65),(577,'Disease',2,30,'2022-01-27',57,64),(578,'Disease',5,30,'2022-01-27',57,64),(579,'Disease',4,30,'2022-01-27',57,64),(580,'Pest',1,30,'2022-01-27',57,64),(581,'Pest',5,30,'2022-01-27',57,64),(582,'Disease',1,20,'2022-01-27',57,64),(583,'Disease',3,20,'2022-01-27',57,64),(584,'Pest',3,20,'2022-01-27',57,64),(585,'Pest',4,20,'2022-01-27',57,64),(586,'Pest',8,20,'2022-01-27',57,64),(587,'Pest',9,20,'2022-01-27',57,64),(588,'Pest',10,20,'2022-01-27',57,64),(589,'Disease',6,10,'2022-01-27',57,64),(590,'Disease',7,10,'2022-01-27',57,64),(591,'Pest',2,10,'2022-01-27',57,64),(592,'Pest',6,10,'2022-01-27',57,64),(593,'Disease',2,30,'2022-01-27',59,67),(594,'Disease',4,30,'2022-01-27',59,67),(595,'Pest',10,30,'2022-01-27',59,67),(596,'Pest',1,30,'2022-01-27',59,67),(597,'Pest',5,30,'2022-01-27',59,67),(598,'Disease',1,20,'2022-01-27',59,67),(599,'Disease',5,20,'2022-01-27',59,67),(600,'Pest',3,20,'2022-01-27',59,67),(601,'Disease',3,10,'2022-01-27',59,67),(602,'Disease',6,10,'2022-01-27',59,67),(603,'Disease',7,10,'2022-01-27',59,67),(604,'Pest',2,10,'2022-01-27',59,67),(605,'Pest',4,10,'2022-01-27',59,67),(606,'Pest',6,10,'2022-01-27',59,67),(607,'Pest',8,10,'2022-01-27',59,67),(608,'Pest',9,10,'2022-01-27',59,67),(609,'Disease',2,30,'2022-01-27',58,68),(610,'Disease',5,30,'2022-01-27',58,68),(611,'Disease',4,30,'2022-01-27',58,68),(612,'Pest',10,30,'2022-01-27',58,68),(613,'Pest',1,30,'2022-01-27',58,68),(614,'Pest',5,30,'2022-01-27',58,68),(615,'Disease',1,20,'2022-01-27',58,68),(616,'Disease',3,20,'2022-01-27',58,68),(617,'Pest',2,20,'2022-01-27',58,68),(618,'Pest',3,20,'2022-01-27',58,68),(619,'Pest',4,20,'2022-01-27',58,68),(620,'Pest',8,20,'2022-01-27',58,68),(621,'Pest',9,20,'2022-01-27',58,68),(622,'Disease',6,10,'2022-01-27',58,68),(623,'Disease',7,10,'2022-01-27',58,68),(624,'Pest',6,10,'2022-01-27',58,68),(625,'Pest',7,10,'2022-01-27',58,68),(626,'Disease',2,30,'2022-01-28',54,65),(627,'Disease',4,30,'2022-01-28',54,65),(628,'Pest',1,30,'2022-01-28',54,65),(629,'Pest',5,30,'2022-01-28',54,65),(630,'Disease',1,20,'2022-01-28',54,65),(631,'Disease',5,20,'2022-01-28',54,65),(632,'Disease',7,20,'2022-01-28',54,65),(633,'Pest',3,20,'2022-01-28',54,65),(634,'Pest',10,20,'2022-01-28',54,65),(635,'Disease',3,10,'2022-01-28',54,65),(636,'Disease',6,10,'2022-01-28',54,65),(637,'Pest',2,10,'2022-01-28',54,65),(638,'Pest',4,10,'2022-01-28',54,65),(639,'Pest',6,10,'2022-01-28',54,65),(640,'Pest',8,10,'2022-01-28',54,65),(641,'Pest',9,10,'2022-01-28',54,65),(642,'Disease',2,30,'2022-01-28',57,64),(643,'Disease',4,30,'2022-01-28',57,64),(644,'Pest',1,30,'2022-01-28',57,64),(645,'Pest',5,30,'2022-01-28',57,64),(646,'Disease',1,20,'2022-01-28',57,64),(647,'Disease',5,20,'2022-01-28',57,64),(648,'Disease',7,20,'2022-01-28',57,64),(649,'Pest',3,20,'2022-01-28',57,64),(650,'Pest',10,20,'2022-01-28',57,64),(651,'Disease',3,10,'2022-01-28',57,64),(652,'Disease',6,10,'2022-01-28',57,64),(653,'Pest',2,10,'2022-01-28',57,64),(654,'Pest',4,10,'2022-01-28',57,64),(655,'Pest',6,10,'2022-01-28',57,64),(656,'Pest',8,10,'2022-01-28',57,64),(657,'Pest',9,10,'2022-01-28',57,64),(658,'Disease',2,30,'2022-01-28',58,68),(659,'Disease',5,30,'2022-01-28',58,68),(660,'Disease',4,30,'2022-01-28',58,68),(661,'Pest',10,30,'2022-01-28',58,68),(662,'Pest',1,30,'2022-01-28',58,68),(663,'Pest',5,30,'2022-01-28',58,68),(664,'Disease',1,20,'2022-01-28',58,68),(665,'Disease',3,20,'2022-01-28',58,68),(666,'Pest',2,20,'2022-01-28',58,68),(667,'Pest',3,20,'2022-01-28',58,68),(668,'Pest',4,20,'2022-01-28',58,68),(669,'Pest',8,20,'2022-01-28',58,68),(670,'Pest',9,20,'2022-01-28',58,68),(671,'Disease',6,10,'2022-01-28',58,68),(672,'Disease',7,10,'2022-01-28',58,68),(673,'Pest',6,10,'2022-01-28',58,68),(674,'Pest',7,10,'2022-01-28',58,68),(675,'Disease',2,30,'2022-01-28',59,67),(676,'Disease',4,30,'2022-01-28',59,67),(677,'Pest',1,30,'2022-01-28',59,67),(678,'Pest',5,30,'2022-01-28',59,67),(679,'Disease',1,20,'2022-01-28',59,67),(680,'Disease',5,20,'2022-01-28',59,67),(681,'Disease',7,20,'2022-01-28',59,67),(682,'Pest',3,20,'2022-01-28',59,67),(683,'Pest',10,20,'2022-01-28',59,67),(684,'Disease',3,10,'2022-01-28',59,67),(685,'Disease',6,10,'2022-01-28',59,67),(686,'Pest',2,10,'2022-01-28',59,67),(687,'Pest',4,10,'2022-01-28',59,67),(688,'Pest',6,10,'2022-01-28',59,67),(689,'Pest',8,10,'2022-01-28',59,67),(690,'Pest',9,10,'2022-01-28',59,67);
/*!40000 ALTER TABLE `pd_probabilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pd_recommendation`
--

DROP TABLE IF EXISTS `pd_recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pd_recommendation` (
  `pd_recommendation_id` int NOT NULL AUTO_INCREMENT,
  `pd_id` int DEFAULT NULL,
  `pd_type` enum('Pest','Disease') DEFAULT NULL,
  `diagnosis_id` int DEFAULT NULL,
  `calendar_id` int DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_completed` date DEFAULT NULL,
  `solution_id` int DEFAULT NULL,
  PRIMARY KEY (`pd_recommendation_id`),
  KEY `pest_recom_idx` (`pd_id`),
  KEY `diagnoses_recom_idx` (`diagnosis_id`),
  KEY `calendar_recom_idx` (`calendar_id`),
  KEY `solution_pest_idx` (`solution_id`),
  CONSTRAINT `calendar_recom` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`),
  CONSTRAINT `diagnoses_recom` FOREIGN KEY (`diagnosis_id`) REFERENCES `diagnosis` (`diagnosis_id`),
  CONSTRAINT `disease_recom` FOREIGN KEY (`pd_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `pest_recom` FOREIGN KEY (`pd_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `solution_pest` FOREIGN KEY (`solution_id`) REFERENCES `solution_pest` (`solution_pest_id`),
  CONSTRAINT `solutionb_dis` FOREIGN KEY (`solution_id`) REFERENCES `solution_disease` (`solution_disease`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pd_recommendation`
--

LOCK TABLES `pd_recommendation` WRITE;
/*!40000 ALTER TABLE `pd_recommendation` DISABLE KEYS */;
/*!40000 ALTER TABLE `pd_recommendation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pest_table`
--

DROP TABLE IF EXISTS `pest_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pest_table` (
  `pest_id` int NOT NULL AUTO_INCREMENT,
  `pest_name` varchar(45) NOT NULL,
  `pest_desc` tinytext NOT NULL,
  `scientific_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pest_id`),
  UNIQUE KEY `pest_name_UNIQUE` (`pest_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pest_table`
--

LOCK TABLES `pest_table` WRITE;
/*!40000 ALTER TABLE `pest_table` DISABLE KEYS */;
INSERT INTO `pest_table` VALUES (1,'Rats','Rodents running around the farm','Rattus'),(2,'Rice Hispa','Rice hispa scrapes the upper surface of leaf blades leaving only the lower epidermis.','Dicladispa armigera'),(3,'Rice Caseworm','Rice caseworms or case bearers cut off leaf tips to make leaf cases. ','Nymphula depunctalis '),(4,'Zigzag leafhopper','Feeding damage of zigzag leaf hopper causes the leaf tips to dry up, and whole leaves to become orange and curled.','Recilia dorsalis'),(5,'Mealy bug','Both adult and nymph mealybugs remove plant sap by sucking. ','Brevennia rehi'),(6,'Mole cricket','Mole crickets feed on seeds, tillers in mature plants, and roots. ','Gryllotalpa orientalis'),(7,'Ant','Ants feed on rice seeds and seedlings.','Solenopsis geminata'),(8,'Greenhorned caterpillar','Larvae of green horned caterpillars feed on leaf margins and leaf blades.','Mycalesis sp.'),(9,'Planthopper','High population of planthoppers cause leaves to initially turn orange-yellow before becoming brown and dry and this is a condition called hopperburn that kills the plant.','Nilaparvata lugens'),(10,'Rice gall midge','Rice gall midge forms a tubular gall at the base of tillers, causing elongation of leaf sheaths called onion leaf or silver shoot.','Orseolia oryzae');
/*!40000 ALTER TABLE `pest_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pesticide_table`
--

DROP TABLE IF EXISTS `pesticide_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pesticide_table` (
  `pesticide_id` int NOT NULL AUTO_INCREMENT,
  `pesticide_name` varchar(20) NOT NULL,
  `pesticide_desc` tinytext,
  `units` varchar(45) NOT NULL DEFAULT 'Bags',
  PRIMARY KEY (`pesticide_id`),
  UNIQUE KEY `pesticide_id_UNIQUE` (`pesticide_id`),
  UNIQUE KEY `pesticide_name_UNIQUE` (`pesticide_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pesticide_table`
--

LOCK TABLES `pesticide_table` WRITE;
/*!40000 ALTER TABLE `pesticide_table` DISABLE KEYS */;
INSERT INTO `pesticide_table` VALUES (6,'Fipronil','For Stem border','Bags'),(7,'Flubendiamide','For Stem border','Bags'),(8,'Thiamethoxam','For leaf holders','Bags'),(9,'Spinetoram','For leaf holders','Bags'),(10,'Zineb','Used for diseases','Bags'),(11,'Hexaconazol','Used for diseases','Bags'),(12,'Tricyclazole','Used for diseases','Bags');
/*!40000 ALTER TABLE `pesticide_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pesticide_usage`
--

DROP TABLE IF EXISTS `pesticide_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pesticide_usage` (
  `pesticide_usage_id` int NOT NULL AUTO_INCREMENT,
  `pesticide_id` int NOT NULL,
  `farm_id` int DEFAULT NULL,
  `calendar_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `date_used` date DEFAULT NULL,
  PRIMARY KEY (`pesticide_usage_id`),
  KEY `pesticide_id_usage_idx` (`pesticide_id`),
  KEY `farm_id_pesticide_idx` (`farm_id`),
  KEY `calendar_id_pesticide_usage_idx` (`calendar_id`),
  CONSTRAINT `calendar_id_pesticide_usage` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`),
  CONSTRAINT `farm_id_pesticide` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`),
  CONSTRAINT `pesticide_id_usage` FOREIGN KEY (`pesticide_id`) REFERENCES `pesticide_table` (`pesticide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pesticide_usage`
--

LOCK TABLES `pesticide_usage` WRITE;
/*!40000 ALTER TABLE `pesticide_usage` DISABLE KEYS */;
INSERT INTO `pesticide_usage` VALUES (7,7,54,NULL,5,'2022-01-09'),(8,9,54,NULL,5,'2019-05-05'),(9,11,54,NULL,5,'2019-06-03'),(10,7,55,NULL,5,'2019-05-09'),(11,7,55,NULL,5,'2019-05-30'),(12,9,56,NULL,5,'2022-01-09'),(13,11,56,NULL,5,'2019-06-14'),(14,7,57,NULL,5,'2019-05-18'),(15,11,57,NULL,5,'2019-06-11'),(16,9,54,NULL,5,'2019-11-13'),(17,7,55,NULL,5,'2019-10-22'),(18,7,56,NULL,5,'2019-10-24'),(19,11,57,NULL,5,'2019-10-31'),(20,7,57,NULL,5,'2019-11-09'),(21,9,58,NULL,5,'2019-12-20'),(22,11,58,NULL,5,'2019-12-29'),(23,11,54,NULL,5,'2022-05-24'),(24,9,56,NULL,5,'2020-05-11'),(25,7,56,NULL,5,'2020-06-03'),(26,11,57,NULL,5,'2020-04-14'),(27,9,54,NULL,5,'2020-09-17'),(28,11,56,NULL,5,'2020-10-09'),(29,6,57,NULL,5,'2020-10-21'),(30,11,58,NULL,5,'2020-11-06');
/*!40000 ALTER TABLE `pesticide_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prevention_disease`
--

DROP TABLE IF EXISTS `prevention_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prevention_disease` (
  `prevention_disease_id` int NOT NULL AUTO_INCREMENT,
  `prevention_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`prevention_disease_id`),
  KEY `fk_disease_table_has_prevention_table_prevention_table1_idx` (`prevention_id`),
  KEY `fk_disease_table_has_prevention_table_disease_table1_idx` (`disease_id`),
  CONSTRAINT `fk_disease_table_has_prevention_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_disease_table_has_prevention_table_prevention_table1` FOREIGN KEY (`prevention_id`) REFERENCES `prevention_table` (`prevention_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prevention_disease`
--

LOCK TABLES `prevention_disease` WRITE;
/*!40000 ALTER TABLE `prevention_disease` DISABLE KEYS */;
INSERT INTO `prevention_disease` VALUES (3,4,1),(4,9,1),(5,10,2),(6,4,2),(7,2,2),(8,11,3),(9,8,3),(10,11,4),(11,10,4),(12,2,5),(13,10,5),(14,8,6),(15,2,7),(16,10,7);
/*!40000 ALTER TABLE `prevention_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prevention_pest`
--

DROP TABLE IF EXISTS `prevention_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prevention_pest` (
  `prevention_pest_id` int NOT NULL AUTO_INCREMENT,
  `pest_id` int NOT NULL,
  `prevention_id` int NOT NULL,
  PRIMARY KEY (`prevention_pest_id`),
  KEY `fk_pest_table_has_prevention_table_prevention_table1_idx` (`prevention_id`),
  KEY `fk_pest_table_has_prevention_table_pest_table1` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_prevention_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_prevention_table_prevention_table1` FOREIGN KEY (`prevention_id`) REFERENCES `prevention_table` (`prevention_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prevention_pest`
--

LOCK TABLES `prevention_pest` WRITE;
/*!40000 ALTER TABLE `prevention_pest` DISABLE KEYS */;
INSERT INTO `prevention_pest` VALUES (14,1,1),(15,1,2),(16,2,6),(17,3,1),(18,3,4),(19,3,5),(20,2,3),(21,3,6),(22,4,2),(23,5,6),(24,6,6),(25,6,2),(26,7,2),(27,7,7),(28,8,6),(29,9,2),(30,9,6),(31,10,5),(32,10,6);
/*!40000 ALTER TABLE `prevention_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prevention_table`
--

DROP TABLE IF EXISTS `prevention_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prevention_table` (
  `prevention_id` int NOT NULL AUTO_INCREMENT,
  `prevention_name` varchar(45) NOT NULL,
  `prevention_desc` tinytext NOT NULL,
  PRIMARY KEY (`prevention_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prevention_table`
--

LOCK TABLES `prevention_table` WRITE;
/*!40000 ALTER TABLE `prevention_table` DISABLE KEYS */;
INSERT INTO `prevention_table` VALUES (1,'Provide space','Provide space between plants.'),(2,'Clean area','Keep earea and fields clean.'),(3,'Cut shoot tips','Cut shoot tips to prevent production.'),(4,'Drain the field','Drain field to prevent production.'),(5,'Grow a ratoon','Grow a ratoon.'),(6,'Use Biological control agents','Encourage biological control agents: snails (feed on eggs), hydrophilid and dytiscid water beetles (feed on larvae), spiders, dragonflies'),(7,'Use physical barriers','Physical barriers such as ant fences running parallel to the field periphery are partially successful in keeping ants out of the field.'),(8,'Remove weeds','Remove weeds from the field and surrounding areas.'),(9,'Allow fallow fields to dry','Allow fallow fields to dry in order to suppress disease agents in the soil and plant residues.'),(10,'Use hot water','Treat seeds with hot water.'),(11,'Monitor soil nutrients','monitor soil nutrients regularly');
/*!40000 ALTER TABLE `prevention_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_table`
--

DROP TABLE IF EXISTS `purchase_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_table` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `item_type` enum('Pesticide','Fertilizer','Seed','Others') NOT NULL,
  `item_desc` tinytext,
  `purchase_price` float DEFAULT NULL,
  `date_purchased` datetime DEFAULT NULL,
  `amount` float NOT NULL,
  `purchase_status` enum('Pending','Processing','Purchased','Cancelled') DEFAULT 'Pending',
  `requested_by` int DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `farm_id` int NOT NULL,
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  KEY `requested_by_idx` (`requested_by`),
  KEY `farm_id_purchase_idx` (`farm_id`),
  CONSTRAINT `farm_id_purchase` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`),
  CONSTRAINT `requested_by` FOREIGN KEY (`requested_by`) REFERENCES `employee_table` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_table`
--

LOCK TABLES `purchase_table` WRITE;
/*!40000 ALTER TABLE `purchase_table` DISABLE KEYS */;
INSERT INTO `purchase_table` VALUES (31,4,'Seed','',6500,'2022-01-12 00:00:00',500,'Purchased',1,'2022-01-05',54),(39,4,'Seed','',1500,'2019-04-08 00:00:00',100,'Purchased',1,'2019-04-01',54),(40,6,'Pesticide','',1610,'2019-04-08 00:00:00',7,'Purchased',1,'2019-04-01',54),(41,9,'Pesticide','',1380,'2019-04-08 00:00:00',6,'Purchased',1,'2019-04-01',54),(42,11,'Pesticide','',2300,'2019-04-08 00:00:00',10,'Purchased',1,'2019-04-01',54),(43,1,'Fertilizer','',4200,'2019-04-18 00:00:00',20,'Purchased',1,'2019-04-11',54),(44,2,'Fertilizer','',4200,'2019-04-18 00:00:00',20,'Purchased',1,'2019-04-11',54),(45,7,'Fertilizer','',4200,'2019-04-18 00:00:00',20,'Purchased',1,'2019-04-11',54),(46,1,'Fertilizer','',1050,'2019-05-15 00:00:00',5,'Purchased',1,'2019-05-08',54),(47,2,'Fertilizer','',1050,'2019-05-15 00:00:00',5,'Purchased',1,'2019-05-08',54),(48,5,'Seed','',1500,'2019-11-08 00:00:00',100,'Purchased',1,'2019-11-01',54),(49,6,'Pesticide','',880,'2019-11-08 00:00:00',4,'Purchased',1,'2019-11-01',54),(50,7,'Pesticide','',1100,'2019-11-08 00:00:00',5,'Purchased',1,'2019-11-01',54),(51,9,'Pesticide','',660,'2019-11-08 00:00:00',3,'Purchased',1,'2019-11-01',54),(52,1,'Fertilizer','',1330,'2019-10-17 00:00:00',7,'Purchased',1,'2019-10-10',54),(53,2,'Fertilizer','',1520,'2019-10-17 00:00:00',8,'Purchased',1,'2019-10-10',54),(54,7,'Fertilizer','',1900,'2019-10-17 00:00:00',10,'Purchased',1,'2019-10-10',54),(55,1,'Fertilizer','',1480,'2020-03-22 00:00:00',8,'Purchased',1,'2020-03-15',54),(56,2,'Fertilizer','',1850,'2020-03-22 00:00:00',10,'Purchased',1,'2020-03-15',54),(57,7,'Fertilizer','',925,'2020-03-22 00:00:00',5,'Purchased',1,'2020-03-15',54),(58,4,'Seed','Cycle 3',1040,'2020-04-08 00:00:00',80,'Purchased',1,'2020-04-01',54),(59,6,'Pesticide','Cycle 3',430,'2020-04-08 00:00:00',2,'Purchased',1,'2020-04-01',54),(60,8,'Pesticide','Cycle 3',645,'2020-04-08 00:00:00',3,'Purchased',1,'2020-04-01',54),(61,1,'Fertilizer','',925,'2020-10-08 00:00:00',5,'Purchased',1,'2020-10-01',54),(62,2,'Fertilizer','',925,'2020-10-08 00:00:00',5,'Purchased',1,'2020-10-01',54),(63,7,'Fertilizer','',925,'2020-10-08 00:00:00',5,'Purchased',1,'2020-10-01',54),(64,4,'Seed','',780,'2020-10-18 00:00:00',60,'Purchased',1,'2020-10-11',54),(65,7,'Pesticide','',1290,'2020-10-18 00:00:00',6,'Purchased',1,'2020-10-11',54),(66,6,'Pesticide','',1075,'2020-10-18 00:00:00',5,'Purchased',1,'2020-10-11',54),(67,4,'Seed','Cycle 1 WEST Farm',1440,'2019-03-17 00:00:00',90,'Purchased',1,'2019-03-10',55),(68,6,'Pesticide','Cycle 1 WEST Farm',2350,'2019-03-17 00:00:00',10,'Purchased',1,'2019-03-10',55),(69,10,'Pesticide','Cycle 1 WEST Farm',2820,'2019-03-17 00:00:00',12,'Purchased',1,'2019-03-10',55),(70,1,'Fertilizer','',1850,'2019-03-08 00:00:00',10,'Purchased',1,'2019-03-01',55),(71,2,'Fertilizer','',1850,'2019-03-08 00:00:00',10,'Purchased',1,'2019-03-01',55),(72,7,'Fertilizer','',1850,'2019-03-08 00:00:00',10,'Purchased',1,'2019-03-01',55),(73,5,'Seed','',1080,'2019-11-08 00:00:00',90,'Purchased',1,'2019-11-01',55),(74,7,'Pesticide','',900,'2019-11-08 00:00:00',4,'Purchased',1,'2019-11-01',55),(75,6,'Pesticide','',1350,'2019-11-08 00:00:00',6,'Purchased',1,'2019-11-01',55),(76,11,'Pesticide','',1125,'2019-11-08 00:00:00',5,'Purchased',1,'2019-11-01',55),(77,1,'Fertilizer','',975,'2019-11-08 00:00:00',5,'Purchased',1,'2019-11-01',55),(78,2,'Fertilizer','',1170,'2019-11-08 00:00:00',6,'Purchased',1,'2019-11-01',55),(79,7,'Fertilizer','',1560,'2019-11-08 00:00:00',8,'Purchased',1,'2019-11-01',55),(80,7,'Seed','',1000,'2020-03-27 00:00:00',100,'Purchased',1,'2020-03-20',55),(81,7,'Pesticide','',975,'2020-03-27 00:00:00',5,'Purchased',1,'2020-03-20',55),(82,9,'Pesticide','',780,'2020-03-27 00:00:00',4,'Purchased',1,'2020-03-20',55),(83,1,'Fertilizer','',1250,'2020-03-27 00:00:00',10,'Purchased',1,'2020-03-20',55),(84,2,'Fertilizer','',1250,'2020-03-27 00:00:00',10,'Purchased',1,'2020-03-20',55),(85,7,'Fertilizer','',1250,'2020-03-27 00:00:00',10,'Purchased',1,'2020-03-20',55),(86,4,'Seed','EAST cycle 1',1400,'2019-04-21 00:00:00',100,'Purchased',1,'2019-04-14',56),(87,6,'Pesticide','EAST cycle 1',2520,'2019-04-21 00:00:00',12,'Purchased',1,'2019-04-14',56),(88,9,'Pesticide','EAST cycle 1',2310,'2019-04-21 00:00:00',11,'Purchased',1,'2019-04-14',56),(89,11,'Pesticide','EAST cycle 1',2310,'2019-04-21 00:00:00',11,'Purchased',1,'2019-04-14',56),(90,1,'Fertilizer','EAST cycle 1',1650,'2019-04-21 00:00:00',10,'Purchased',1,'2019-04-14',56),(91,2,'Fertilizer','EAST cycle 1',1650,'2019-04-21 00:00:00',10,'Purchased',1,'2019-04-14',56),(92,7,'Fertilizer','EAST cycle 1',1650,'2019-04-21 00:00:00',10,'Purchased',1,'2019-04-14',56),(93,7,'Seed','',1400,'2019-11-13 00:00:00',100,'Purchased',1,'2019-11-06',56),(94,7,'Pesticide','',2100,'2019-11-13 00:00:00',10,'Purchased',1,'2019-11-06',56),(95,10,'Pesticide','',1470,'2019-11-13 00:00:00',7,'Purchased',1,'2019-11-06',56),(96,1,'Fertilizer','',1980,'2019-11-13 00:00:00',12,'Purchased',1,'2019-11-06',56),(97,2,'Fertilizer','',2310,'2019-11-13 00:00:00',14,'Purchased',1,'2019-11-06',56),(98,7,'Fertilizer','',1815,'2019-11-13 00:00:00',11,'Purchased',1,'2019-11-06',56),(99,6,'Seed','',1080,'2020-04-15 00:00:00',90,'Purchased',1,'2020-04-08',56),(100,7,'Pesticide','',2000,'2020-04-15 00:00:00',10,'Purchased',1,'2020-04-08',56),(101,8,'Pesticide','',1200,'2020-04-15 00:00:00',6,'Purchased',1,'2020-04-08',56),(102,1,'Fertilizer','',1550,'2020-04-15 00:00:00',10,'Purchased',1,'2020-04-08',56),(103,2,'Fertilizer','',1705,'2020-04-15 00:00:00',11,'Purchased',1,'2020-04-08',56),(104,7,'Fertilizer','',2170,'2020-04-15 00:00:00',14,'Purchased',1,'2020-04-08',56),(105,5,'Seed','',1080,'2020-10-28 00:00:00',90,'Purchased',1,'2020-10-21',56),(106,6,'Pesticide','',1600,'2020-10-28 00:00:00',8,'Purchased',1,'2020-10-21',56),(107,10,'Pesticide','',2600,'2020-10-28 00:00:00',13,'Purchased',1,'2020-10-21',56),(108,1,'Fertilizer','',1395,'2020-10-28 00:00:00',9,'Purchased',1,'2020-10-21',56),(109,2,'Fertilizer','',1240,'2020-10-28 00:00:00',8,'Purchased',1,'2020-10-21',56),(110,7,'Fertilizer','',1395,'2020-10-28 00:00:00',9,'Purchased',1,'2020-10-21',56),(111,4,'Seed','',1200,'2019-04-12 00:00:00',100,'Purchased',1,'2019-04-05',57),(112,9,'Pesticide','',2800,'2019-04-12 00:00:00',14,'Purchased',1,'2019-04-05',57),(113,10,'Pesticide','',3200,'2019-04-12 00:00:00',16,'Purchased',1,'2019-04-05',57),(114,1,'Fertilizer','',2325,'2019-04-12 00:00:00',15,'Purchased',1,'2019-04-05',57),(115,2,'Fertilizer','',2480,'2019-04-12 00:00:00',16,'Purchased',1,'2019-04-05',57),(116,7,'Fertilizer','',2325,'2019-04-12 00:00:00',15,'Purchased',1,'2019-04-05',57),(117,5,'Seed','',1080,'2019-10-27 00:00:00',90,'Purchased',1,'2019-10-20',57),(118,7,'Pesticide','',3000,'2019-10-27 00:00:00',15,'Purchased',1,'2019-10-20',57),(119,9,'Pesticide','',2400,'2019-10-27 00:00:00',12,'Purchased',1,'2019-10-20',57),(120,1,'Fertilizer','',1860,'2019-10-27 00:00:00',12,'Purchased',1,'2019-10-20',57),(121,2,'Fertilizer','',1705,'2019-10-27 00:00:00',11,'Purchased',1,'2019-10-20',57),(122,7,'Fertilizer','',1550,'2019-10-27 00:00:00',10,'Purchased',1,'2019-10-20',57),(123,5,'Seed','',990,'2020-03-21 00:00:00',90,'Purchased',1,'2020-03-14',57),(124,6,'Pesticide','',2100,'2020-03-21 00:00:00',10,'Purchased',1,'2020-03-14',57),(125,8,'Pesticide','',2100,'2020-03-21 00:00:00',10,'Purchased',1,'2020-03-14',57),(126,1,'Fertilizer','',1015,'2020-03-21 00:00:00',7,'Purchased',1,'2020-03-14',57),(127,2,'Fertilizer','',1160,'2020-03-21 00:00:00',8,'Purchased',1,'2020-03-14',57),(128,7,'Fertilizer','',1305,'2020-03-21 00:00:00',9,'Purchased',1,'2020-03-14',57),(129,4,'Seed','',990,'2020-10-29 00:00:00',90,'Purchased',1,'2020-10-22',57),(130,6,'Pesticide','',1680,'2020-10-29 00:00:00',8,'Purchased',1,'2020-10-22',57),(131,7,'Pesticide','',1890,'2020-10-29 00:00:00',9,'Purchased',1,'2020-10-22',57),(132,1,'Fertilizer','',1305,'2020-10-29 00:00:00',9,'Purchased',1,'2020-10-22',57),(133,2,'Fertilizer','',1595,'2020-10-29 00:00:00',11,'Purchased',1,'2020-10-22',57),(134,7,'Fertilizer','',2175,'2020-10-29 00:00:00',15,'Purchased',1,'2020-10-22',57),(135,6,'Seed','',1100,'2019-04-22 00:00:00',100,'Purchased',1,'2019-04-15',58),(136,7,'Pesticide','',5250,'2019-04-22 00:00:00',25,'Purchased',1,'2019-04-15',58),(137,10,'Pesticide','',4200,'2019-04-22 00:00:00',20,'Purchased',1,'2019-04-15',58),(138,11,'Pesticide','',2730,'2019-04-22 00:00:00',13,'Purchased',1,'2019-04-15',58),(139,1,'Fertilizer','',2320,'2019-04-22 00:00:00',16,'Purchased',1,'2019-04-15',58),(140,2,'Fertilizer','',2465,'2019-04-22 00:00:00',17,'Purchased',1,'2019-04-15',58),(141,7,'Fertilizer','',2175,'2019-04-22 00:00:00',15,'Purchased',1,'2019-04-15',58),(142,4,'Seed','',1100,'2019-11-12 00:00:00',100,'Purchased',1,'2019-11-05',58),(143,7,'Pesticide','',1050,'2019-11-12 00:00:00',5,'Purchased',1,'2019-11-05',58),(144,6,'Pesticide','',1470,'2019-11-12 00:00:00',7,'Purchased',1,'2019-11-05',58),(145,2,'Fertilizer','',1160,'2019-11-12 00:00:00',8,'Purchased',1,'2019-11-05',58),(146,7,'Fertilizer','',1305,'2019-11-12 00:00:00',9,'Purchased',1,'2019-11-05',58),(147,5,'Seed','',900,'2020-04-16 00:00:00',100,'Purchased',1,'2020-04-09',58),(148,10,'Pesticide','',1330,'2020-04-16 00:00:00',7,'Purchased',1,'2020-04-09',58),(149,1,'Fertilizer','',775,'2020-04-16 00:00:00',5,'Purchased',1,'2020-04-09',58),(150,2,'Fertilizer','',1240,'2020-04-16 00:00:00',8,'Purchased',1,'2020-04-09',58),(151,7,'Fertilizer','',930,'2020-04-16 00:00:00',6,'Purchased',1,'2020-04-09',58),(152,4,'Seed','',810,'2020-10-13 00:00:00',90,'Purchased',1,'2020-10-06',58),(153,7,'Pesticide','',380,'2020-10-13 00:00:00',2,'Purchased',1,'2020-10-06',58),(154,10,'Pesticide','',380,'2020-10-13 00:00:00',2,'Purchased',1,'2020-10-06',58),(155,1,'Fertilizer','',775,'2020-10-13 00:00:00',5,'Purchased',1,'2020-10-06',58),(156,7,'Fertilizer','',1085,'2020-10-13 00:00:00',7,'Purchased',1,'2020-10-06',58);
/*!40000 ALTER TABLE `purchase_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season_disease`
--

DROP TABLE IF EXISTS `season_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season_disease` (
  `seasons_disease_id` int NOT NULL AUTO_INCREMENT,
  `season_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`seasons_disease_id`),
  KEY `fk_seasons_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_seasons_has_disease_table_seasons1_idx` (`season_id`),
  CONSTRAINT `fk_seasons_has_disease_table_disease_table2` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_seasons_has_disease_table_seasons1` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_disease`
--

LOCK TABLES `season_disease` WRITE;
/*!40000 ALTER TABLE `season_disease` DISABLE KEYS */;
INSERT INTO `season_disease` VALUES (3,2,1),(4,2,2),(5,1,2),(6,2,3),(7,2,1),(8,1,4),(9,2,5),(11,2,6),(12,2,7);
/*!40000 ALTER TABLE `season_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season_pest`
--

DROP TABLE IF EXISTS `season_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season_pest` (
  `season_pest` int NOT NULL AUTO_INCREMENT,
  `pest_id` int NOT NULL,
  `season_id` int NOT NULL,
  PRIMARY KEY (`season_pest`),
  KEY `fk_pest_table_has_seasons_seasons1_idx` (`season_id`),
  KEY `fk_pest_table_has_seasons_pest_table1_idx` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_seasons_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_seasons_seasons1` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_pest`
--

LOCK TABLES `season_pest` WRITE;
/*!40000 ALTER TABLE `season_pest` DISABLE KEYS */;
INSERT INTO `season_pest` VALUES (3,1,1),(4,2,2),(11,3,2),(12,4,2),(13,5,1),(14,6,2),(15,8,2),(16,9,2),(17,10,1);
/*!40000 ALTER TABLE `season_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seasons` (
  `season_id` int NOT NULL AUTO_INCREMENT,
  `season_name` varchar(45) NOT NULL,
  `season_desc` tinytext,
  `season_start` int DEFAULT NULL,
  `season_end` int DEFAULT NULL,
  `season_temp` float DEFAULT NULL,
  `season_humidity` float DEFAULT NULL,
  PRIMARY KEY (`season_id`),
  UNIQUE KEY `season_name_UNIQUE` (`season_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (1,'Hot','Hot season hot climate',45,150,35,70),(2,'Wet','Full of rain',150,280,26,70);
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seed_table`
--

DROP TABLE IF EXISTS `seed_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seed_table` (
  `seed_id` int NOT NULL AUTO_INCREMENT,
  `seed_name` varchar(20) NOT NULL,
  `seed_desc` tinytext,
  `maturity_days` int DEFAULT NULL,
  `average_yield` float DEFAULT NULL,
  `units` varchar(45) NOT NULL DEFAULT 'Kg',
  `amount` float NOT NULL,
  PRIMARY KEY (`seed_id`),
  UNIQUE KEY `seed_id_UNIQUE` (`seed_id`),
  UNIQUE KEY `seed_name_UNIQUE` (`seed_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seed_table`
--

LOCK TABLES `seed_table` WRITE;
/*!40000 ALTER TABLE `seed_table` DISABLE KEYS */;
INSERT INTO `seed_table` VALUES (4,'Dinorado','THis is is dinorado',90,100,'Kg',10),(5,'168','This is 168 rice',80,100,'Kg',10),(6,'Milagrosa','This is milagrosa rice',85,100,'Kg',10),(7,'Sinandomeng','This is Sinandomeng rice',90,100,'Kg',10),(8,'C4','This is C4 rice',75,100,'Kg',10);
/*!40000 ALTER TABLE `seed_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('hjJZGgUzAQ-J-SEWIT3USS4PhsQXpSAm',1643456564,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2022-01-28T19:29:22.488Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soil_quality_table`
--

DROP TABLE IF EXISTS `soil_quality_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soil_quality_table` (
  `soil_quality_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `pH_lvl` float NOT NULL,
  `p_lvl` float NOT NULL,
  `k_lvl` float NOT NULL,
  `n_lvl` float NOT NULL,
  `date_taken` date NOT NULL,
  `calendar_id` int DEFAULT NULL,
  PRIMARY KEY (`soil_quality_id`),
  UNIQUE KEY `soil_quality_id_UNIQUE` (`soil_quality_id`),
  KEY `sq_id_idx` (`farm_id`),
  KEY `crop_calendar_id_idx` (`calendar_id`),
  CONSTRAINT `crop_calendar_id` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`),
  CONSTRAINT `sq_id` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soil_quality_table`
--

LOCK TABLES `soil_quality_table` WRITE;
/*!40000 ALTER TABLE `soil_quality_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `soil_quality_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_disease`
--

DROP TABLE IF EXISTS `solution_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_disease` (
  `solution_disease` int NOT NULL AUTO_INCREMENT,
  `disease_id` int NOT NULL,
  `solution_id` int NOT NULL,
  PRIMARY KEY (`solution_disease`),
  KEY `fk_disease_table_has_solution_table_solution_table1_idx` (`solution_id`),
  KEY `fk_disease_table_has_solution_table_disease_table1` (`disease_id`),
  CONSTRAINT `fk_disease_table_has_solution_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_disease_table_has_solution_table_solution_table1` FOREIGN KEY (`solution_id`) REFERENCES `solution_table` (`solution_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_disease`
--

LOCK TABLES `solution_disease` WRITE;
/*!40000 ALTER TABLE `solution_disease` DISABLE KEYS */;
INSERT INTO `solution_disease` VALUES (6,1,11),(7,2,11),(8,2,13),(9,3,1),(10,3,10),(11,4,13),(12,5,12),(13,6,8),(14,7,11),(15,7,12);
/*!40000 ALTER TABLE `solution_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_pest`
--

DROP TABLE IF EXISTS `solution_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_pest` (
  `solution_pest_id` int NOT NULL AUTO_INCREMENT,
  `solution_id` int NOT NULL,
  `pest_id` int DEFAULT NULL,
  PRIMARY KEY (`solution_pest_id`),
  KEY `fk_pest_table_has_solution_table_solution_table1_idx` (`solution_id`),
  KEY `fk_pest_table_has_solution_table_pest_table1_idx` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_solution_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_solution_table_solution_table1` FOREIGN KEY (`solution_id`) REFERENCES `solution_table` (`solution_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_pest`
--

LOCK TABLES `solution_pest` WRITE;
/*!40000 ALTER TABLE `solution_pest` DISABLE KEYS */;
INSERT INTO `solution_pest` VALUES (4,1,1),(5,2,1),(6,3,2),(7,4,2),(8,6,2),(9,5,3),(10,6,3),(11,6,4),(12,8,4),(13,6,5),(14,1,6),(15,7,6),(16,6,7),(17,8,7),(18,6,8),(19,6,9),(20,1,9),(21,8,9),(22,6,10),(23,5,10),(24,9,10);
/*!40000 ALTER TABLE `solution_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_table`
--

DROP TABLE IF EXISTS `solution_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_table` (
  `solution_id` int NOT NULL AUTO_INCREMENT,
  `solution_name` varchar(45) DEFAULT NULL,
  `solution_desc` tinytext,
  PRIMARY KEY (`solution_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_table`
--

LOCK TABLES `solution_table` WRITE;
/*!40000 ALTER TABLE `solution_table` DISABLE KEYS */;
INSERT INTO `solution_table` VALUES (1,'Flood the field','Flood the fields with water.'),(2,'Let dogs loose','Use dogs to locate active rat burrows'),(3,'Clipping shoots','lipping and burying shoots in the mud can reduce grub populations'),(4,'Burying shoots','lipping and burying shoots in the mud can reduce grub populations'),(5,'Apply pesticide-Spinetoram','use treatments of carbamate insecticides'),(6,'Use Biological control agents','Encourage biological control agents: snails, beetles, spiders, dragonflies'),(7,'Apply pesticide-Fipronil','Use mixed rice bran and insecticides'),(8,'Apply pesticide-Flubendiamide','Compost tea and beneficial nematodes.'),(9,'Use light traps','Use light traps. Do not place lights near seedbeds or fields.'),(10,'Sweep Seedbeds','Sweep small seedbeds with a net to remove some BPH, particularly from dry seed beds. '),(11,'Apply fungicide-Hexaconazol','Use copper-based fungicide applied at heading can be effective in controlling the disease.'),(12,'Remove infected seeds','Remove infected seeds, panicles, and plant debris '),(13,'Drain the field','Drain the field during severe flood');
/*!40000 ALTER TABLE `solution_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stages`
--

DROP TABLE IF EXISTS `stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stages` (
  `stage_id` int NOT NULL AUTO_INCREMENT,
  `stage_name` varchar(45) NOT NULL,
  `stage_desc` tinytext,
  `avg_duration` int DEFAULT NULL,
  PRIMARY KEY (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages`
--

LOCK TABLES `stages` WRITE;
/*!40000 ALTER TABLE `stages` DISABLE KEYS */;
INSERT INTO `stages` VALUES (1,'Vegetation','Vegetation period',80),(2,'Reproductive','Reproductive period',35),(3,'Ripening','Ripening period',30),(4,'Harvesting','Harvesting period',15),(5,'Land Preparation','Land preparation period',15),(6,'Sowing','Sowing period',15);
/*!40000 ALTER TABLE `stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stages_disease`
--

DROP TABLE IF EXISTS `stages_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stages_disease` (
  `stages_disease_id` int NOT NULL AUTO_INCREMENT,
  `stage_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`stages_disease_id`),
  KEY `fk_stages_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_stages_has_disease_table_stages1_idx` (`stage_id`),
  CONSTRAINT `fk_stages_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_stages_has_disease_table_stages1` FOREIGN KEY (`stage_id`) REFERENCES `stages` (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages_disease`
--

LOCK TABLES `stages_disease` WRITE;
/*!40000 ALTER TABLE `stages_disease` DISABLE KEYS */;
INSERT INTO `stages_disease` VALUES (2,2,1),(3,4,2),(4,1,3),(5,6,4),(6,1,5),(7,2,6),(8,3,7);
/*!40000 ALTER TABLE `stages_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stages_pest`
--

DROP TABLE IF EXISTS `stages_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stages_pest` (
  `stages_pest_id` int NOT NULL AUTO_INCREMENT,
  `stage_id` int NOT NULL,
  `pest_id` int NOT NULL,
  PRIMARY KEY (`stages_pest_id`),
  KEY `fk_stages_has_pest_table_pest_table1_idx` (`pest_id`),
  KEY `fk_stages_has_pest_table_stages1_idx` (`stage_id`),
  CONSTRAINT `fk_stages_has_pest_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `fk_stages_has_pest_table_stages1` FOREIGN KEY (`stage_id`) REFERENCES `stages` (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages_pest`
--

LOCK TABLES `stages_pest` WRITE;
/*!40000 ALTER TABLE `stages_pest` DISABLE KEYS */;
INSERT INTO `stages_pest` VALUES (3,6,1),(4,2,2),(5,6,3),(6,1,4),(7,6,7),(8,1,8),(9,1,9),(10,5,10);
/*!40000 ALTER TABLE `stages_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptoms_disease`
--

DROP TABLE IF EXISTS `symptoms_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms_disease` (
  `symptom_id` int NOT NULL,
  `disease_id` int NOT NULL,
  `symptoms_disease_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`symptoms_disease_id`),
  KEY `fk_symptoms_table_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_symptoms_table_has_disease_table_symptoms_table1_idx` (`symptom_id`),
  CONSTRAINT `fk_symptoms_table_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_symptoms_table_has_disease_table_symptoms_table1` FOREIGN KEY (`symptom_id`) REFERENCES `symptoms_table` (`symptom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_disease`
--

LOCK TABLES `symptoms_disease` WRITE;
/*!40000 ALTER TABLE `symptoms_disease` DISABLE KEYS */;
INSERT INTO `symptoms_disease` VALUES (12,1,5),(15,1,6),(22,1,7),(22,2,8),(28,2,9),(24,2,10),(24,3,11),(26,3,12),(27,3,13),(25,3,14),(28,4,15),(29,4,16),(30,4,17),(29,5,18),(30,5,19),(31,5,20),(13,6,21),(25,6,22),(30,6,23),(26,7,24),(25,7,25),(23,7,26);
/*!40000 ALTER TABLE `symptoms_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptoms_pest`
--

DROP TABLE IF EXISTS `symptoms_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms_pest` (
  `symptoms_pest_id` int NOT NULL AUTO_INCREMENT,
  `symptom_id` int NOT NULL,
  `pest_id` int NOT NULL,
  PRIMARY KEY (`symptoms_pest_id`),
  KEY `fk_symptoms_table_has_pest_table_pest_table1_idx` (`pest_id`),
  KEY `fk_symptoms_table_has_pest_table_symptoms_table1_idx` (`symptom_id`),
  CONSTRAINT `fk_symptoms_table_has_pest_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `fk_symptoms_table_has_pest_table_symptoms_table1` FOREIGN KEY (`symptom_id`) REFERENCES `symptoms_table` (`symptom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_pest`
--

LOCK TABLES `symptoms_pest` WRITE;
/*!40000 ALTER TABLE `symptoms_pest` DISABLE KEYS */;
INSERT INTO `symptoms_pest` VALUES (5,1,1),(6,2,2),(7,3,2),(8,4,2),(9,5,3),(10,6,3),(11,7,3),(12,8,3),(13,9,4),(14,10,4),(15,11,4),(16,12,5),(17,13,5),(18,14,5),(19,15,5),(20,16,6),(21,17,6),(22,18,6),(23,19,6),(24,16,7),(25,17,7),(26,18,7),(27,19,7),(28,21,8),(29,20,8),(30,21,9),(31,22,9),(32,24,9),(33,20,10),(34,12,10),(35,14,10);
/*!40000 ALTER TABLE `symptoms_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptoms_table`
--

DROP TABLE IF EXISTS `symptoms_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms_table` (
  `symptom_id` int NOT NULL AUTO_INCREMENT,
  `symptom_name` varchar(45) DEFAULT NULL,
  `symptom_desc` tinytext,
  PRIMARY KEY (`symptom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_table`
--

LOCK TABLES `symptoms_table` WRITE;
/*!40000 ALTER TABLE `symptoms_table` DISABLE KEYS */;
INSERT INTO `symptoms_table` VALUES (1,'Presence of burrows','There are burrows around the farm.'),(2,'Scraping on leaf blade','Scraping of the upper surface of the leaf blade leaving only the lower epidermis as white streaks parallel to the midrib'),(3,'Withering','Withering of damged leaves'),(4,'Translucent white patches','Irregular translucent white patches that are parallel to the leaf veins caused by tunneling of larvae through leaf tissue causes'),(5,'Floating leaf cases','Leaf cases floating on water.'),(6,'Leaves cut','Leaves cut at right angles as with a pair of scissors'),(7,'Papery leaves','Leaves with papery upper epidermis that were fed on'),(8,'Skeletonized leaf tissues','Skeletonized leaf tissues usually appear ladder-like'),(9,'Dry Leaf tips','Dry leaf tips.'),(10,'Orange leaves','Whole leaves become orange.'),(11,'White eggs','White eggs laid singly in the sheaths.'),(12,'Wilting','Wilting in the plants'),(13,'Stunting','Plant stunting.'),(14,'Yellowish leaves','Yellowish curved leaves.'),(15,'Damaged Spots','Damaged spots or chakdhora or soorai disease.'),(16,'Falling plants','Loss of plant stand.'),(17,'Cut seedlings','Cut seedlings at base.'),(18,'Poor growth','Poor growth of seedling.'),(19,'Dead seedlings','Seedlings are dead.'),(20,'Yellow green larva','yellow green larva with body covered by small and yellow bead-like hairs'),(21,'Shiny eggs','Shiny and spherical pearl-like eggs.'),(22,'Leaf veins','Symptoms initially appear as small, water-soaked, linear lesions between leaf veins. '),(23,'Brown leaves','Entire leaves may become brown and die when the disease is very severe.'),(24,'Grey-green Lesions','Initial symptoms appear as white to gray-green lesions or spots, with dark green borders.'),(25,'Dark Green borders','Initial symptoms appear as white to gray-green lesions or spots, with dark green borders.'),(26,'Spindle-shaped centers','Older lesions on the leaves are elliptical or spindle-shaped and whitish to gray centers with red to brownish or necrotic border.'),(27,'Elliptical centers','Older lesions on the leaves are elliptical or spindle-shaped and whitish to gray centers with red to brownish or necrotic border.'),(28,'Brown lesions','Infected seedlings have small, circular, yellow brown or brown lesions that may girdle the coleoptile and distort primary and secondary leaves.'),(29,'Velvety spores','Individual rice grain transformed into a mass of velvety spores or yellow fruiting bodies'),(30,'Broken membrane of spores','Growth of spores result to broken membrane'),(31,'Orange mature spores','Mature spores orange and turn yellowish green or greenish black'),(32,'Infected grains','Only few grains in a panicle are usually infected and the rest are normal');
/*!40000 ALTER TABLE `symptoms_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `access_level` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_to_employee_idx` (`employee_id`),
  CONSTRAINT `user_to_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee_table` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather_disease`
--

DROP TABLE IF EXISTS `weather_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather_disease` (
  `weather_disease_id` int NOT NULL AUTO_INCREMENT,
  `weather_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`weather_disease_id`),
  KEY `fk_weather_table_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_weather_table_has_disease_table_weather_table1_idx` (`weather_id`),
  CONSTRAINT `fk_weather_table_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_weather_table_has_disease_table_weather_table1` FOREIGN KEY (`weather_id`) REFERENCES `weather_table` (`weather_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_disease`
--

LOCK TABLES `weather_disease` WRITE;
/*!40000 ALTER TABLE `weather_disease` DISABLE KEYS */;
INSERT INTO `weather_disease` VALUES (4,4,1),(5,7,1),(6,4,2),(7,5,2),(8,4,3),(9,6,3),(10,7,3),(15,4,5),(16,5,5),(18,5,4),(19,4,4),(20,4,6),(21,6,7),(22,4,7);
/*!40000 ALTER TABLE `weather_disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather_forecast_table`
--

DROP TABLE IF EXISTS `weather_forecast_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather_forecast_table` (
  `forecast_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` varchar(10) DEFAULT NULL,
  `weather_id` int NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `humidity` float NOT NULL,
  `max_temp` float NOT NULL,
  `min_temp` float NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `pressure` float NOT NULL,
  `rainfall` float NOT NULL,
  `time_uploaded` int NOT NULL,
  `icon` tinytext,
  PRIMARY KEY (`forecast_id`),
  UNIQUE KEY `forecast_id_UNIQUE` (`forecast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12429 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_forecast_table`
--

LOCK TABLES `weather_forecast_table` WRITE;
/*!40000 ALTER TABLE `weather_forecast_table` DISABLE KEYS */;
INSERT INTO `weather_forecast_table` VALUES (12399,'2022-01-28',NULL,801,'few clouds',64,30.23,26.18,NULL,1008,0,0,'02d'),(12400,'2022-01-29',NULL,500,'light rain',64,30.23,25.37,NULL,1007,0.35,0,'10d'),(12401,'2022-01-30',NULL,500,'light rain',78,28.33,25.37,NULL,1007,4.75,0,'10d'),(12402,'2022-01-31',NULL,500,'light rain',58,32.07,25.43,NULL,1008,4.83,0,'10d'),(12403,'2022-02-01',NULL,500,'light rain',71,28.48,25.2,NULL,1009,3.28,0,'10d'),(12404,'2022-02-02',NULL,802,'scattered clouds',64,29.54,25.77,NULL,1009,0,0,'03d'),(12405,'2022-02-03',NULL,500,'light rain',65,28.53,25.8,NULL,1010,1.42,0,'10d'),(12406,'2022-02-04',NULL,500,'light rain',67,28.94,25.64,NULL,1009,1.96,0,'10d'),(12407,'2022-02-05',NULL,500,'light rain',71,28.27,25.64,NULL,1009,4.02,0,'10d'),(12408,'2022-02-06',NULL,500,'light rain',71,28.03,25.9,NULL,1009,0.76,0,'10d'),(12409,'2022-02-07',NULL,500,'light rain',64,29.31,26.04,NULL,1009,0.97,0,'10d'),(12410,'2022-02-08',NULL,500,'light rain',70,28.57,25.44,NULL,1008,4.52,0,'10d'),(12411,'2022-02-09',NULL,802,'scattered clouds',63,29.28,25.66,NULL,1008,0,0,'03d'),(12412,'2022-02-10',NULL,500,'light rain',62,29.05,25.8,NULL,1008,0.11,0,'10d'),(12413,'2022-02-11',NULL,803,'broken clouds',59,29.74,25.8,NULL,1008,0,0,'04d'),(12414,'2022-02-12',NULL,500,'light rain',68,26.87,25.56,NULL,1009,0.27,0,'10d'),(12415,'2022-02-13',NULL,500,'light rain',70,26.14,25.16,NULL,1010,3.41,0,'10d'),(12416,'2022-02-14',NULL,500,'light rain',74,26.03,25.42,NULL,1010,1.84,0,'10d'),(12417,'2022-02-15',NULL,500,'light rain',71,26.18,25.42,NULL,1010,2.05,0,'10d'),(12418,'2022-02-16',NULL,500,'light rain',75,25.82,25.22,NULL,1010,6.42,0,'10d'),(12419,'2022-02-17',NULL,500,'light rain',74,26.14,24.62,NULL,1010,4.32,0,'10d'),(12420,'2022-02-18',NULL,500,'light rain',76,26.52,25.29,NULL,1009,11.3,0,'10d'),(12421,'2022-02-19',NULL,500,'light rain',75,27.21,25.32,NULL,1009,12.56,0,'10d'),(12422,'2022-02-20',NULL,500,'light rain',72,28.3,25.32,NULL,1007,13.5,0,'10d'),(12423,'2022-02-21',NULL,500,'light rain',72,28.48,26.12,NULL,1007,4.82,0,'10d'),(12424,'2022-02-22',NULL,500,'light rain',68,29.6,26.33,NULL,1007,2.28,0,'10d'),(12425,'2022-02-23',NULL,803,'broken clouds',64,29.82,26.37,NULL,1007,0,0,'04d'),(12426,'2022-02-24',NULL,802,'scattered clouds',61,30.73,26.37,NULL,1007,0,0,'03d'),(12427,'2022-02-25',NULL,500,'light rain',61,30.13,26.3,NULL,1008,0.24,0,'10d'),(12428,'2022-02-26',NULL,500,'light rain',75,27.33,25.95,NULL,1008,8.43,0,'10d');
/*!40000 ALTER TABLE `weather_forecast_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather_pest`
--

DROP TABLE IF EXISTS `weather_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather_pest` (
  `weather_pest_id` int NOT NULL AUTO_INCREMENT,
  `weather_id` int NOT NULL,
  `pest_id` int NOT NULL,
  PRIMARY KEY (`weather_pest_id`),
  KEY `fk_weather_table_has_pest_table_pest_table1_idx` (`pest_id`),
  KEY `fk_weather_table_has_pest_table_weather_table1_idx` (`weather_id`),
  CONSTRAINT `fk_weather_table_has_pest_table_pest_table1` FOREIGN KEY (`pest_id`) REFERENCES `pest_table` (`pest_id`),
  CONSTRAINT `fk_weather_table_has_pest_table_weather_table1` FOREIGN KEY (`weather_id`) REFERENCES `weather_table` (`weather_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_pest`
--

LOCK TABLES `weather_pest` WRITE;
/*!40000 ALTER TABLE `weather_pest` DISABLE KEYS */;
INSERT INTO `weather_pest` VALUES (4,5,1),(5,4,2),(6,6,2),(7,4,3),(8,4,4),(9,5,5),(10,7,5),(11,4,6),(12,6,6),(13,4,7),(14,6,7),(15,7,7),(16,4,8),(17,6,8),(18,4,9),(19,6,9),(22,4,10);
/*!40000 ALTER TABLE `weather_pest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather_table`
--

DROP TABLE IF EXISTS `weather_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather_table` (
  `weather_id` int NOT NULL AUTO_INCREMENT,
  `weather` varchar(45) NOT NULL,
  `weather_desc` tinytext,
  `min_temp` float DEFAULT NULL,
  `max_temp` float DEFAULT NULL,
  `precipitation` float DEFAULT NULL,
  `soil_moisture` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  PRIMARY KEY (`weather_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_table`
--

LOCK TABLES `weather_table` WRITE;
/*!40000 ALTER TABLE `weather_table` DISABLE KEYS */;
INSERT INTO `weather_table` VALUES (4,'Rainy','High rainfall, strong winds and high humidity',21,28,80,80,80),(5,'Sunny','Hot and sunny day',30,40,0,40,60),(6,'Cloudy','Cloudy day with little to no rain',25,35,20,60,70),(7,'Windy','High winds and humid air',23,30,10,60,50);
/*!40000 ALTER TABLE `weather_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wo_resources_table`
--

DROP TABLE IF EXISTS `wo_resources_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wo_resources_table` (
  `wo_resources_id` int NOT NULL AUTO_INCREMENT,
  `work_order_id` int NOT NULL,
  `type` enum('Pesticide','Fertilizer','Seed','Others') NOT NULL,
  `units` varchar(20) DEFAULT NULL,
  `qty` float NOT NULL,
  `item_id` int DEFAULT NULL,
  PRIMARY KEY (`wo_resources_id`),
  UNIQUE KEY `wo_resources_id_UNIQUE` (`wo_resources_id`),
  KEY `wo_ref_id_idx` (`work_order_id`),
  CONSTRAINT `wo_ref_id` FOREIGN KEY (`work_order_id`) REFERENCES `work_order_table` (`work_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wo_resources_table`
--

LOCK TABLES `wo_resources_table` WRITE;
/*!40000 ALTER TABLE `wo_resources_table` DISABLE KEYS */;
INSERT INTO `wo_resources_table` VALUES (137,162,'Fertilizer',NULL,40,2),(138,163,'Fertilizer',NULL,6,7),(139,164,'Fertilizer',NULL,6,7),(140,173,'Fertilizer',NULL,37,2),(141,174,'Fertilizer',NULL,6,7),(142,175,'Fertilizer',NULL,6,7),(143,183,'Fertilizer',NULL,45,2),(144,184,'Fertilizer',NULL,7,7),(145,185,'Fertilizer',NULL,7,7),(146,194,'Fertilizer',NULL,86,2),(147,195,'Fertilizer',NULL,13,7),(148,196,'Fertilizer',NULL,13,7),(149,203,'Fertilizer',NULL,8,7),(150,204,'Fertilizer',NULL,48,2),(151,205,'Fertilizer',NULL,8,7),(152,218,'Fertilizer',NULL,6,7),(153,219,'Fertilizer',NULL,40,2),(154,220,'Fertilizer',NULL,6,7),(155,233,'Fertilizer',NULL,37,2),(156,234,'Fertilizer',NULL,6,7),(157,235,'Fertilizer',NULL,6,7),(158,248,'Fertilizer',NULL,45,2),(159,249,'Fertilizer',NULL,7,7),(160,250,'Fertilizer',NULL,7,7),(161,263,'Fertilizer',NULL,86,2),(162,264,'Fertilizer',NULL,13,7),(163,265,'Fertilizer',NULL,13,7),(164,278,'Fertilizer',NULL,48,2),(165,279,'Fertilizer',NULL,8,7),(166,280,'Fertilizer',NULL,8,7),(167,293,'Fertilizer',NULL,40,2),(168,294,'Fertilizer',NULL,6,7),(169,295,'Fertilizer',NULL,6,7),(170,308,'Fertilizer',NULL,6,7),(171,309,'Fertilizer',NULL,37,2),(172,310,'Fertilizer',NULL,6,7),(173,323,'Fertilizer',NULL,7,7),(174,324,'Fertilizer',NULL,45,2),(175,325,'Fertilizer',NULL,7,7),(176,338,'Fertilizer',NULL,86,2),(177,339,'Fertilizer',NULL,13,7),(178,340,'Fertilizer',NULL,13,7),(179,353,'Fertilizer',NULL,48,2),(180,354,'Fertilizer',NULL,8,7),(181,355,'Fertilizer',NULL,8,7),(182,368,'Fertilizer',NULL,40,2),(183,369,'Fertilizer',NULL,6,7),(184,370,'Fertilizer',NULL,6,7),(185,383,'Fertilizer',NULL,37,2),(186,384,'Fertilizer',NULL,6,7),(187,385,'Fertilizer',NULL,1,1),(188,386,'Fertilizer',NULL,1,1),(189,387,'Fertilizer',NULL,1,1),(190,388,'Fertilizer',NULL,6,7),(191,389,'Fertilizer',NULL,2,1),(192,390,'Fertilizer',NULL,1,1),(193,403,'Fertilizer',NULL,45,2),(194,404,'Fertilizer',NULL,7,7),(195,405,'Fertilizer',NULL,7,7),(196,418,'Fertilizer',NULL,86,2),(197,419,'Fertilizer',NULL,13,7),(198,420,'Fertilizer',NULL,13,7),(199,433,'Fertilizer',NULL,48,2),(200,434,'Fertilizer',NULL,8,7),(201,435,'Fertilizer',NULL,8,7),(206,594,'Fertilizer',NULL,39,2),(207,595,'Fertilizer',NULL,13,7),(208,596,'Fertilizer',NULL,2,1),(209,597,'Fertilizer',NULL,3,1),(210,598,'Fertilizer',NULL,3,1),(211,599,'Fertilizer',NULL,13,7),(212,600,'Fertilizer',NULL,3,1),(213,601,'Fertilizer',NULL,1,1),(214,603,'Seed',NULL,6,4),(215,617,'Fertilizer',NULL,18,2),(216,618,'Fertilizer',NULL,6,7),(217,619,'Fertilizer',NULL,2,1),(218,620,'Fertilizer',NULL,3,1),(219,621,'Fertilizer',NULL,3,1),(220,622,'Fertilizer',NULL,6,7),(221,623,'Fertilizer',NULL,3,1),(222,624,'Fertilizer',NULL,1,1),(223,580,'Seed',NULL,12,4),(224,627,'Seed',NULL,8,6),(225,630,'Seed',NULL,8,7),(226,639,'Fertilizer',NULL,8,7),(227,640,'Fertilizer',NULL,2,1),(228,641,'Fertilizer',NULL,22,2),(229,642,'Fertilizer',NULL,3,1),(230,643,'Fertilizer',NULL,3,1),(232,645,'Fertilizer',NULL,3,1),(233,646,'Fertilizer',NULL,1,1),(236,644,'Fertilizer',NULL,8,7);
/*!40000 ALTER TABLE `wo_resources_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_order_table`
--

DROP TABLE IF EXISTS `work_order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_order_table` (
  `work_order_id` int NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `crop_calendar_id` int NOT NULL,
  `date_created` date NOT NULL,
  `date_due` date DEFAULT NULL,
  `status` enum('Pending','In-Progress','Completed','Cancelled') NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_completed` date DEFAULT NULL,
  `stage` enum('Land Preparation','Sow Seed','Vegetation','Reproductive','Ripening','Harvest') DEFAULT NULL,
  PRIMARY KEY (`work_order_id`),
  UNIQUE KEY `work_order_id_UNIQUE` (`work_order_id`),
  KEY `work_order_fk_idx` (`crop_calendar_id`),
  CONSTRAINT `work_order_fk` FOREIGN KEY (`crop_calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=647 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_order_table`
--

LOCK TABLES `work_order_table` WRITE;
/*!40000 ALTER TABLE `work_order_table` DISABLE KEYS */;
INSERT INTO `work_order_table` VALUES (158,'Land Preparation',42,'2022-01-05','2019-04-03','Completed',NULL,'Generated Land Preparation Work Order','2019-03-13','2019-03-20',NULL),(159,'Sow Seed',42,'2022-01-05','2019-04-11','Completed',NULL,'Generated Sow Seed Work Order','2019-04-04','2019-04-11',NULL),(160,'Sow Seed',42,'2022-01-05','2019-04-11','Completed',NULL,'Generated Sow Seed Work Order','2019-04-04','2019-04-11',NULL),(161,'Harvest',42,'2022-01-05','2019-05-18','Completed',NULL,'Generated Harvest Work Order','2019-05-11','2022-01-05',NULL),(162,'Fertilizer Application',42,'2022-01-05','2019-04-10','Completed',NULL,'Phosphorous Application (P)','2019-04-03','2019-04-10',NULL),(163,'Fertilizer Application',42,'2022-01-05','2019-04-10','Completed',NULL,'Basal Potassium Application (K)','2019-04-03','2019-04-10',NULL),(164,'Fertilizer Application',42,'2022-01-05','2019-05-23','Completed',NULL,'Early Panicle Potassium Application (K)','2019-05-16','2019-05-23',NULL),(165,'Land Preparation',43,'2022-01-05','2019-03-21','Completed',NULL,'Generated Land Preparation Work Order','2019-02-28','2019-03-07',NULL),(166,'Sow Seed',43,'2022-01-05','2019-03-29','Completed',NULL,'Generated Sow Seed Work Order','2019-03-22','2019-03-29',NULL),(167,'Sow Seed',43,'2022-01-05','2019-03-29','Completed',NULL,'Generated Sow Seed Work Order','2019-03-22','2019-03-29',NULL),(168,'Harvest',43,'2022-01-05','2019-05-05','Completed',NULL,'Generated Harvest Work Order','2019-04-28','2022-01-05',NULL),(173,'Fertilizer Application',43,'2022-01-05','2019-03-28','Completed',NULL,'Phosphorous Application (P)','2019-03-21','2019-03-28',NULL),(174,'Fertilizer Application',43,'2022-01-05','2019-03-28','Completed',NULL,'Basal Potassium Application (K)','2019-03-21','2019-03-28',NULL),(175,'Fertilizer Application',43,'2022-01-05','2019-05-10','Completed',NULL,'Early Panicle Potassium Application (K)','2019-05-03','2019-05-10',NULL),(176,'Land Preparation',44,'2022-01-05','2019-04-23','Completed',NULL,'Generated Land Preparation Work Order','2019-04-02','2019-04-09',NULL),(177,'Sow Seed',44,'2022-01-05','2019-05-01','Completed',NULL,'Generated Sow Seed Work Order','2019-04-24','2019-05-01',NULL),(178,'Sow Seed',44,'2022-01-05','2019-05-01','Completed',NULL,'Generated Sow Seed Work Order','2019-04-24','2019-05-01',NULL),(179,'Harvest',44,'2022-01-05','2019-06-07','Completed',NULL,'Generated Harvest Work Order','2019-05-31','2022-01-05',NULL),(180,'Provide space',44,'2022-01-05','2019-04-09','Completed',NULL,'Rats: Provide space between plants.','2019-04-02','2019-04-09',NULL),(181,'Clean area',44,'2022-01-05','2019-04-09','Completed',NULL,'Rats: Keep earea and fields clean.','2019-04-02','2019-04-09',NULL),(182,'Grow a ratoon',44,'2022-01-05','2019-04-09','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-04-02','2019-04-09',NULL),(183,'Fertilizer Application',44,'2022-01-05','2019-04-30','Completed',NULL,'Phosphorous Application (P)','2019-04-23','2019-04-30',NULL),(184,'Fertilizer Application',44,'2022-01-05','2019-04-30','Completed',NULL,'Basal Potassium Application (K)','2019-04-23','2019-04-30',NULL),(185,'Fertilizer Application',44,'2022-01-05','2019-06-12','Completed',NULL,'Early Panicle Potassium Application (K)','2019-06-05','2019-06-12',NULL),(186,'Land Preparation',45,'2022-01-05','2019-04-08','Completed',NULL,'Generated Land Preparation Work Order','2019-03-18','2019-03-25',NULL),(187,'Sow Seed',45,'2022-01-05','2019-04-16','Completed',NULL,'Generated Sow Seed Work Order','2019-04-09','2019-04-16',NULL),(188,'Sow Seed',45,'2022-01-05','2019-04-16','Completed',NULL,'Generated Sow Seed Work Order','2019-04-09','2019-04-16',NULL),(189,'Harvest',45,'2022-01-05','2019-05-23','Completed',NULL,'Generated Harvest Work Order','2019-05-16','2022-01-05',NULL),(190,'Provide space',45,'2022-01-05','2019-03-25','Completed',NULL,'Rats: Provide space between plants.','2019-03-18','2019-03-25',NULL),(191,'Grow a ratoon',45,'2022-01-05','2019-03-25','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-03-18','2019-03-25',NULL),(192,'Use hot water',45,'2022-01-05','2019-03-25','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-03-18','2019-03-25',NULL),(193,'Monitor soil nutrients',45,'2022-01-05','2019-03-25','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2019-03-18','2019-03-25',NULL),(194,'Fertilizer Application',45,'2022-01-05','2019-04-15','Completed',NULL,'Phosphorous Application (P)','2019-04-08','2019-04-15',NULL),(195,'Fertilizer Application',45,'2022-01-05','2019-04-15','Completed',NULL,'Basal Potassium Application (K)','2019-04-08','2019-04-15',NULL),(196,'Fertilizer Application',45,'2022-01-05','2019-05-28','Completed',NULL,'Early Panicle Potassium Application (K)','2019-05-21','2019-05-28',NULL),(197,'Land Preparation',46,'2022-01-05','2019-04-10','Completed',NULL,'Generated Land Preparation Work Order','2019-03-20','2019-03-27',NULL),(198,'Sow Seed',46,'2022-01-05','2019-04-18','Completed',NULL,'Generated Sow Seed Work Order','2019-04-11','2019-04-18',NULL),(199,'Sow Seed',46,'2022-01-05','2019-04-18','Completed',NULL,'Generated Sow Seed Work Order','2019-04-11','2019-04-18',NULL),(200,'Harvest',46,'2022-01-05','2019-05-20','Completed',NULL,'Generated Harvest Work Order','2019-05-13','2022-01-05',NULL),(201,'Provide space',46,'2022-01-05','2019-03-27','Completed',NULL,'Rats: Provide space between plants.','2019-03-20','2019-03-27',NULL),(202,'Use hot water',46,'2022-01-05','2019-03-27','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-03-20','2019-03-27',NULL),(203,'Fertilizer Application',46,'2022-01-05','2019-04-17','Completed',NULL,'Basal Potassium Application (K)','2019-04-10','2019-04-17',NULL),(204,'Fertilizer Application',46,'2022-01-05','2019-05-07','Completed',NULL,'Phosphorous Application (P)','2019-04-30','2019-05-07',NULL),(205,'Fertilizer Application',46,'2022-01-05','2019-05-30','Completed',NULL,'Early Panicle Potassium Application (K)','2019-05-23','2019-05-30',NULL),(206,'Land Preparation',47,'2022-01-05','2019-10-31','Completed',NULL,'Generated Land Preparation Work Order','2019-10-10','2019-10-17',NULL),(207,'Sow Seed',47,'2022-01-05','2019-11-08','Completed',NULL,'Generated Sow Seed Work Order','2019-11-01','2019-11-08',NULL),(208,'Sow Seed',47,'2022-01-05','2019-11-08','Completed',NULL,'Generated Sow Seed Work Order','2019-11-01','2019-11-08',NULL),(209,'Harvest',47,'2022-01-05','2019-12-25','Completed',NULL,'Generated Harvest Work Order','2019-12-18','2022-01-05',NULL),(210,'Provide space',47,'2022-01-05','2019-10-17','Completed',NULL,'Rats: Provide space between plants.','2019-10-10','2019-10-17',NULL),(211,'Clean area',47,'2022-01-05','2019-10-17','Completed',NULL,'Rats: Keep earea and fields clean.','2019-10-10','2019-10-17',NULL),(212,'Grow a ratoon',47,'2022-01-05','2019-10-17','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-10-10','2019-10-17',NULL),(213,'Use hot water',47,'2022-01-05','2019-10-17','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-10-10','2019-10-17',NULL),(214,'Drain the field',47,'2022-01-05','2019-10-17','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2019-10-10','2019-10-17',NULL),(215,'Clean area',47,'2022-01-05','2019-10-17','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2019-10-10','2019-10-17',NULL),(216,'Monitor soil nutrients',47,'2022-01-05','2019-10-17','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2019-10-10','2019-10-17',NULL),(217,'Use hot water',47,'2022-01-05','2019-10-17','Completed',NULL,'Brown spot: Treat seeds with hot water.','2019-10-10','2019-10-17',NULL),(218,'Fertilizer Application',47,'2022-01-05','2019-11-07','Completed',NULL,'Basal Potassium Application (K)','2019-10-31','2019-11-07',NULL),(219,'Fertilizer Application',47,'2022-01-05','2019-11-27','Completed',NULL,'Phosphorous Application (P)','2019-11-20','2019-11-27',NULL),(220,'Fertilizer Application',47,'2022-01-05','2019-12-20','Completed',NULL,'Early Panicle Potassium Application (K)','2019-12-13','2019-12-20',NULL),(221,'Land Preparation',48,'2022-01-05','2019-11-12','Completed',NULL,'Generated Land Preparation Work Order','2019-10-22','2019-10-29',NULL),(222,'Sow Seed',48,'2022-01-05','2019-11-20','Completed',NULL,'Generated Sow Seed Work Order','2019-11-13','2019-11-20',NULL),(223,'Sow Seed',48,'2022-01-05','2019-11-20','Completed',NULL,'Generated Sow Seed Work Order','2019-11-13','2019-11-20',NULL),(224,'Harvest',48,'2022-01-05','2020-01-06','Completed',NULL,'Generated Harvest Work Order','2019-12-30','2022-01-05',NULL),(225,'Provide space',48,'2022-01-05','2019-10-29','Completed',NULL,'Rats: Provide space between plants.','2019-10-22','2019-10-29',NULL),(226,'Clean area',48,'2022-01-05','2019-10-29','Completed',NULL,'Rats: Keep earea and fields clean.','2019-10-22','2019-10-29',NULL),(227,'Grow a ratoon',48,'2022-01-05','2019-10-29','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-10-22','2019-10-29',NULL),(228,'Use hot water',48,'2022-01-05','2019-10-29','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-10-22','2019-10-29',NULL),(229,'Drain the field',48,'2022-01-05','2019-10-29','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2019-10-22','2019-10-29',NULL),(230,'Clean area',48,'2022-01-05','2019-10-29','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2019-10-22','2019-10-29',NULL),(231,'Monitor soil nutrients',48,'2022-01-05','2019-10-29','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2019-10-22','2019-10-29',NULL),(232,'Use hot water',48,'2022-01-05','2019-10-29','Completed',NULL,'Brown spot: Treat seeds with hot water.','2019-10-22','2019-10-29',NULL),(233,'Fertilizer Application',48,'2022-01-05','2019-11-19','Completed',NULL,'Phosphorous Application (P)','2019-11-12','2019-11-19',NULL),(234,'Fertilizer Application',48,'2022-01-05','2019-11-19','Completed',NULL,'Basal Potassium Application (K)','2019-11-12','2019-11-19',NULL),(235,'Fertilizer Application',48,'2022-01-05','2020-01-01','Completed',NULL,'Early Panicle Potassium Application (K)','2019-12-25','2020-01-01',NULL),(236,'Land Preparation',49,'2022-01-05','2019-11-11','Completed',NULL,'Generated Land Preparation Work Order','2019-10-21','2019-10-28',NULL),(237,'Sow Seed',49,'2022-01-05','2019-11-19','Completed',NULL,'Generated Sow Seed Work Order','2019-11-12','2019-11-19',NULL),(238,'Sow Seed',49,'2022-01-05','2019-11-19','Completed',NULL,'Generated Sow Seed Work Order','2019-11-12','2019-11-19',NULL),(239,'Harvest',49,'2022-01-05','2019-12-26','Completed',NULL,'Generated Harvest Work Order','2019-12-19','2022-01-05',NULL),(240,'Provide space',49,'2022-01-05','2019-10-28','Completed',NULL,'Rats: Provide space between plants.','2019-10-21','2019-10-28',NULL),(241,'Clean area',49,'2022-01-05','2019-10-28','Completed',NULL,'Rats: Keep earea and fields clean.','2019-10-21','2019-10-28',NULL),(242,'Grow a ratoon',49,'2022-01-05','2019-10-28','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-10-21','2019-10-28',NULL),(243,'Use hot water',49,'2022-01-05','2019-10-28','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-10-21','2019-10-28',NULL),(244,'Drain the field',49,'2022-01-05','2019-10-28','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2019-10-21','2019-10-28',NULL),(245,'Clean area',49,'2022-01-05','2019-10-28','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2019-10-21','2019-10-28',NULL),(246,'Monitor soil nutrients',49,'2022-01-05','2019-10-28','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2019-10-21','2019-10-28',NULL),(247,'Use hot water',49,'2022-01-05','2019-10-28','Completed',NULL,'Brown spot: Treat seeds with hot water.','2019-10-21','2019-10-28',NULL),(248,'Fertilizer Application',49,'2022-01-05','2019-11-18','Completed',NULL,'Phosphorous Application (P)','2019-11-11','2019-11-18',NULL),(249,'Fertilizer Application',49,'2022-01-05','2019-11-18','Completed',NULL,'Basal Potassium Application (K)','2019-11-11','2019-11-18',NULL),(250,'Fertilizer Application',49,'2022-01-05','2019-12-31','Completed',NULL,'Early Panicle Potassium Application (K)','2019-12-24','2019-12-31',NULL),(251,'Land Preparation',50,'2022-01-05','2019-10-26','Completed',NULL,'Generated Land Preparation Work Order','2019-10-05','2019-10-12',NULL),(252,'Sow Seed',50,'2022-01-05','2019-11-03','Completed',NULL,'Generated Sow Seed Work Order','2019-10-27','2019-11-03',NULL),(253,'Sow Seed',50,'2022-01-05','2019-11-03','Completed',NULL,'Generated Sow Seed Work Order','2019-10-27','2019-11-03',NULL),(254,'Harvest',50,'2022-01-05','2019-12-20','Completed',NULL,'Generated Harvest Work Order','2019-12-13','2022-01-05',NULL),(255,'Provide space',50,'2022-01-05','2019-10-12','Completed',NULL,'Rats: Provide space between plants.','2019-10-05','2019-10-12',NULL),(256,'Clean area',50,'2022-01-05','2019-10-12','Completed',NULL,'Rats: Keep earea and fields clean.','2019-10-05','2019-10-12',NULL),(257,'Grow a ratoon',50,'2022-01-05','2019-10-12','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-10-05','2019-10-12',NULL),(258,'Use hot water',50,'2022-01-05','2019-10-12','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-10-05','2019-10-12',NULL),(259,'Drain the field',50,'2022-01-05','2019-10-12','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2019-10-05','2019-10-12',NULL),(260,'Clean area',50,'2022-01-05','2019-10-12','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2019-10-05','2019-10-12',NULL),(261,'Monitor soil nutrients',50,'2022-01-05','2019-10-12','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2019-10-05','2019-10-12',NULL),(262,'Use hot water',50,'2022-01-05','2019-10-12','Completed',NULL,'Brown spot: Treat seeds with hot water.','2019-10-05','2019-10-12',NULL),(263,'Fertilizer Application',50,'2022-01-05','2019-11-02','Completed',NULL,'Phosphorous Application (P)','2019-10-26','2019-11-02',NULL),(264,'Fertilizer Application',50,'2022-01-05','2019-11-02','Completed',NULL,'Basal Potassium Application (K)','2019-10-26','2019-11-02',NULL),(265,'Fertilizer Application',50,'2022-01-05','2019-12-15','Completed',NULL,'Early Panicle Potassium Application (K)','2019-12-08','2019-12-15',NULL),(266,'Land Preparation',51,'2022-01-05','2019-11-01','Completed',NULL,'Generated Land Preparation Work Order','2019-10-11','2019-10-18',NULL),(267,'Sow Seed',51,'2022-01-05','2019-11-09','Completed',NULL,'Generated Sow Seed Work Order','2019-11-02','2019-11-09',NULL),(268,'Sow Seed',51,'2022-01-05','2019-11-09','Completed',NULL,'Generated Sow Seed Work Order','2019-11-02','2019-11-09',NULL),(269,'Harvest',51,'2022-01-05','2019-12-16','Completed',NULL,'Generated Harvest Work Order','2019-12-09','2022-01-05',NULL),(270,'Provide space',51,'2022-01-05','2019-10-18','Completed',NULL,'Rats: Provide space between plants.','2019-10-11','2019-10-18',NULL),(271,'Clean area',51,'2022-01-05','2019-10-18','Completed',NULL,'Rats: Keep earea and fields clean.','2019-10-11','2019-10-18',NULL),(272,'Grow a ratoon',51,'2022-01-05','2019-10-18','Completed',NULL,'Rice gall midge: Grow a ratoon.','2019-10-11','2019-10-18',NULL),(273,'Use hot water',51,'2022-01-05','2019-10-18','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2019-10-11','2019-10-18',NULL),(274,'Drain the field',51,'2022-01-05','2019-10-18','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2019-10-11','2019-10-18',NULL),(275,'Clean area',51,'2022-01-05','2019-10-18','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2019-10-11','2019-10-18',NULL),(276,'Monitor soil nutrients',51,'2022-01-05','2019-10-18','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2019-10-11','2019-10-18',NULL),(277,'Use hot water',51,'2022-01-05','2019-10-18','Completed',NULL,'Brown spot: Treat seeds with hot water.','2019-10-11','2019-10-18',NULL),(278,'Fertilizer Application',51,'2022-01-05','2019-11-08','Completed',NULL,'Phosphorous Application (P)','2019-11-01','2019-11-08',NULL),(279,'Fertilizer Application',51,'2022-01-05','2019-11-08','Completed',NULL,'Basal Potassium Application (K)','2019-11-01','2019-11-08',NULL),(280,'Fertilizer Application',51,'2022-01-05','2019-12-21','Completed',NULL,'Early Panicle Potassium Application (K)','2019-12-14','2019-12-21',NULL),(281,'Land Preparation',52,'2022-01-05','2020-04-01','Completed',NULL,'Generated Land Preparation Work Order','2020-03-11','2020-03-18',NULL),(282,'Sow Seed',52,'2022-01-05','2020-04-09','Completed',NULL,'Generated Sow Seed Work Order','2020-04-02','2020-04-09',NULL),(283,'Sow Seed',52,'2022-01-05','2020-04-09','Completed',NULL,'Generated Sow Seed Work Order','2020-04-02','2020-04-09',NULL),(284,'Harvest',52,'2022-01-05','2020-05-16','Completed',NULL,'Generated Harvest Work Order','2020-05-09','2022-01-05',NULL),(285,'Provide space',52,'2022-01-05','2020-03-18','Completed',NULL,'Rats: Provide space between plants.','2020-03-11','2020-03-18',NULL),(286,'Clean area',52,'2022-01-05','2020-03-18','Completed',NULL,'Rats: Keep earea and fields clean.','2020-03-11','2020-03-18',NULL),(287,'Grow a ratoon',52,'2022-01-05','2020-03-18','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-03-11','2020-03-18',NULL),(288,'Use hot water',52,'2022-01-05','2020-03-18','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-03-11','2020-03-18',NULL),(289,'Drain the field',52,'2022-01-05','2020-03-18','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-03-11','2020-03-18',NULL),(290,'Clean area',52,'2022-01-05','2020-03-18','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-03-11','2020-03-18',NULL),(291,'Monitor soil nutrients',52,'2022-01-05','2020-03-18','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-03-11','2020-03-18',NULL),(292,'Use hot water',52,'2022-01-05','2020-03-18','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-03-11','2020-03-18',NULL),(293,'Fertilizer Application',52,'2022-01-05','2020-04-08','Completed',NULL,'Phosphorous Application (P)','2020-04-01','2020-04-08',NULL),(294,'Fertilizer Application',52,'2022-01-05','2020-04-08','Completed',NULL,'Basal Potassium Application (K)','2020-04-01','2020-04-08',NULL),(295,'Fertilizer Application',52,'2022-01-05','2020-05-21','Completed',NULL,'Early Panicle Potassium Application (K)','2020-05-14','2020-05-21',NULL),(296,'Land Preparation',53,'2022-01-05','2020-03-31','Completed',NULL,'Generated Land Preparation Work Order','2020-03-10','2020-03-17',NULL),(297,'Sow Seed',53,'2022-01-05','2020-04-08','Completed',NULL,'Generated Sow Seed Work Order','2020-04-01','2020-04-08',NULL),(298,'Sow Seed',53,'2022-01-05','2020-04-08','Completed',NULL,'Generated Sow Seed Work Order','2020-04-01','2020-04-08',NULL),(299,'Harvest',53,'2022-01-05','2020-05-15','Completed',NULL,'Generated Harvest Work Order','2020-05-08','2022-01-05',NULL),(300,'Provide space',53,'2022-01-05','2020-03-17','Completed',NULL,'Rats: Provide space between plants.','2020-03-10','2020-03-17',NULL),(301,'Clean area',53,'2022-01-05','2020-03-17','Completed',NULL,'Rats: Keep earea and fields clean.','2020-03-10','2020-03-17',NULL),(302,'Grow a ratoon',53,'2022-01-05','2020-03-17','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-03-10','2020-03-17',NULL),(303,'Use hot water',53,'2022-01-05','2020-03-17','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-03-10','2020-03-17',NULL),(304,'Drain the field',53,'2022-01-05','2020-03-17','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-03-10','2020-03-17',NULL),(305,'Clean area',53,'2022-01-05','2020-03-17','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-03-10','2020-03-17',NULL),(306,'Monitor soil nutrients',53,'2022-01-05','2020-03-17','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-03-10','2020-03-17',NULL),(307,'Use hot water',53,'2022-01-05','2020-03-17','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-03-10','2020-03-17',NULL),(308,'Fertilizer Application',53,'2022-01-05','2020-04-07','Completed',NULL,'Basal Potassium Application (K)','2020-03-31','2020-04-07',NULL),(309,'Fertilizer Application',53,'2022-01-05','2020-04-27','Completed',NULL,'Phosphorous Application (P)','2020-04-20','2020-04-27',NULL),(310,'Fertilizer Application',53,'2022-01-05','2020-05-20','Completed',NULL,'Early Panicle Potassium Application (K)','2020-05-13','2020-05-20',NULL),(311,'Land Preparation',54,'2022-01-05','2020-04-14','Completed',NULL,'Generated Land Preparation Work Order','2020-03-24','2020-03-31',NULL),(312,'Sow Seed',54,'2022-01-05','2020-04-22','Completed',NULL,'Generated Sow Seed Work Order','2020-04-15','2020-04-22',NULL),(313,'Sow Seed',54,'2022-01-05','2020-04-22','Completed',NULL,'Generated Sow Seed Work Order','2020-04-15','2020-04-22',NULL),(314,'Harvest',54,'2022-01-05','2020-05-24','Completed',NULL,'Generated Harvest Work Order','2020-05-17','2022-01-05',NULL),(315,'Provide space',54,'2022-01-05','2020-03-31','Completed',NULL,'Rats: Provide space between plants.','2020-03-24','2020-03-31',NULL),(316,'Clean area',54,'2022-01-05','2020-03-31','Completed',NULL,'Rats: Keep earea and fields clean.','2020-03-24','2020-03-31',NULL),(317,'Grow a ratoon',54,'2022-01-05','2020-03-31','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-03-24','2020-03-31',NULL),(318,'Use hot water',54,'2022-01-05','2020-03-31','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-03-24','2020-03-31',NULL),(319,'Drain the field',54,'2022-01-05','2020-03-31','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-03-24','2020-03-31',NULL),(320,'Clean area',54,'2022-01-05','2020-03-31','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-03-24','2020-03-31',NULL),(321,'Monitor soil nutrients',54,'2022-01-05','2020-03-31','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-03-24','2020-03-31',NULL),(322,'Use hot water',54,'2022-01-05','2020-03-31','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-03-24','2020-03-31',NULL),(323,'Fertilizer Application',54,'2022-01-05','2020-04-21','Completed',NULL,'Basal Potassium Application (K)','2020-04-14','2020-04-21',NULL),(324,'Fertilizer Application',54,'2022-01-05','2020-05-11','Completed',NULL,'Phosphorous Application (P)','2020-05-04','2020-05-11',NULL),(325,'Fertilizer Application',54,'2022-01-05','2020-06-03','Completed',NULL,'Early Panicle Potassium Application (K)','2020-05-27','2020-06-03',NULL),(326,'Land Preparation',55,'2022-01-05','2020-03-20','Completed',NULL,'Generated Land Preparation Work Order','2020-02-28','2020-03-06',NULL),(327,'Sow Seed',55,'2022-01-05','2020-03-28','Completed',NULL,'Generated Sow Seed Work Order','2020-03-21','2020-03-28',NULL),(328,'Sow Seed',55,'2022-01-05','2020-03-28','Completed',NULL,'Generated Sow Seed Work Order','2020-03-21','2020-03-28',NULL),(329,'Harvest',55,'2022-01-05','2020-05-14','Completed',NULL,'Generated Harvest Work Order','2020-05-07','2022-01-05',NULL),(330,'Provide space',55,'2022-01-05','2020-03-06','Completed',NULL,'Rats: Provide space between plants.','2020-02-28','2020-03-06',NULL),(331,'Clean area',55,'2022-01-05','2020-03-06','Completed',NULL,'Rats: Keep earea and fields clean.','2020-02-28','2020-03-06',NULL),(332,'Grow a ratoon',55,'2022-01-05','2020-03-06','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-02-28','2020-03-06',NULL),(333,'Use hot water',55,'2022-01-05','2020-03-06','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-02-28','2020-03-06',NULL),(334,'Drain the field',55,'2022-01-05','2020-03-06','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-02-28','2020-03-06',NULL),(335,'Clean area',55,'2022-01-05','2020-03-06','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-02-28','2020-03-06',NULL),(336,'Monitor soil nutrients',55,'2022-01-05','2020-03-06','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-02-28','2020-03-06',NULL),(337,'Use hot water',55,'2022-01-05','2020-03-06','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-02-28','2020-03-06',NULL),(338,'Fertilizer Application',55,'2022-01-05','2020-03-27','Completed',NULL,'Phosphorous Application (P)','2020-03-20','2020-03-27',NULL),(339,'Fertilizer Application',55,'2022-01-05','2020-03-27','Completed',NULL,'Basal Potassium Application (K)','2020-03-20','2020-03-27',NULL),(340,'Fertilizer Application',55,'2022-01-05','2020-05-09','Completed',NULL,'Early Panicle Potassium Application (K)','2020-05-02','2020-05-09',NULL),(341,'Land Preparation',56,'2022-01-05','2020-04-15','Completed',NULL,'Generated Land Preparation Work Order','2020-03-25','2020-04-01',NULL),(342,'Sow Seed',56,'2022-01-05','2020-04-23','Completed',NULL,'Generated Sow Seed Work Order','2020-04-16','2020-04-23',NULL),(343,'Sow Seed',56,'2022-01-05','2020-04-23','Completed',NULL,'Generated Sow Seed Work Order','2020-04-16','2020-04-23',NULL),(344,'Harvest',56,'2022-01-05','2020-06-09','Completed',NULL,'Generated Harvest Work Order','2020-06-02','2022-01-05',NULL),(345,'Provide space',56,'2022-01-05','2020-04-01','Completed',NULL,'Rats: Provide space between plants.','2020-03-25','2020-04-01',NULL),(346,'Clean area',56,'2022-01-05','2020-04-01','Completed',NULL,'Rats: Keep earea and fields clean.','2020-03-25','2020-04-01',NULL),(347,'Grow a ratoon',56,'2022-01-05','2020-04-01','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-03-25','2020-04-01',NULL),(348,'Use hot water',56,'2022-01-05','2020-04-01','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-03-25','2020-04-01',NULL),(349,'Drain the field',56,'2022-01-05','2020-04-01','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-03-25','2020-04-01',NULL),(350,'Clean area',56,'2022-01-05','2020-04-01','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-03-25','2020-04-01',NULL),(351,'Monitor soil nutrients',56,'2022-01-05','2020-04-01','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-03-25','2020-04-01',NULL),(352,'Use hot water',56,'2022-01-05','2020-04-01','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-03-25','2020-04-01',NULL),(353,'Fertilizer Application',56,'2022-01-05','2020-04-22','Completed',NULL,'Phosphorous Application (P)','2020-04-15','2020-04-22',NULL),(354,'Fertilizer Application',56,'2022-01-05','2020-04-22','Completed',NULL,'Basal Potassium Application (K)','2020-04-15','2020-04-22',NULL),(355,'Fertilizer Application',56,'2022-01-05','2020-06-04','Completed',NULL,'Early Panicle Potassium Application (K)','2020-05-28','2020-06-04',NULL),(356,'Land Preparation',57,'2022-01-05','2020-10-21','Completed',NULL,'Generated Land Preparation Work Order','2020-09-30','2020-10-07',NULL),(357,'Sow Seed',57,'2022-01-05','2020-10-29','Completed',NULL,'Generated Sow Seed Work Order','2020-10-22','2020-10-29',NULL),(358,'Sow Seed',57,'2022-01-05','2020-10-29','Completed',NULL,'Generated Sow Seed Work Order','2020-10-22','2020-10-29',NULL),(359,'Harvest',57,'2022-01-05','2020-12-05','Completed',NULL,'Generated Harvest Work Order','2020-11-28','2022-01-05',NULL),(360,'Provide space',57,'2022-01-05','2020-10-07','Completed',NULL,'Rats: Provide space between plants.','2020-09-30','2020-10-07',NULL),(361,'Clean area',57,'2022-01-05','2020-10-07','Completed',NULL,'Rats: Keep earea and fields clean.','2020-09-30','2020-10-07',NULL),(362,'Grow a ratoon',57,'2022-01-05','2020-10-07','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-09-30','2020-10-07',NULL),(363,'Use hot water',57,'2022-01-05','2020-10-07','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-09-30','2020-10-07',NULL),(364,'Drain the field',57,'2022-01-05','2020-10-07','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-09-30','2020-10-07',NULL),(365,'Clean area',57,'2022-01-05','2020-10-07','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-09-30','2020-10-07',NULL),(366,'Monitor soil nutrients',57,'2022-01-05','2020-10-07','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-09-30','2020-10-07',NULL),(367,'Use hot water',57,'2022-01-05','2020-10-07','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-09-30','2020-10-07',NULL),(368,'Fertilizer Application',57,'2022-01-05','2020-10-28','Completed',NULL,'Phosphorous Application (P)','2020-10-21','2020-10-28',NULL),(369,'Fertilizer Application',57,'2022-01-05','2020-10-28','Completed',NULL,'Basal Potassium Application (K)','2020-10-21','2020-10-28',NULL),(370,'Fertilizer Application',57,'2022-01-05','2020-12-10','Completed',NULL,'Early Panicle Potassium Application (K)','2020-12-03','2020-12-10',NULL),(371,'Land Preparation',58,'2022-01-05','2022-01-26','Completed',NULL,'Generated Land Preparation Work Order','2022-01-05','2022-01-12',NULL),(372,'Sow Seed',58,'2022-01-05','2022-02-03','Completed',NULL,'Generated Sow Seed Work Order','2022-01-27','2022-02-03',NULL),(373,'Sow Seed',58,'2022-01-05','2022-02-03','Completed',NULL,'Generated Sow Seed Work Order','2022-01-27','2022-02-03',NULL),(374,'Harvest',58,'2022-01-05','2022-03-12','Completed',NULL,'Generated Harvest Work Order','2022-03-05','2022-01-05',NULL),(375,'Provide space',58,'2022-01-05','2022-01-12','Completed',NULL,'Rats: Provide space between plants.','2022-01-05','2022-01-12',NULL),(376,'Clean area',58,'2022-01-05','2022-01-12','Completed',NULL,'Rats: Keep earea and fields clean.','2022-01-05','2022-01-12',NULL),(377,'Grow a ratoon',58,'2022-01-05','2022-01-12','Completed',NULL,'Rice gall midge: Grow a ratoon.','2022-01-05','2022-01-12',NULL),(378,'Use hot water',58,'2022-01-05','2022-01-12','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2022-01-05','2022-01-12',NULL),(379,'Drain the field',58,'2022-01-05','2022-01-12','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2022-01-05','2022-01-12',NULL),(380,'Clean area',58,'2022-01-05','2022-01-12','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2022-01-05','2022-01-12',NULL),(381,'Monitor soil nutrients',58,'2022-01-05','2022-01-12','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2022-01-05','2022-01-12',NULL),(382,'Use hot water',58,'2022-01-05','2022-01-12','Completed',NULL,'Brown spot: Treat seeds with hot water.','2022-01-05','2022-01-12',NULL),(383,'Fertilizer Application',58,'2022-01-05','2022-02-02','Completed',NULL,'Phosphorous Application (P)','2022-01-26','2022-02-02',NULL),(384,'Fertilizer Application',58,'2022-01-05','2022-02-02','Completed',NULL,'Basal Potassium Application (K)','2022-01-26','2022-02-02',NULL),(385,'Fertilizer Application',58,'2022-01-05','2022-02-10','Completed',NULL,'Basal Nitrogen Application (N)','2022-02-03','2022-02-10',NULL),(386,'Fertilizer Application',58,'2022-01-05','2022-02-24','Completed',NULL,'Tillering Nitrogen Application (N)','2022-02-17','2022-02-24',NULL),(387,'Fertilizer Application',58,'2022-01-05','2022-03-02','Completed',NULL,'Midtillering Nitrogen Application (N)','2022-02-23','2022-03-02',NULL),(388,'Fertilizer Application',58,'2022-01-05','2022-03-17','Completed',NULL,'Early Panicle Potassium Application (K)','2022-03-10','2022-03-17',NULL),(389,'Fertilizer Application',58,'2022-01-05','2022-03-22','Completed',NULL,'Panicle Nitrogen Application (N)','2022-03-15','2022-03-22',NULL),(390,'Fertilizer Application',58,'2022-01-05','2022-04-11','Completed',NULL,'Flowering Nitrogen Application (N)','2022-04-04','2022-04-11',NULL),(391,'Land Preparation',59,'2022-01-05','2020-10-28','Completed',NULL,'Generated Land Preparation Work Order','2020-10-07','2020-10-14',NULL),(392,'Sow Seed',59,'2022-01-05','2020-11-05','Completed',NULL,'Generated Sow Seed Work Order','2020-10-29','2020-11-05',NULL),(393,'Sow Seed',59,'2022-01-05','2020-11-05','Completed',NULL,'Generated Sow Seed Work Order','2020-10-29','2020-11-05',NULL),(394,'Harvest',59,'2022-01-05','2020-12-22','Completed',NULL,'Generated Harvest Work Order','2020-12-15','2022-01-05',NULL),(395,'Provide space',59,'2022-01-05','2020-10-14','Completed',NULL,'Rats: Provide space between plants.','2020-10-07','2020-10-14',NULL),(396,'Clean area',59,'2022-01-05','2020-10-14','Completed',NULL,'Rats: Keep earea and fields clean.','2020-10-07','2020-10-14',NULL),(397,'Grow a ratoon',59,'2022-01-05','2020-10-14','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-10-07','2020-10-14',NULL),(398,'Use hot water',59,'2022-01-05','2020-10-14','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-10-07','2020-10-14',NULL),(399,'Drain the field',59,'2022-01-05','2020-10-14','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-10-07','2020-10-14',NULL),(400,'Clean area',59,'2022-01-05','2020-10-14','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-10-07','2020-10-14',NULL),(401,'Monitor soil nutrients',59,'2022-01-05','2020-10-14','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-10-07','2020-10-14',NULL),(402,'Use hot water',59,'2022-01-05','2020-10-14','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-10-07','2020-10-14',NULL),(403,'Fertilizer Application',59,'2022-01-05','2020-11-04','Completed',NULL,'Phosphorous Application (P)','2020-10-28','2020-11-04',NULL),(404,'Fertilizer Application',59,'2022-01-05','2020-11-04','Completed',NULL,'Basal Potassium Application (K)','2020-10-28','2020-11-04',NULL),(405,'Fertilizer Application',59,'2022-01-05','2020-12-17','Completed',NULL,'Early Panicle Potassium Application (K)','2020-12-10','2020-12-17',NULL),(406,'Land Preparation',60,'2022-01-05','2020-10-28','Completed',NULL,'Generated Land Preparation Work Order','2020-10-07','2020-10-14',NULL),(407,'Sow Seed',60,'2022-01-05','2020-11-05','Completed',NULL,'Generated Sow Seed Work Order','2020-10-29','2020-11-05',NULL),(408,'Sow Seed',60,'2022-01-05','2020-11-05','Completed',NULL,'Generated Sow Seed Work Order','2020-10-29','2020-11-05',NULL),(409,'Harvest',60,'2022-01-05','2020-12-12','Completed',NULL,'Generated Harvest Work Order','2020-12-05','2022-01-05',NULL),(410,'Provide space',60,'2022-01-05','2020-10-14','Completed',NULL,'Rats: Provide space between plants.','2020-10-07','2020-10-14',NULL),(411,'Clean area',60,'2022-01-05','2020-10-14','Completed',NULL,'Rats: Keep earea and fields clean.','2020-10-07','2020-10-14',NULL),(412,'Grow a ratoon',60,'2022-01-05','2020-10-14','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-10-07','2020-10-14',NULL),(413,'Use hot water',60,'2022-01-05','2020-10-14','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-10-07','2020-10-14',NULL),(414,'Drain the field',60,'2022-01-05','2020-10-14','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-10-07','2020-10-14',NULL),(415,'Clean area',60,'2022-01-05','2020-10-14','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-10-07','2020-10-14',NULL),(416,'Monitor soil nutrients',60,'2022-01-05','2020-10-14','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-10-07','2020-10-14',NULL),(417,'Use hot water',60,'2022-01-05','2020-10-14','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-10-07','2020-10-14',NULL),(418,'Fertilizer Application',60,'2022-01-05','2020-11-04','Completed',NULL,'Phosphorous Application (P)','2020-10-28','2020-11-04',NULL),(419,'Fertilizer Application',60,'2022-01-05','2020-11-04','Completed',NULL,'Basal Potassium Application (K)','2020-10-28','2020-11-04',NULL),(420,'Fertilizer Application',60,'2022-01-05','2020-12-17','Completed',NULL,'Early Panicle Potassium Application (K)','2020-12-10','2020-12-17',NULL),(421,'Land Preparation',61,'2022-01-05','2020-10-19','Completed',NULL,'Generated Land Preparation Work Order','2020-09-28','2020-10-05',NULL),(422,'Sow Seed',61,'2022-01-05','2020-10-27','Completed',NULL,'Generated Sow Seed Work Order','2020-10-20','2020-10-27',NULL),(423,'Sow Seed',61,'2022-01-05','2020-10-27','Completed',NULL,'Generated Sow Seed Work Order','2020-10-20','2020-10-27',NULL),(424,'Harvest',61,'2022-01-05','2020-12-03','Completed',NULL,'Generated Harvest Work Order','2020-11-26','2022-01-05',NULL),(425,'Provide space',61,'2022-01-05','2020-10-05','Completed',NULL,'Rats: Provide space between plants.','2020-09-28','2020-10-05',NULL),(426,'Clean area',61,'2022-01-05','2020-10-05','Completed',NULL,'Rats: Keep earea and fields clean.','2020-09-28','2020-10-05',NULL),(427,'Grow a ratoon',61,'2022-01-05','2020-10-05','Completed',NULL,'Rice gall midge: Grow a ratoon.','2020-09-28','2020-10-05',NULL),(428,'Use hot water',61,'2022-01-05','2020-10-05','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2020-09-28','2020-10-05',NULL),(429,'Drain the field',61,'2022-01-05','2020-10-05','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2020-09-28','2020-10-05',NULL),(430,'Clean area',61,'2022-01-05','2020-10-05','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2020-09-28','2020-10-05',NULL),(431,'Monitor soil nutrients',61,'2022-01-05','2020-10-05','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2020-09-28','2020-10-05',NULL),(432,'Use hot water',61,'2022-01-05','2020-10-05','Completed',NULL,'Brown spot: Treat seeds with hot water.','2020-09-28','2020-10-05',NULL),(433,'Fertilizer Application',61,'2022-01-05','2020-10-26','Completed',NULL,'Phosphorous Application (P)','2020-10-19','2020-10-26',NULL),(434,'Fertilizer Application',61,'2022-01-05','2020-10-26','Completed',NULL,'Basal Potassium Application (K)','2020-10-19','2020-10-26',NULL),(435,'Fertilizer Application',61,'2022-01-05','2020-12-08','Completed',NULL,'Early Panicle Potassium Application (K)','2020-12-01','2020-12-08',NULL),(465,'Apply pesticide-Flubendiamide',42,'2022-01-09','2022-01-16','Completed',NULL,'Compost tea and beneficial nematodes.','2022-01-09','2022-01-09',NULL),(490,'Flood the field',42,'2022-01-09','2019-05-08','Completed',NULL,'Flood the fields with water.','2019-05-01','2022-01-09',NULL),(491,'Let dogs loose',42,'2022-01-09','2019-05-08','Completed',NULL,'Use dogs to locate active rat burrows','2019-05-01','2022-01-09',NULL),(492,'Apply pesticide-Spinetoram',42,'2022-01-09','2019-05-12','Completed',NULL,'use treatments of carbamate insecticides','2019-05-05','2022-01-09',NULL),(493,'Use Biological control agents',42,'2022-01-09','2019-05-12','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-05-05','2022-01-09',NULL),(494,'Use Biological control agents',42,'2022-01-09','2019-07-11','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-07-04','2022-01-09',NULL),(495,'Apply fungicide-Hexaconazol',42,'2022-01-09','2019-06-10','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2019-06-03','2022-01-09',NULL),(496,'Use Biological control agents',43,'2022-01-09','2019-05-16','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-05-09','2022-01-09',NULL),(497,'Apply pesticide-Flubendiamide',43,'2022-01-09','2019-05-16','Completed',NULL,'Compost tea and beneficial nematodes.','2019-05-09','2022-01-09',NULL),(498,'Flood the field',43,'2022-01-09','2019-05-28','Completed',NULL,'Flood the fields with water.','2019-05-21','2022-01-09',NULL),(499,'Sweep Seedbeds',43,'2022-01-09','2019-05-28','Completed',NULL,'Sweep small seedbeds with a net to remove some BPH, particularly from dry seed beds. ','2019-05-21','2022-01-09',NULL),(500,'Use Biological control agents',43,'2022-01-09','2019-06-06','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-05-30','2022-01-09',NULL),(501,'Apply pesticide-Flubendiamide',43,'2022-01-09','2019-06-06','Completed',NULL,'Compost tea and beneficial nematodes.','2019-05-30','2022-01-09',NULL),(502,'Apply pesticide-Spinetoram',59,'2022-01-09','2022-01-16','Completed',NULL,'use treatments of carbamate insecticides','2022-01-09','2022-01-09',NULL),(503,'Use Biological control agents',59,'2022-01-09','2022-01-16','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2022-01-09','2022-01-09',NULL),(504,'Apply fungicide-Hexaconazol',44,'2022-01-09','2019-06-21','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2019-06-14','2022-01-09',NULL),(505,'Use Biological control agents',45,'2022-01-09','2019-05-25','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-05-18','2022-01-09',NULL),(506,'Apply pesticide-Flubendiamide',45,'2022-01-09','2019-05-25','Completed',NULL,'Compost tea and beneficial nematodes.','2019-05-18','2022-01-09',NULL),(507,'Flood the field',45,'2022-01-09','2019-07-23','Completed',NULL,'Flood the fields with water.','2019-07-16','2022-01-09',NULL),(508,'Sweep Seedbeds',45,'2022-01-09','2019-07-23','Completed',NULL,'Sweep small seedbeds with a net to remove some BPH, particularly from dry seed beds. ','2019-07-16','2022-01-09',NULL),(509,'Apply fungicide-Hexaconazol',45,'2022-01-09','2019-06-18','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2019-06-11','2022-01-09',NULL),(510,'Apply pesticide-Spinetoram',47,'2022-01-09','2019-11-20','Completed',NULL,'use treatments of carbamate insecticides','2019-11-13','2022-01-09',NULL),(511,'Use Biological control agents',47,'2022-01-09','2019-11-20','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-11-13','2022-01-09',NULL),(512,'Flood the field',47,'2022-01-09','2019-12-01','Completed',NULL,'Flood the fields with water.','2019-11-24','2022-01-09',NULL),(513,'Sweep Seedbeds',47,'2022-01-09','2019-12-01','Completed',NULL,'Sweep small seedbeds with a net to remove some BPH, particularly from dry seed beds. ','2019-11-24','2022-01-09',NULL),(514,'Flood the field',47,'2022-01-09','2019-12-11','Completed',NULL,'Flood the fields with water.','2019-12-04','2022-01-09',NULL),(515,'Let dogs loose',47,'2022-01-09','2019-12-11','Completed',NULL,'Use dogs to locate active rat burrows','2019-12-04','2022-01-09',NULL),(516,'Use Biological control agents',43,'2022-01-09','2019-10-29','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-10-22','2022-01-09',NULL),(517,'Apply pesticide-Flubendiamide',43,'2022-01-09','2019-10-29','Completed',NULL,'Compost tea and beneficial nematodes.','2019-10-22','2022-01-09',NULL),(518,'Drain the field',48,'2022-01-09','2019-11-19','Completed',NULL,'Drain the field during severe flood','2019-11-12','2022-01-09',NULL),(519,'Use Biological control agents',44,'2022-01-09','2019-10-31','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-10-24','2022-01-09',NULL),(520,'Apply pesticide-Flubendiamide',44,'2022-01-09','2019-10-31','Completed',NULL,'Compost tea and beneficial nematodes.','2019-10-24','2022-01-09',NULL),(521,'Flood the field',49,'2022-01-09','2019-11-21','Completed',NULL,'Flood the fields with water.','2019-11-14','2022-01-09',NULL),(522,'Sweep Seedbeds',49,'2022-01-09','2019-11-21','Completed',NULL,'Sweep small seedbeds with a net to remove some BPH, particularly from dry seed beds. ','2019-11-14','2022-01-09',NULL),(523,'Use Biological control agents',50,'2022-01-09','2019-11-26','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-11-19','2022-01-09',NULL),(524,'Apply fungicide-Hexaconazol',50,'2022-01-09','2019-11-07','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2019-10-31','2022-01-09',NULL),(525,'Drain the field',50,'2022-01-09','2019-11-07','Completed',NULL,'Drain the field during severe flood','2019-10-31','2022-01-09',NULL),(526,'Use Biological control agents',50,'2022-01-09','2019-11-16','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-11-09','2022-01-09',NULL),(527,'Flood the field',50,'2022-01-09','2019-11-16','Completed',NULL,'Flood the fields with water.','2019-11-09','2022-01-09',NULL),(528,'Apply pesticide-Flubendiamide',50,'2022-01-09','2019-11-16','Completed',NULL,'Compost tea and beneficial nematodes.','2019-11-09','2022-01-09',NULL),(529,'Apply pesticide-Spinetoram',51,'2022-01-09','2019-12-27','Completed',NULL,'use treatments of carbamate insecticides','2019-12-20','2022-01-09',NULL),(530,'Use Biological control agents',51,'2022-01-09','2019-12-27','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2019-12-20','2022-01-09',NULL),(531,'Apply fungicide-Hexaconazol',51,'2022-01-09','2020-01-05','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2019-12-29','2022-01-09',NULL),(532,'Drain the field',51,'2022-01-09','2020-01-05','Completed',NULL,'Drain the field during severe flood','2019-12-29','2022-01-09',NULL),(533,'Use Biological control agents',52,'2022-01-09','2020-05-04','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-04-27','2022-01-09',NULL),(534,'Flood the field',52,'2022-01-09','2020-06-16','Completed',NULL,'Flood the fields with water.','2020-06-09','2022-01-09',NULL),(535,'Let dogs loose',52,'2022-01-09','2020-06-16','Completed',NULL,'Use dogs to locate active rat burrows','2020-06-09','2022-01-09',NULL),(536,'Apply fungicide-Hexaconazol',57,'2022-01-09','2022-05-31','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2022-05-24','2022-01-09',NULL),(537,'Drain the field',57,'2022-01-09','2022-05-31','Completed',NULL,'Drain the field during severe flood','2022-05-24','2022-01-09',NULL),(538,'Clipping shoots',53,'2022-01-09','2020-06-12','Completed',NULL,'lipping and burying shoots in the mud can reduce grub populations','2020-06-05','2022-01-09',NULL),(539,'Burying shoots',53,'2022-01-09','2020-06-12','Completed',NULL,'lipping and burying shoots in the mud can reduce grub populations','2020-06-05','2022-01-09',NULL),(540,'Use Biological control agents',53,'2022-01-09','2020-06-12','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-06-05','2022-01-09',NULL),(541,'Remove infected seeds',53,'2022-01-09','2020-05-25','Completed',NULL,'Remove infected seeds, panicles, and plant debris ','2020-05-18','2022-01-09',NULL),(542,'Use Biological control agents',53,'2022-01-09','2020-06-19','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-06-12','2022-01-09',NULL),(543,'Apply pesticide-Spinetoram',54,'2022-01-09','2020-05-18','Completed',NULL,'use treatments of carbamate insecticides','2020-05-11','2022-01-09',NULL),(544,'Use Biological control agents',54,'2022-01-09','2020-05-18','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-05-11','2022-01-09',NULL),(545,'Use Biological control agents',54,'2022-01-09','2020-06-10','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-06-03','2022-01-09',NULL),(546,'Apply pesticide-Flubendiamide',54,'2022-01-09','2020-06-10','Completed',NULL,'Compost tea and beneficial nematodes.','2020-06-03','2022-01-09',NULL),(547,'Apply fungicide-Hexaconazol',55,'2022-01-09','2020-04-21','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2020-04-14','2022-01-09',NULL),(548,'Use Biological control agents',55,'2022-01-09','2020-06-19','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-06-12','2022-01-09',NULL),(549,'Flood the field',56,'2022-01-09','2020-06-15','Completed',NULL,'Flood the fields with water.','2020-06-08','2022-01-09',NULL),(550,'Let dogs loose',56,'2022-01-09','2020-06-15','Completed',NULL,'Use dogs to locate active rat burrows','2020-06-08','2022-01-09',NULL),(551,'Drain the field',56,'2022-01-09','2020-07-29','Completed',NULL,'Drain the field during severe flood','2020-07-22','2022-01-09',NULL),(552,'Apply pesticide-Spinetoram',47,'2022-01-09','2020-09-24','Completed',NULL,'use treatments of carbamate insecticides','2020-09-17','2022-01-09',NULL),(553,'Use Biological control agents',47,'2022-01-09','2020-09-24','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-09-17','2022-01-09',NULL),(554,'Remove infected seeds',52,'2022-01-09','2020-10-27','Completed',NULL,'Remove infected seeds, panicles, and plant debris ','2020-10-20','2022-01-09',NULL),(555,'Flood the field',53,'2022-01-09','2020-10-27','Completed',NULL,'Flood the fields with water.','2020-10-20','2022-01-09',NULL),(556,'Let dogs loose',53,'2022-01-09','2020-10-27','Completed',NULL,'Use dogs to locate active rat burrows','2020-10-20','2022-01-09',NULL),(557,'Flood the field',53,'2022-01-09','2020-10-02','Completed',NULL,'Flood the fields with water.','2020-09-25','2022-01-09',NULL),(558,'Sweep Seedbeds',53,'2022-01-09','2020-10-02','Completed',NULL,'Sweep small seedbeds with a net to remove some BPH, particularly from dry seed beds. ','2020-09-25','2022-01-09',NULL),(559,'Use Biological control agents',59,'2022-01-09','2020-12-03','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-11-26','2022-01-09',NULL),(560,'Apply fungicide-Hexaconazol',54,'2022-01-09','2020-10-16','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2020-10-09','2022-01-09',NULL),(561,'Drain the field',54,'2022-01-09','2020-10-16','Completed',NULL,'Drain the field during severe flood','2020-10-09','2022-01-09',NULL),(562,'Flood the field',55,'2022-01-09','2020-10-28','Completed',NULL,'Flood the fields with water.','2020-10-21','2022-01-09',NULL),(563,'Apply pesticide-Fipronil',55,'2022-01-09','2020-10-28','Completed',NULL,'Use mixed rice bran and insecticides','2020-10-21','2022-01-09',NULL),(564,'Drain the field',60,'2022-01-09','2020-12-30','Completed',NULL,'Drain the field during severe flood','2020-12-23','2022-01-09',NULL),(565,'Use Biological control agents',56,'2022-01-09','2020-10-16','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-10-09','2022-01-09',NULL),(566,'Apply fungicide-Hexaconazol',61,'2022-01-09','2020-11-13','Completed',NULL,'Use copper-based fungicide applied at heading can be effective in controlling the disease.','2020-11-06','2022-01-09',NULL),(567,'Clipping shoots',59,'2022-01-09','2020-12-11','Completed',NULL,'lipping and burying shoots in the mud can reduce grub populations','2020-12-04','2022-01-09',NULL),(568,'Burying shoots',59,'2022-01-09','2020-12-11','Completed',NULL,'lipping and burying shoots in the mud can reduce grub populations','2020-12-04','2022-01-09',NULL),(569,'Use Biological control agents',59,'2022-01-09','2020-12-11','Completed',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2020-12-04','2022-01-09',NULL),(579,'Land Preparation',64,'2022-01-14','2021-08-27','Completed',NULL,'Generated Land Preparation Work Order','2021-08-06','2021-08-27',NULL),(580,'Sow Seed',64,'2022-01-14','2021-08-30','Completed',NULL,'Generated Sow Seed Work Order','2021-08-28','2021-08-30',NULL),(581,'Harvest',64,'2022-01-14','2022-02-08','Pending',NULL,'Generated Harvest Work Order','2022-02-01',NULL,NULL),(582,'Provide space',64,'2022-01-14','2021-09-06','Completed',NULL,'Rats: Provide space between plants.','2021-08-30','2021-09-06',NULL),(583,'Clean area',64,'2022-01-14','2021-09-06','Completed',NULL,'Rats: Keep earea and fields clean.','2021-08-30','2021-09-06',NULL),(584,'Grow a ratoon',64,'2022-01-14','2021-08-13','Completed',NULL,'Rice gall midge: Grow a ratoon.','2021-08-06','2021-08-13',NULL),(585,'Provide space',64,'2022-01-14','2022-01-09','Completed',NULL,'Rice Caseworm: Provide space between plants.','2022-01-02','2022-01-09',NULL),(586,'Drain the field',64,'2022-01-14','2022-01-09','Completed',NULL,'Rice Caseworm: Drain field to prevent production.','2022-01-02','2022-01-09',NULL),(587,'Grow a ratoon',64,'2022-01-14','2022-01-09','Completed',NULL,'Rice Caseworm: Grow a ratoon.','2022-01-02','2022-01-09',NULL),(588,'Use hot water',64,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2022-01-02','2022-01-09',NULL),(589,'Drain the field',64,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2022-01-02','2022-01-09',NULL),(590,'Clean area',64,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2022-01-02','2022-01-09',NULL),(591,'Monitor soil nutrients',64,'2022-01-14','2022-01-09','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2022-01-02','2022-01-09',NULL),(592,'Use hot water',64,'2022-01-14','2022-01-09','Completed',NULL,'Brown spot: Treat seeds with hot water.','2022-01-02','2022-01-09',NULL),(593,'Drain the field',64,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial Blight: Drain field to prevent production.','2022-01-02','2022-01-09',NULL),(594,'Fertilizer Application',64,'2022-01-14','2021-09-03','Completed',NULL,'Phosphorous Application (P)','2021-08-27','2021-09-03',NULL),(595,'Fertilizer Application',64,'2022-01-14','2021-09-03','Completed',NULL,'Basal Potassium Application (K)','2021-08-27','2021-09-03',NULL),(596,'Fertilizer Application',64,'2022-01-14','2021-09-06','Completed',NULL,'Basal Nitrogen Application (N)','2021-08-30','2021-09-06',NULL),(597,'Fertilizer Application',64,'2022-01-14','2021-09-20','Completed',NULL,'Tillering Nitrogen Application (N)','2021-09-13','2021-09-20',NULL),(598,'Fertilizer Application',64,'2022-01-14','2021-09-26','Completed',NULL,'Midtillering Nitrogen Application (N)','2021-09-19','2021-09-26',NULL),(599,'Fertilizer Application',64,'2022-01-14','2021-10-11','Completed',NULL,'Early Panicle Potassium Application (K)','2021-10-04','2021-10-11',NULL),(600,'Fertilizer Application',64,'2022-01-14','2021-10-16','Completed',NULL,'Panicle Nitrogen Application (N)','2021-10-09','2021-10-16',NULL),(601,'Fertilizer Application',64,'2022-01-14','2021-11-05','Completed',NULL,'Flowering Nitrogen Application (N)','2021-10-29','2021-11-05',NULL),(602,'Land Preparation',65,'2022-01-14','2021-08-27','Completed',NULL,'Generated Land Preparation Work Order','2021-08-06','2021-08-27',NULL),(603,'Sow Seed',65,'2022-01-14','2021-08-30','Completed',NULL,'Generated Sow Seed Work Order','2021-08-28','2021-08-30',NULL),(604,'Harvest',65,'2022-01-14','2022-02-08','Pending',NULL,'Generated Harvest Work Order','2022-02-01',NULL,NULL),(605,'Provide space',65,'2022-01-14','2021-09-06','Completed',NULL,'Rats: Provide space between plants.','2021-08-30','2021-09-06',NULL),(606,'Clean area',65,'2022-01-14','2021-09-06','Completed',NULL,'Rats: Keep earea and fields clean.','2021-08-30','2021-09-06',NULL),(607,'Grow a ratoon',65,'2022-01-14','2021-08-13','Completed',NULL,'Rice gall midge: Grow a ratoon.','2021-08-06','2021-08-13',NULL),(608,'Provide space',65,'2022-01-14','2022-01-09','Completed',NULL,'Rice Caseworm: Provide space between plants.','2022-01-02','2022-01-09',NULL),(609,'Drain the field',65,'2022-01-14','2022-01-09','Completed',NULL,'Rice Caseworm: Drain field to prevent production.','2022-01-02','2022-01-09',NULL),(610,'Grow a ratoon',65,'2022-01-14','2022-01-09','Completed',NULL,'Rice Caseworm: Grow a ratoon.','2022-01-02','2022-01-09',NULL),(611,'Use hot water',65,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2022-01-02','2022-01-09',NULL),(612,'Drain the field',65,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial leaf streak: Drain field to prevent production.','2022-01-02','2022-01-09',NULL),(613,'Clean area',65,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2022-01-02','2022-01-09',NULL),(614,'Monitor soil nutrients',65,'2022-01-14','2022-01-09','Completed',NULL,'Brown spot: monitor soil nutrients regularly','2022-01-02','2022-01-09',NULL),(615,'Use hot water',65,'2022-01-14','2022-01-09','Completed',NULL,'Brown spot: Treat seeds with hot water.','2022-01-02','2022-01-09',NULL),(616,'Drain the field',65,'2022-01-14','2022-01-09','Completed',NULL,'Bacterial Blight: Drain field to prevent production.','2022-01-02','2022-01-09',NULL),(617,'Fertilizer Application',65,'2022-01-14','2021-09-03','Completed',NULL,'Phosphorous Application (P)','2021-08-27','2021-09-03',NULL),(618,'Fertilizer Application',65,'2022-01-14','2021-09-03','Completed',NULL,'Basal Potassium Application (K)','2021-08-27','2021-09-03',NULL),(619,'Fertilizer Application',65,'2022-01-14','2021-09-06','Completed',NULL,'Basal Nitrogen Application (N)','2021-08-30','2021-09-06',NULL),(620,'Fertilizer Application',65,'2022-01-14','2021-09-20','Completed',NULL,'Tillering Nitrogen Application (N)','2021-09-13','2021-09-20',NULL),(621,'Fertilizer Application',65,'2022-01-14','2021-09-26','Completed',NULL,'Midtillering Nitrogen Application (N)','2021-09-19','2021-09-26',NULL),(622,'Fertilizer Application',65,'2022-01-14','2021-10-11','Completed',NULL,'Early Panicle Potassium Application (K)','2021-10-04','2021-10-11',NULL),(623,'Fertilizer Application',65,'2022-01-14','2021-10-16','Completed',NULL,'Panicle Nitrogen Application (N)','2021-10-09','2021-10-16',NULL),(624,'Fertilizer Application',65,'2022-01-14','2021-11-05','Completed',NULL,'Flowering Nitrogen Application (N)','2021-10-29','2021-11-05',NULL),(625,'Use Biological control agents',57,'2022-01-14','2022-01-21','Pending',NULL,'Encourage biological control agents: snails, beetles, spiders, dragonflies','2022-01-14',NULL,NULL),(626,'Land Preparation',67,'2022-01-27','2021-09-09','Completed',NULL,'Generated Land Preparation Work Order','2021-08-19','2021-09-09',NULL),(627,'Sow Seed',67,'2022-01-27','2021-09-12','Completed',NULL,'Generated Sow Seed Work Order','2021-09-10','2021-09-12',NULL),(628,'Harvest',67,'2022-01-27','2022-02-16','Pending',NULL,'Generated Harvest Work Order','2022-02-09',NULL,NULL),(629,'Land Preparation',68,'2022-01-27','2021-12-11','Completed',NULL,'Generated Land Preparation Work Order','2021-11-20','2021-12-11',NULL),(630,'Sow Seed',68,'2022-01-27','2021-12-22','Completed',NULL,'Generated Sow Seed Work Order','2021-12-12','2021-12-22',NULL),(631,'Harvest',68,'2022-01-27','2022-06-02','Pending',NULL,'Generated Harvest Work Order','2022-05-26',NULL,NULL),(632,'Provide space',68,'2022-01-27','2021-12-29','Completed',NULL,'Rats: Provide space between plants.','2021-12-22','2021-12-29',NULL),(633,'Clean area',68,'2022-01-27','2021-12-29','Completed',NULL,'Rats: Keep earea and fields clean.','2021-12-22','2021-12-29',NULL),(634,'Use hot water',68,'2022-01-27','2022-05-03','Pending',NULL,'Bacterial leaf streak: Treat seeds with hot water.','2022-04-26',NULL,NULL),(635,'Drain the field',68,'2022-01-27','2022-05-03','Pending',NULL,'Bacterial leaf streak: Drain field to prevent production.','2022-04-26',NULL,NULL),(636,'Clean area',68,'2022-01-27','2022-05-03','Pending',NULL,'Bacterial leaf streak: Keep earea and fields clean.','2022-04-26',NULL,NULL),(637,'Monitor soil nutrients',68,'2022-01-27','2022-05-03','Pending',NULL,'Brown spot: monitor soil nutrients regularly','2022-04-26',NULL,NULL),(638,'Use hot water',68,'2022-01-27','2022-05-03','Pending',NULL,'Brown spot: Treat seeds with hot water.','2022-04-26',NULL,NULL),(639,'Fertilizer Application',68,'2022-01-27','2021-12-18','Completed',NULL,'Basal Potassium Application (K)','2021-12-11','2021-12-18',NULL),(640,'Fertilizer Application',68,'2022-01-27','2021-12-29','Completed',NULL,'Basal Nitrogen Application (N)','2021-12-22','2021-12-29',NULL),(641,'Fertilizer Application',68,'2022-01-27','2022-01-10','Completed',NULL,'Phosphorous Application (P)','2022-01-03','2022-01-10',NULL),(642,'Fertilizer Application',68,'2022-01-27','2022-01-12','Completed',NULL,'Tillering Nitrogen Application (N)','2022-01-05','2022-01-12',NULL),(643,'Fertilizer Application',68,'2022-01-27','2022-01-18','Completed',NULL,'Midtillering Nitrogen Application (N)','2022-01-11','2022-01-18',NULL),(644,'Fertilizer Application',68,'2022-01-27','2022-02-02','Pending',NULL,'Early Panicle Potassium Application (K)','2022-01-26',NULL,NULL),(645,'Fertilizer Application',68,'2022-01-27','2022-02-07','Pending',NULL,'Panicle Nitrogen Application (N)','2022-01-31',NULL,NULL),(646,'Fertilizer Application',68,'2022-01-27','2022-02-27','Pending',NULL,'Flowering Nitrogen Application (N)','2022-02-20',NULL,NULL);
/*!40000 ALTER TABLE `work_order_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-28 13:43:31
