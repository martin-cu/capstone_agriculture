CREATE DATABASE  IF NOT EXISTS `capstone_agriculture_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_agriculture_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_agriculture_db
-- ------------------------------------------------------
-- Server version	8.0.26

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_calendar_table`
--

LOCK TABLES `crop_calendar_table` WRITE;
/*!40000 ALTER TABLE `crop_calendar_table` DISABLE KEYS */;
INSERT INTO `crop_calendar_table` VALUES (32,48,'2021-10-30 00:00:00','2021-11-15 00:00:00','2021-11-15 00:00:00',NULL,1,'Completed',70,30,'PALAY 2021 - Transplant','Transplanting'),(33,49,'2021-10-30 00:00:00','2021-11-15 00:00:00','2021-11-15 00:00:00',NULL,3,'Completed',70,5,'PALAY 2021 - Direct Seeding','Direct Seeding'),(34,50,'2022-01-06 00:00:00','2022-01-14 00:00:00','2022-02-20 00:00:00',NULL,1,'Completed',70,30,'PALAY 2021 - Direct Seeding','Direct Seeding'),(35,51,'2022-01-06 00:00:00','2022-01-14 00:00:00','2022-02-10 00:00:00',NULL,2,'In-Progress',70,32,'PALAY 2021 - Transplant','Transplanting'),(36,48,'2022-01-22 00:00:00','2022-01-30 00:00:00','2022-02-06 00:00:00',NULL,1,'In-Progress',40,NULL,'PALAY 2022 - Transplant','Transplanting'),(38,53,'2022-01-10 00:00:00','2022-01-18 00:00:00','2022-02-19 00:00:00',NULL,3,'In-Progress',40,NULL,'PALAY 2021 - Transplant','Transplanting');
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
  PRIMARY KEY (`diagnosis_id`),
  KEY `diag_farm_idx` (`farm_id`),
  KEY `calendar_id_diagnosis_idx` (`calendar_id`),
  CONSTRAINT `calendar_id_diagnosis` FOREIGN KEY (`calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`),
  CONSTRAINT `diag_farm` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
INSERT INTO `diagnosis` VALUES (9,'Pest','2021-12-16','2021-12-16',48,NULL,2,32,'Solved'),(10,'Disease','2021-12-17',NULL,50,NULL,2,36,'Present');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis_symptom`
--

LOCK TABLES `diagnosis_symptom` WRITE;
/*!40000 ALTER TABLE `diagnosis_symptom` DISABLE KEYS */;
INSERT INTO `diagnosis_symptom` VALUES (1,9,1),(2,9,3),(3,9,7),(4,9,8),(5,10,1),(6,10,4),(7,10,7);
/*!40000 ALTER TABLE `diagnosis_symptom` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease_table`
--

LOCK TABLES `disease_table` WRITE;
/*!40000 ALTER TABLE `disease_table` DISABLE KEYS */;
INSERT INTO `disease_table` VALUES (1,'Bacterial Blight','It causes wilting of seedlings and yellowing and drying of leaves.','Xanthomonas oryzae pv. oryzae.'),(2,'Bacterial leaf streak','Infected plants show browning and drying of leaves. ','Xanthomonas oryzae pv. oryzicola');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_table`
--

LOCK TABLES `employee_table` WRITE;
/*!40000 ALTER TABLE `employee_table` DISABLE KEYS */;
INSERT INTO `employee_table` VALUES (1,'Office Worker','last','first','9293150238'),(3,'Office Worker','last','first','9293150233'),(4,'Farmer','Acena','Orlino','9138457'),(5,'Farmer','Acena','Pablo','9169821'),(6,'Farm Manager','Sina','Reymund','13432874'),(7,'Farm Manager','Soriano','Paulino','1345672874'),(8,'Farmer','Baldemor','Jose Marlon','98231'),(9,'Farmer','Villanueva','Joseph','111110'),(10,'Farm Manager','Ubay','Bernardo','111111'),(11,'Farmer','Balneg','Jaime','111112'),(12,'Farm Manager','Tolentino','Bonnie','111113'),(13,'Farm Manager','Banay','Elmer','111113123'),(14,'Farm Manager','Rosario','Marilou','231123');
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_assignment`
--

LOCK TABLES `farm_assignment` WRITE;
/*!40000 ALTER TABLE `farm_assignment` DISABLE KEYS */;
INSERT INTO `farm_assignment` VALUES (35,4,48,'Active'),(36,6,48,'Active'),(37,9,49,'Active'),(38,7,49,'Active'),(39,8,50,'Active'),(40,12,50,'Active'),(41,5,51,'Active'),(42,10,51,'Active'),(43,11,53,'Active'),(44,13,53,'Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_materials`
--

LOCK TABLES `farm_materials` WRITE;
/*!40000 ALTER TABLE `farm_materials` DISABLE KEYS */;
INSERT INTO `farm_materials` VALUES (1,48,5,'Pesticide',100,1),(20,52,1,'Seed',100,1),(21,52,3,'Seed',100,1),(22,52,2,'Seed',100,1),(23,50,2,'Pesticide',100,1),(24,50,1,'Pesticide',100,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_table`
--

LOCK TABLES `farm_table` WRITE;
/*!40000 ALTER TABLE `farm_table` DISABLE KEYS */;
INSERT INTO `farm_table` VALUES (48,'Farm 1',NULL,2,'Upland','Active'),(49,'Farm 2',NULL,1.28,'Upland','Active'),(50,'Farm 3',NULL,2.79,'Lowland','Active'),(51,'Farm 4',NULL,3.13,'Lowland','Active'),(52,'Farm 5','Elmer\'s Farm',2.18,'Lowland','Active'),(53,'Farm 6','Elmer\'s Farm',1.98,'Upland','Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_types`
--

LOCK TABLES `farm_types` WRITE;
/*!40000 ALTER TABLE `farm_types` DISABLE KEYS */;
INSERT INTO `farm_types` VALUES (1,'Upland','The farm is upland'),(2,'Lowland','The farm is lowland'),(3,'Irrigated','The farm is irrigated'),(4,'Rainfed','The farm is rainfed'),(5,'Transplanting','Planting method used is transplanting');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_types_disease`
--

LOCK TABLES `farm_types_disease` WRITE;
/*!40000 ALTER TABLE `farm_types_disease` DISABLE KEYS */;
INSERT INTO `farm_types_disease` VALUES (1,1,2),(2,2,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmtypes_pest`
--

LOCK TABLES `farmtypes_pest` WRITE;
/*!40000 ALTER TABLE `farmtypes_pest` DISABLE KEYS */;
INSERT INTO `farmtypes_pest` VALUES (1,3,3),(2,5,3),(3,3,2),(4,5,3),(5,3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_recommendation_items`
--

LOCK TABLES `fertilizer_recommendation_items` WRITE;
/*!40000 ALTER TABLE `fertilizer_recommendation_items` DISABLE KEYS */;
INSERT INTO `fertilizer_recommendation_items` VALUES (97,14,'2022-01-06',2,'Phosphorous Application (P)',29.5619,'P',1,72),(98,14,'2022-01-06',7,'Basal Potassium Application (K)',4.45,'K',1,73),(99,14,'2022-01-14',1,'Basal Nitrogen Application (N)',0.43,'N',1,74),(100,14,'2022-01-28',1,'Tillering Nitrogen Application (N)',0.76,'N',1,75),(101,14,'2022-02-03',1,'Midtillering Nitrogen Application (N)',0.76,'N',1,76),(102,14,'2022-02-18',7,'Early Panicle Potassium Application (K)',4.45,'K',1,77),(103,14,'2022-02-23',1,'Panicle Nitrogen Application (N)',1.3,'N',1,78),(104,14,'2022-03-15',1,'Flowering Nitrogen Application (N)',0.33,'N',1,79),(105,15,'2022-01-06',2,'Phosphorous Application (P)',18.9194,'P',1,83),(106,15,'2022-01-06',7,'Basal Potassium Application (K)',2.85,'K',1,84),(107,15,'2022-01-14',1,'Basal Nitrogen Application (N)',0.43,'N',1,85),(108,15,'2022-01-28',1,'Tillering Nitrogen Application (N)',0.76,'N',1,86),(109,15,'2022-02-03',1,'Midtillering Nitrogen Application (N)',0.98,'N',1,87),(110,15,'2022-02-18',7,'Early Panicle Potassium Application (K)',2.85,'K',1,88),(111,15,'2022-02-23',1,'Panicle Nitrogen Application (N)',1.3,'N',1,89),(112,15,'2022-03-15',1,'Flowering Nitrogen Application (N)',0.33,'N',1,90),(113,16,'2022-01-06',2,'Phosphorous Application (P)',41.2381,'P',1,94),(114,16,'2022-01-06',7,'Basal Potassium Application (K)',6.21,'K',1,95),(115,16,'2022-01-14',1,'Basal Nitrogen Application (N)',0.43,'N',1,96),(116,16,'2022-01-28',1,'Tillering Nitrogen Application (N)',0.76,'N',1,97),(117,16,'2022-02-03',1,'Midtillering Nitrogen Application (N)',0.98,'N',1,98),(118,16,'2022-02-18',7,'Early Panicle Potassium Application (K)',6.21,'K',1,99),(119,16,'2022-02-23',1,'Panicle Nitrogen Application (N)',1.3,'N',1,100),(120,16,'2022-03-15',1,'Flowering Nitrogen Application (N)',0.33,'N',1,101),(121,17,'1970-01-01',2,'Phosphorous Application (P)',46.2637,'P',1,105),(122,17,'2022-01-06',7,'Basal Potassium Application (K)',6.96,'K',1,106),(123,17,'2022-01-14',1,'Basal Nitrogen Application (N)',0.43,'N',1,107),(124,17,'2022-01-28',1,'Tillering Nitrogen Application (N)',0.76,'N',1,108),(125,17,'2022-02-03',1,'Midtillering Nitrogen Application (N)',0.76,'N',1,109),(126,17,'2022-02-18',7,'Early Panicle Potassium Application (K)',6.96,'K',1,110),(127,17,'2022-02-23',1,'Panicle Nitrogen Application (N)',1.3,'N',1,111),(128,17,'2022-03-15',1,'Flowering Nitrogen Application (N)',0.33,'N',1,112),(129,18,'2022-01-22',2,'Phosphorous Application (P)',29.5619,'P',1,117),(130,18,'2022-01-22',7,'Basal Potassium Application (K)',4.45,'K',1,118),(131,18,'2022-01-30',1,'Basal Nitrogen Application (N)',0.43,'N',1,119),(132,18,'2022-02-13',1,'Tillering Nitrogen Application (N)',0.76,'N',1,120),(133,18,'2022-02-19',1,'Midtillering Nitrogen Application (N)',0.76,'N',1,121),(134,18,'2022-03-06',7,'Early Panicle Potassium Application (K)',4.45,'K',1,122),(135,18,'2022-03-11',1,'Panicle Nitrogen Application (N)',1.3,'N',1,123),(136,18,'2022-03-31',1,'Flowering Nitrogen Application (N)',0.33,'N',1,124),(137,18,'2022-02-19',1,'Midtillering Nitrogen Application (N)',0.98,'N',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_recommendation_plan`
--

LOCK TABLES `fertilizer_recommendation_plan` WRITE;
/*!40000 ALTER TABLE `fertilizer_recommendation_plan` DISABLE KEYS */;
INSERT INTO `fertilizer_recommendation_plan` VALUES (14,32,'2021-12-16',48),(15,33,'2021-12-16',49),(16,34,'2021-12-16',50),(17,35,'2021-12-25',51),(18,36,'2021-12-25',48),(19,38,'2021-12-17',53);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `harvest_details`
--

LOCK TABLES `harvest_details` WRITE;
/*!40000 ALTER TABLE `harvest_details` DISABLE KEYS */;
INSERT INTO `harvest_details` VALUES (3,55,'Harvesting','Early Harvest',35),(4,88,'Harvesting','Partial Harvest',35);
/*!40000 ALTER TABLE `harvest_details` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pd_probabilities`
--

LOCK TABLES `pd_probabilities` WRITE;
/*!40000 ALTER TABLE `pd_probabilities` DISABLE KEYS */;
INSERT INTO `pd_probabilities` VALUES (41,'Disease',1,50,'2021-12-27',48,36),(42,'Pest',2,33,'2021-12-27',48,36),(43,'Disease',2,25,'2021-12-27',48,36),(44,'Disease',1,50,'2021-12-27',49,37),(45,'Pest',2,33,'2021-12-27',49,37),(46,'Disease',2,25,'2021-12-27',49,37),(47,'Disease',1,50,'2021-12-27',50,34),(48,'Pest',2,33,'2021-12-27',50,34),(49,'Disease',2,25,'2021-12-27',50,34),(50,'Disease',1,50,'2021-12-27',51,35),(51,'Pest',2,33,'2021-12-27',51,35),(52,'Disease',2,25,'2021-12-27',51,35);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pest_table`
--

LOCK TABLES `pest_table` WRITE;
/*!40000 ALTER TABLE `pest_table` DISABLE KEYS */;
INSERT INTO `pest_table` VALUES (1,'Rats','Rodents running around the farm','Rattus'),(2,'Rice Hispa','Rice hispa scrapes the upper surface of leaf blades leaving only the lower epidermis.','Dicladispa armigera'),(3,'Rice Caseworm','Rice caseworms or case bearers cut off leaf tips to make leaf cases. ','Nymphula depunctalis ');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pesticide_table`
--

LOCK TABLES `pesticide_table` WRITE;
/*!40000 ALTER TABLE `pesticide_table` DISABLE KEYS */;
INSERT INTO `pesticide_table` VALUES (1,'Pesticide11','for bugs','Bags'),(2,'Pesticide2','for worms','Bags'),(3,'PestIdIde','New pesticide desc','Bags'),(5,'PestIdIde3','New pesticide desc','Bags');
/*!40000 ALTER TABLE `pesticide_table` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prevention_disease`
--

LOCK TABLES `prevention_disease` WRITE;
/*!40000 ALTER TABLE `prevention_disease` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prevention_pest`
--

LOCK TABLES `prevention_pest` WRITE;
/*!40000 ALTER TABLE `prevention_pest` DISABLE KEYS */;
INSERT INTO `prevention_pest` VALUES (1,2,1),(2,1,1),(3,3,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prevention_table`
--

LOCK TABLES `prevention_table` WRITE;
/*!40000 ALTER TABLE `prevention_table` DISABLE KEYS */;
INSERT INTO `prevention_table` VALUES (1,'Water Field','Flod the field with 2cm of water.'),(2,'Apply Fertilizer','Apply fertilizer with organic materials'),(3,'Plant Seeds Early','Plant the seeds as soon as possible');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_table`
--

LOCK TABLES `purchase_table` WRITE;
/*!40000 ALTER TABLE `purchase_table` DISABLE KEYS */;
INSERT INTO `purchase_table` VALUES (16,1,'Seed','Farm 1 Purchase Request',NULL,NULL,50,'Processing',1,'2021-12-16',48),(17,2,'Seed','Farm 1 Purchase Request',NULL,NULL,50,'Processing',1,'2021-12-16',48),(18,3,'Seed','Farm 1 Purchase Request',NULL,NULL,50,'Processing',1,'2021-12-16',48),(19,1,'Pesticide','Pesticide Request',NULL,NULL,100,'Processing',1,'2021-12-16',48),(20,2,'Pesticide','Pesticide Request',100,'2021-12-16 00:00:00',100,'Purchased',1,'2021-12-16',48),(21,3,'Pesticide','Pesticide Request',NULL,NULL,100,'Processing',1,'2021-12-16',48),(22,5,'Pesticide','Pesticide Request',100,'2021-12-16 00:00:00',100,'Purchased',1,'2021-12-16',48),(23,1,'Fertilizer','',50,'2021-12-16 00:00:00',100,'Purchased',1,'2021-12-16',48),(24,2,'Fertilizer','',NULL,NULL,100,'Processing',1,'2021-12-16',48),(25,7,'Fertilizer','',NULL,NULL,100,'Processing',1,'2021-12-16',48),(26,1,'Seed','',100,'2021-12-17 00:00:00',100,'Purchased',1,'2021-12-17',52),(27,2,'Seed','',100,'2021-12-17 00:00:00',100,'Purchased',1,'2021-12-17',52),(28,3,'Seed','',100,'2021-12-17 00:00:00',100,'Purchased',1,'2021-12-17',52),(29,1,'Pesticide','',5000,'2021-12-17 00:00:00',100,'Purchased',1,'2021-12-17',50),(30,2,'Pesticide','',5000,'2021-12-17 00:00:00',100,'Purchased',1,'2021-12-17',50);
/*!40000 ALTER TABLE `purchase_table` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_pest`
--

LOCK TABLES `season_pest` WRITE;
/*!40000 ALTER TABLE `season_pest` DISABLE KEYS */;
INSERT INTO `season_pest` VALUES (1,2,2),(2,3,2);
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
INSERT INTO `seasons` VALUES (1,'Hot','How season hot climate',45,150,35,70),(2,'Wet','Full of rain',150,280,26,63);
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons_disease`
--

DROP TABLE IF EXISTS `seasons_disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seasons_disease` (
  `seasons_disease_id` int NOT NULL AUTO_INCREMENT,
  `season_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`seasons_disease_id`),
  KEY `fk_seasons_has_disease_table_disease_table1_idx` (`disease_id`),
  KEY `fk_seasons_has_disease_table_seasons1_idx` (`season_id`),
  CONSTRAINT `fk_seasons_has_disease_table_disease_table1` FOREIGN KEY (`disease_id`) REFERENCES `disease_table` (`disease_id`),
  CONSTRAINT `fk_seasons_has_disease_table_seasons1` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons_disease`
--

LOCK TABLES `seasons_disease` WRITE;
/*!40000 ALTER TABLE `seasons_disease` DISABLE KEYS */;
INSERT INTO `seasons_disease` VALUES (1,2,2),(2,2,1);
/*!40000 ALTER TABLE `seasons_disease` ENABLE KEYS */;
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
  `units` varchar(45) NOT NULL DEFAULT 'grams',
  `amount` float NOT NULL,
  PRIMARY KEY (`seed_id`),
  UNIQUE KEY `seed_id_UNIQUE` (`seed_id`),
  UNIQUE KEY `seed_name_UNIQUE` (`seed_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seed_table`
--

LOCK TABLES `seed_table` WRITE;
/*!40000 ALTER TABLE `seed_table` DISABLE KEYS */;
INSERT INTO `seed_table` VALUES (1,'Dinarada','dinorado desc',60,NULL,'grams',3),(2,'168','168 desc',55,NULL,'grams',5),(3,'Seedling','New seedling desc',85,NULL,'grams',10);
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
INSERT INTO `sessions` VALUES ('-8OoXk4zQ77hLsrv5l8PbBRqBmRoX6EK',1640678551,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2021-12-28T08:02:31.293Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('jOavZ_SkoQJ-kCJa9mdMKdlLoQRRNuZm',1640680314,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2021-12-28T08:02:31.449Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('niZgwWELa86J6ydiq8cn86mWy4_4Rolo',1640678551,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2021-12-28T08:02:31.310Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_disease`
--

LOCK TABLES `solution_disease` WRITE;
/*!40000 ALTER TABLE `solution_disease` DISABLE KEYS */;
INSERT INTO `solution_disease` VALUES (1,1,1),(2,1,2),(3,2,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_pest`
--

LOCK TABLES `solution_pest` WRITE;
/*!40000 ALTER TABLE `solution_pest` DISABLE KEYS */;
INSERT INTO `solution_pest` VALUES (1,1,2),(2,1,1),(3,2,1);
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
  `solution_desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`solution_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_table`
--

LOCK TABLES `solution_table` WRITE;
/*!40000 ALTER TABLE `solution_table` DISABLE KEYS */;
INSERT INTO `solution_table` VALUES (1,'Remove weeds','Remove all weeds from the field'),(2,'Burn the field','Burn all of the plants and palay'),(3,'Flood the field','Flood the field with 3cm of water');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages`
--

LOCK TABLES `stages` WRITE;
/*!40000 ALTER TABLE `stages` DISABLE KEYS */;
INSERT INTO `stages` VALUES (1,'Vegetation','Vegetation period',80),(2,'Reproductive','Reproductive period',35),(3,'Ripening','Ripening period',30);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages_disease`
--

LOCK TABLES `stages_disease` WRITE;
/*!40000 ALTER TABLE `stages_disease` DISABLE KEYS */;
INSERT INTO `stages_disease` VALUES (1,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages_pest`
--

LOCK TABLES `stages_pest` WRITE;
/*!40000 ALTER TABLE `stages_pest` DISABLE KEYS */;
INSERT INTO `stages_pest` VALUES (1,1,3),(2,1,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_disease`
--

LOCK TABLES `symptoms_disease` WRITE;
/*!40000 ALTER TABLE `symptoms_disease` DISABLE KEYS */;
INSERT INTO `symptoms_disease` VALUES (1,1,1),(2,1,2),(3,2,3),(6,2,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_pest`
--

LOCK TABLES `symptoms_pest` WRITE;
/*!40000 ALTER TABLE `symptoms_pest` DISABLE KEYS */;
INSERT INTO `symptoms_pest` VALUES (1,3,1),(2,4,2),(3,8,2),(4,6,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_table`
--

LOCK TABLES `symptoms_table` WRITE;
/*!40000 ALTER TABLE `symptoms_table` DISABLE KEYS */;
INSERT INTO `symptoms_table` VALUES (1,'Dry leaf','Leaves are dry and yellowish'),(2,'Weak Stem','stem is soft and bending.'),(3,'Burrows','Burrows are visible in weedy areas.'),(4,'Grassy Weeds','The presence of grassy weeds in and near rice fields as alternate hosts harbor and encourage the pest to develop.'),(5,'whitish leaves','Whitish and membranous leaves'),(6,'Leaf cases on water','Leafe cases are floatingon water'),(7,'Skeletonized tissues','Skeletonized leaf tissues usually appear ladder-like'),(8,'Highly fertilized','Heavily fertilized field also encourages the damage.');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_disease`
--

LOCK TABLES `weather_disease` WRITE;
/*!40000 ALTER TABLE `weather_disease` DISABLE KEYS */;
INSERT INTO `weather_disease` VALUES (1,2,1),(2,1,2),(3,1,1);
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
  `time` varchar(10) NOT NULL,
  `weather_id` int NOT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `humidity` float NOT NULL,
  `max_temp` float NOT NULL,
  `min_temp` float NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `pressure` float NOT NULL,
  `rainfall` float NOT NULL,
  `time_uploaded` int NOT NULL,
  PRIMARY KEY (`forecast_id`),
  UNIQUE KEY `forecast_id_UNIQUE` (`forecast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8958 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_forecast_table`
--

LOCK TABLES `weather_forecast_table` WRITE;
/*!40000 ALTER TABLE `weather_forecast_table` DISABLE KEYS */;
INSERT INTO `weather_forecast_table` VALUES (8837,'2021-12-27','11:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8838,'2021-12-27','2:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8839,'2021-12-28','11:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8840,'2021-12-28','2:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8841,'2021-12-28','5:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8842,'2021-12-28','8:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8843,'2021-12-28','2:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8844,'2021-12-28','5:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8845,'2021-12-28','8:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8846,'2021-12-28','11:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8847,'2021-12-29','11:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8848,'2021-12-29','2:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8849,'2021-12-29','5:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8850,'2021-12-29','8:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8851,'2021-12-29','2:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8852,'2021-12-29','5:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8853,'2021-12-29','8:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8854,'2021-12-29','11:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8855,'2021-12-30','11:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8856,'2021-12-30','2:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8857,'2021-12-30','5:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8858,'2021-12-30','8:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8859,'2021-12-30','2:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8860,'2021-12-30','5:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8861,'2021-12-30','8:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8862,'2021-12-30','11:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8863,'2021-12-31','11:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8864,'2021-12-31','2:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8865,'2021-12-31','5:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8866,'2021-12-31','8:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8867,'2021-12-31','2:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8868,'2021-12-31','5:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8869,'2021-12-31','8:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8870,'2021-12-31','11:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8871,'2022-01-01','11:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8872,'2022-01-01','2:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8873,'2022-01-01','5:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8874,'2022-01-01','8:00AM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8875,'2022-01-01','2:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8876,'2022-01-01','5:00PM',500,'light rain',56,22.03,22.03,'Rain',1004,0,10),(8877,'2022-01-01','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8878,'2022-01-01','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8879,'2022-01-02','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8880,'2022-01-02','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8881,'2022-01-02','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8882,'2022-01-02','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8883,'2022-01-02','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8884,'2022-01-02','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8885,'2022-01-02','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8886,'2022-01-02','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8887,'2022-01-03','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8888,'2022-01-03','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8889,'2022-01-03','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8890,'2022-01-03','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8891,'2022-01-03','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8892,'2022-01-03','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8893,'2022-01-03','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8894,'2022-01-03','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8895,'2022-01-04','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8896,'2022-01-04','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8897,'2022-01-04','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8898,'2022-01-04','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8899,'2022-01-04','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8900,'2022-01-04','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8901,'2022-01-04','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8902,'2022-01-04','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8903,'2022-01-05','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8904,'2022-01-05','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8905,'2022-01-05','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8906,'2022-01-05','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8907,'2022-01-05','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8908,'2022-01-05','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8909,'2022-01-05','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8910,'2022-01-05','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8911,'2022-01-06','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8912,'2022-01-06','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8913,'2022-01-06','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8914,'2022-01-06','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8915,'2022-01-06','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8916,'2022-01-06','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8917,'2022-01-06','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8918,'2022-01-06','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8919,'2022-01-07','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8920,'2022-01-07','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8921,'2022-01-07','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8922,'2022-01-07','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8923,'2022-01-07','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8924,'2022-01-07','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8925,'2022-01-07','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8926,'2022-01-07','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8927,'2022-01-08','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8928,'2022-01-08','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8929,'2022-01-08','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8930,'2022-01-08','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8931,'2022-01-08','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8932,'2022-01-08','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8933,'2022-01-08','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8934,'2022-01-08','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8935,'2022-01-09','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8936,'2022-01-09','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8937,'2022-01-09','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8938,'2022-01-09','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8939,'2022-01-09','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8940,'2022-01-09','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8941,'2022-01-09','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8942,'2022-01-09','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8943,'2022-01-10','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8944,'2022-01-10','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8945,'2022-01-10','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8946,'2022-01-10','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8947,'2022-01-10','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8948,'2022-01-10','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8949,'2022-01-10','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8950,'2022-01-10','11:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8951,'2022-01-11','11:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8952,'2022-01-11','2:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8953,'2022-01-11','5:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8954,'2022-01-11','8:00AM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8955,'2022-01-11','2:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8956,'2022-01-11','5:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10),(8957,'2022-01-11','8:00PM',501,'moderate rain',56,22.05,22.06,'Rain',1004,0.01,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_pest`
--

LOCK TABLES `weather_pest` WRITE;
/*!40000 ALTER TABLE `weather_pest` DISABLE KEYS */;
INSERT INTO `weather_pest` VALUES (1,1,1),(2,2,3),(3,2,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_table`
--

LOCK TABLES `weather_table` WRITE;
/*!40000 ALTER TABLE `weather_table` DISABLE KEYS */;
INSERT INTO `weather_table` VALUES (1,'Hot','Hot and humid',29,39,NULL,NULL,75),(2,'Wet','Rainy and wet',23,31,30,NULL,80),(3,'Cloudy','Full of clouds',25,31,NULL,20,70);
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
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wo_resources_table`
--

LOCK TABLES `wo_resources_table` WRITE;
/*!40000 ALTER TABLE `wo_resources_table` DISABLE KEYS */;
INSERT INTO `wo_resources_table` VALUES (67,73,'Fertilizer',NULL,4.45,7),(68,74,'Fertilizer',NULL,0.43,1),(69,75,'Fertilizer',NULL,0.76,1),(70,76,'Fertilizer',NULL,0.76,1),(71,77,'Fertilizer',NULL,4.45,7),(72,78,'Fertilizer',NULL,1.3,1),(73,79,'Fertilizer',NULL,0.33,1),(75,83,'Fertilizer',NULL,18.92,2),(76,84,'Fertilizer',NULL,2.85,7),(77,85,'Fertilizer',NULL,0.43,1),(78,86,'Fertilizer',NULL,0.76,1),(79,87,'Fertilizer',NULL,0.98,1),(80,88,'Fertilizer',NULL,2.85,7),(81,89,'Fertilizer',NULL,1.3,1),(82,90,'Fertilizer',NULL,0.33,1),(84,94,'Fertilizer',NULL,41.24,2),(85,95,'Fertilizer',NULL,6.21,7),(86,96,'Fertilizer',NULL,0.43,1),(87,97,'Fertilizer',NULL,0.76,1),(88,98,'Fertilizer',NULL,0.98,1),(89,99,'Fertilizer',NULL,6.21,7),(90,100,'Fertilizer',NULL,1.3,1),(91,101,'Fertilizer',NULL,0.33,1),(93,105,'Fertilizer',NULL,46.26,2),(94,106,'Fertilizer',NULL,6.96,7),(95,107,'Fertilizer',NULL,0.43,1),(96,108,'Fertilizer',NULL,0.76,1),(97,109,'Fertilizer',NULL,0.76,1),(98,110,'Fertilizer',NULL,6.96,7),(99,111,'Fertilizer',NULL,1.3,1),(100,112,'Fertilizer',NULL,0.33,1),(101,92,'Seed',NULL,29.52,1),(102,81,'Seed',NULL,4.06,3),(103,103,'Seed',NULL,19.87,2),(104,70,'Seed',NULL,21.16,1),(106,113,'Pesticide',NULL,5,5),(107,72,'Fertilizer',NULL,29.56,2),(108,115,'Seed',NULL,12.09,1),(109,117,'Fertilizer',NULL,29.56,2),(110,118,'Fertilizer',NULL,4.45,7),(111,119,'Fertilizer',NULL,0.43,1),(112,120,'Fertilizer',NULL,0.76,1),(113,121,'Fertilizer',NULL,0.76,1),(114,122,'Fertilizer',NULL,4.45,7),(115,123,'Fertilizer',NULL,1.3,1),(116,124,'Fertilizer',NULL,0.33,1),(118,125,'Pesticide',NULL,10,1);
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
  `type` enum('Land Preparation','Sow Seed','Pesticide Application','Fertilizer Application','Harvest','Water Fields') NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_order_table`
--

LOCK TABLES `work_order_table` WRITE;
/*!40000 ALTER TABLE `work_order_table` DISABLE KEYS */;
INSERT INTO `work_order_table` VALUES (69,'Land Preparation',32,'2021-12-16','2021-09-30','Completed',NULL,'','2021-09-01','2021-09-30',NULL),(70,'Sow Seed',32,'2021-12-16','2021-10-15','Completed',NULL,'','2022-10-01','2021-10-15',NULL),(71,'Harvest',32,'2021-12-16','2022-02-20','Completed',NULL,'','2022-02-13','2021-12-16',NULL),(72,'Fertilizer Application',32,'2021-12-16','2022-01-13','Completed',NULL,'','2022-01-06','2021-12-16',NULL),(73,'Fertilizer Application',32,'2021-12-16','2022-01-13','Pending',NULL,'Basal Potassium Application (K)','2022-01-06',NULL,NULL),(74,'Fertilizer Application',32,'2021-12-16','2022-01-21','Pending',NULL,'Basal Nitrogen Application (N)','2022-01-14',NULL,NULL),(75,'Fertilizer Application',32,'2021-12-16','2022-02-04','Pending',NULL,'Tillering Nitrogen Application (N)','2022-01-28',NULL,NULL),(76,'Fertilizer Application',32,'2021-12-16','2022-02-10','Pending',NULL,'Midtillering Nitrogen Application (N)','2022-02-03',NULL,NULL),(77,'Fertilizer Application',32,'2021-12-16','2022-02-25','Pending',NULL,'Early Panicle Potassium Application (K)','2022-02-18',NULL,NULL),(78,'Fertilizer Application',32,'2021-12-16','2022-03-02','Pending',NULL,'Panicle Nitrogen Application (N)','2022-02-23',NULL,NULL),(79,'Fertilizer Application',32,'2021-12-16','2022-03-22','Pending',NULL,'Flowering Nitrogen Application (N)','2022-03-15',NULL,NULL),(80,'Land Preparation',33,'2021-12-16','2021-09-30','Completed',NULL,'','2021-09-01','2021-09-30',NULL),(81,'Sow Seed',33,'2021-12-16','2021-10-15','Completed',NULL,'','2022-10-01','2021-10-15',NULL),(82,'Harvest',33,'2021-12-16','2022-03-22','Completed',NULL,'Early Harvest','2022-03-15','2021-12-16',NULL),(83,'Fertilizer Application',33,'2021-12-16','2022-01-13','Pending',NULL,'Phosphorous Application (P)','2022-01-06',NULL,NULL),(84,'Fertilizer Application',33,'2021-12-16','2022-01-13','Pending',NULL,'Basal Potassium Application (K)','2022-01-06',NULL,NULL),(85,'Fertilizer Application',33,'2021-12-16','2022-01-21','Pending',NULL,'Basal Nitrogen Application (N)','2022-01-14',NULL,NULL),(86,'Fertilizer Application',33,'2021-12-16','2022-02-04','Pending',NULL,'Tillering Nitrogen Application (N)','2022-01-28',NULL,NULL),(87,'Fertilizer Application',33,'2021-12-16','2022-02-10','Pending',NULL,'Midtillering Nitrogen Application (N)','2022-02-03',NULL,NULL),(88,'Fertilizer Application',33,'2021-12-16','2022-02-25','Pending',NULL,'Early Panicle Potassium Application (K)','2022-02-18',NULL,NULL),(89,'Fertilizer Application',33,'2021-12-16','2022-03-02','Pending',NULL,'Panicle Nitrogen Application (N)','2022-02-23',NULL,NULL),(90,'Fertilizer Application',33,'2021-12-16','2022-03-22','Pending',NULL,'Flowering Nitrogen Application (N)','2022-03-15',NULL,NULL),(91,'Land Preparation',34,'2021-12-16','2022-01-06','Completed',NULL,'','2021-12-16','2021-12-16',NULL),(92,'Sow Seed',34,'2021-12-16','2022-01-14','Completed',NULL,'','2022-01-07','2021-12-16',NULL),(93,'Harvest',34,'2021-12-16','2022-02-20','Completed',NULL,'Generated Harvest Work Order - Early Harvest','2022-02-13','2021-12-17',NULL),(94,'Fertilizer Application',34,'2021-12-16','2022-01-13','Pending',NULL,'Phosphorous Application (P)','2022-01-06',NULL,NULL),(95,'Fertilizer Application',34,'2021-12-16','2022-01-13','Pending',NULL,'Basal Potassium Application (K)','2022-01-06',NULL,NULL),(96,'Fertilizer Application',34,'2021-12-16','2022-01-21','Pending',NULL,'Basal Nitrogen Application (N)','2022-01-14',NULL,NULL),(97,'Fertilizer Application',34,'2021-12-16','2022-02-04','Pending',NULL,'Tillering Nitrogen Application (N)','2022-01-28',NULL,NULL),(98,'Fertilizer Application',34,'2021-12-16','2022-02-10','Pending',NULL,'Midtillering Nitrogen Application (N)','2022-02-03',NULL,NULL),(99,'Fertilizer Application',34,'2021-12-16','2022-02-25','Pending',NULL,'Early Panicle Potassium Application (K)','2022-02-18',NULL,NULL),(100,'Fertilizer Application',34,'2021-12-16','2022-03-02','Pending',NULL,'Panicle Nitrogen Application (N)','2022-02-23',NULL,NULL),(101,'Fertilizer Application',34,'2021-12-16','2022-03-22','Pending',NULL,'Flowering Nitrogen Application (N)','2022-03-15',NULL,NULL),(102,'Land Preparation',35,'2021-12-16','2021-08-16','Completed',NULL,'','2021-07-16','2021-08-16',NULL),(103,'Sow Seed',35,'2021-12-16','2021-08-24','Completed',NULL,'','2021-08-17','2021-08-16',NULL),(104,'Harvest',35,'2021-12-16','2022-02-10','Completed',NULL,'Generated Harvest Work Order','2022-02-03','2021-12-27',NULL),(105,'Fertilizer Application',35,'2021-12-16','2022-01-15','Pending',NULL,'Phosphorous Application (P)','2022-01-08',NULL,NULL),(106,'Fertilizer Application',35,'2021-12-16','2022-01-13','Pending',NULL,'Basal Potassium Application (K)','2022-01-06',NULL,NULL),(107,'Fertilizer Application',35,'2021-12-16','2022-01-21','Pending',NULL,'Basal Nitrogen Application (N)','2022-01-14',NULL,NULL),(108,'Fertilizer Application',35,'2021-12-16','2022-02-04','Pending',NULL,'Tillering Nitrogen Application (N)','2022-01-28',NULL,NULL),(109,'Fertilizer Application',35,'2021-12-16','2022-02-10','Pending',NULL,'Midtillering Nitrogen Application (N)','2022-02-03',NULL,NULL),(110,'Fertilizer Application',35,'2021-12-16','2022-02-25','Pending',NULL,'Early Panicle Potassium Application (K)','2022-02-18',NULL,NULL),(111,'Fertilizer Application',35,'2021-12-16','2022-03-02','Pending',NULL,'Panicle Nitrogen Application (N)','2022-02-23',NULL,NULL),(112,'Fertilizer Application',35,'2021-12-16','2022-03-22','Pending',NULL,'Flowering Nitrogen Application (N)','2022-03-15',NULL,NULL),(113,'Pesticide Application',32,'2021-12-16','2021-12-23','Completed',NULL,'','2021-12-16','2021-12-16','Reproductive'),(114,'Land Preparation',36,'2021-12-16','2022-01-22','Pending',NULL,'Generated Land Preparation Work Order','2022-01-01',NULL,NULL),(115,'Sow Seed',36,'2021-12-16','2022-01-30','Pending',NULL,'Generated Sow Seed Work Order','2022-01-23',NULL,NULL),(116,'Harvest',36,'2021-12-16','2022-02-06','Pending',NULL,'Generated Harvest Work Order','2022-01-30',NULL,NULL),(117,'Fertilizer Application',36,'2021-12-16','2022-01-29','Pending',NULL,'Phosphorous Application (P)','2022-01-22',NULL,NULL),(118,'Fertilizer Application',36,'2021-12-16','2022-01-29','Pending',NULL,'Basal Potassium Application (K)','2022-01-22',NULL,NULL),(119,'Fertilizer Application',36,'2021-12-16','2022-02-06','Pending',NULL,'Basal Nitrogen Application (N)','2022-01-30',NULL,NULL),(120,'Fertilizer Application',36,'2021-12-16','2022-02-20','Pending',NULL,'Tillering Nitrogen Application (N)','2022-02-13',NULL,NULL),(121,'Fertilizer Application',36,'2021-12-16','2022-02-26','Pending',NULL,'Midtillering Nitrogen Application (N)','2022-02-19',NULL,NULL),(122,'Fertilizer Application',36,'2021-12-16','2022-03-13','Pending',NULL,'Early Panicle Potassium Application (K)','2022-03-06',NULL,NULL),(123,'Fertilizer Application',36,'2021-12-16','2022-03-18','Pending',NULL,'Panicle Nitrogen Application (N)','2022-03-11',NULL,NULL),(124,'Fertilizer Application',36,'2021-12-16','2022-04-07','Pending',NULL,'Flowering Nitrogen Application (N)','2022-03-31',NULL,NULL),(125,'Pesticide Application',34,'2021-12-17','2021-12-25','Completed',NULL,'','2021-12-18','2021-12-17','Vegetation');
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

-- Dump completed on 2021-12-27 15:21:44
