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
  `cycle_id` int NOT NULL,
  `land_prep_date` datetime DEFAULT NULL,
  `sowing_date` datetime DEFAULT NULL,
  `harvest_date` datetime DEFAULT NULL,
  `planting_method` enum('Irrigation','Non-Irrigation') NOT NULL,
  `seed_planted` int NOT NULL,
  `status` enum('Active','Inactive','In-Progress') DEFAULT NULL,
  PRIMARY KEY (`calendar_id`),
  UNIQUE KEY `calendar_id_UNIQUE` (`calendar_id`),
  KEY `seed_to_calendar_idx` (`seed_planted`),
  KEY `cycle_to_calendar_idx` (`cycle_id`),
  KEY `farm_to_calendar_idx` (`farm_id`),
  CONSTRAINT `cycle_to_calendar` FOREIGN KEY (`cycle_id`) REFERENCES `crop_cycle_table` (`cycle_id`),
  CONSTRAINT `farm_to_calendar` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`),
  CONSTRAINT `seed_to_calendar` FOREIGN KEY (`seed_planted`) REFERENCES `seed_table` (`seed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_calendar_table`
--

LOCK TABLES `crop_calendar_table` WRITE;
/*!40000 ALTER TABLE `crop_calendar_table` DISABLE KEYS */;
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
  `farm_id` int NOT NULL,
  `value` tinytext,
  `pd_id` int NOT NULL,
  PRIMARY KEY (`diagnosis_id`),
  KEY `diag_farm_idx` (`farm_id`),
  CONSTRAINT `diag_farm` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
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
  `assigned_farm` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `idemployee_table_UNIQUE` (`employee_id`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  KEY `employee_to_farm_idx` (`assigned_farm`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_table`
--

LOCK TABLES `employee_table` WRITE;
/*!40000 ALTER TABLE `employee_table` DISABLE KEYS */;
INSERT INTO `employee_table` VALUES (1,'Office Worker','last','first','9293150238',NULL),(3,'Office Worker','last','first','9293150233',NULL),(4,'Farmer','Cu','Martin','9138457',1),(5,'Farmer','Aquino','Y2','9169821',2),(6,'Farm Manager','Anyayahan','Yen','13432874',1),(7,'Farm Manager','Madrazo','Wilford','1345672874',2);
/*!40000 ALTER TABLE `employee_table` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_materials`
--

LOCK TABLES `farm_materials` WRITE;
/*!40000 ALTER TABLE `farm_materials` DISABLE KEYS */;
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
INSERT INTO `farm_plots` VALUES (1,1,0,1),(2,1,1,1),(3,1,0,0),(4,1,1,0),(5,2,0,1),(6,2,1,1),(7,2,0,0),(8,2,1,0);
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
  `farm_desc` tinytext,
  `farm_area` float DEFAULT NULL,
  `land_type` enum('Lowland','Upland') NOT NULL DEFAULT 'Lowland',
  `status` enum('Active','Inactive','In-Progress') DEFAULT 'Active',
  PRIMARY KEY (`farm_id`),
  UNIQUE KEY `farm_id_UNIQUE` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_table`
--

LOCK TABLES `farm_table` WRITE;
/*!40000 ALTER TABLE `farm_table` DISABLE KEYS */;
INSERT INTO `farm_table` VALUES (1,'farm1','desc',100,'Lowland','Active'),(2,'farm2','desc',200,'Upland','Active');
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
  CONSTRAINT `fk_fertilizer_table_has_disease_table_fertilizer_table1` FOREIGN KEY (`fertilizier_id`) REFERENCES `fertilizer_table` (`fertilizier_id`)
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
-- Table structure for table `fertilizer_pest`
--

DROP TABLE IF EXISTS `fertilizer_pest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_pest` (
  `fertilizer_pest_id` int NOT NULL AUTO_INCREMENT,
  `pest_id` int NOT NULL,
  `fertilizier_id` int NOT NULL,
  PRIMARY KEY (`fertilizer_pest_id`),
  KEY `fk_pest_table_has_fertilizer_table_fertilizer_table1_idx` (`fertilizier_id`),
  KEY `fk_pest_table_has_fertilizer_table_pest_table1_idx` (`pest_id`),
  CONSTRAINT `fk_pest_table_has_fertilizer_table_fertilizer_table1` FOREIGN KEY (`fertilizier_id`) REFERENCES `fertilizer_table` (`fertilizier_id`),
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
-- Table structure for table `fertilizer_table`
--

DROP TABLE IF EXISTS `fertilizer_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizer_table` (
  `fertilizier_id` int NOT NULL AUTO_INCREMENT,
  `fertilizer_name` varchar(20) NOT NULL,
  `fertilizer_desc` tinytext,
  PRIMARY KEY (`fertilizier_id`),
  UNIQUE KEY `fertilizier_id_UNIQUE` (`fertilizier_id`),
  UNIQUE KEY `fertilizer_name_UNIQUE` (`fertilizer_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_table`
--

LOCK TABLES `fertilizer_table` WRITE;
/*!40000 ALTER TABLE `fertilizer_table` DISABLE KEYS */;
INSERT INTO `fertilizer_table` VALUES (1,'Fertilizer1','for dinorado'),(2,'Fertilizer2','for 168'),(3,'Fertiii','New fertilizer desc');
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
  CONSTRAINT `fertilizer_to_input` FOREIGN KEY (`fertilizer_id`) REFERENCES `fertilizer_table` (`fertilizier_id`),
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
INSERT INTO `pesticide_table` VALUES (1,'Pesticide11','for bugs'),(2,'Pesticide2','for worms'),(3,'PestIdIde','New pesticide desc'),(5,'PestIdIde3','New pesticide desc');
/*!40000 ALTER TABLE `pesticide_table` ENABLE KEYS */;
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
  `units` varchar(45) NOT NULL DEFAULT 'Kg',
  `purchase_status` enum('Pending','Processing','Purchased','Cancelled') DEFAULT 'Pending',
  `requested_by` int DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  KEY `requested_by_idx` (`requested_by`),
  CONSTRAINT `requested_by` FOREIGN KEY (`requested_by`) REFERENCES `employee_table` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_table`
--

LOCK TABLES `purchase_table` WRITE;
/*!40000 ALTER TABLE `purchase_table` DISABLE KEYS */;
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
INSERT INTO `seed_table` VALUES (1,'Dinarada','dinorado desc',90,NULL),(2,'168','168 desc',120,NULL),(3,'Seedling','New seedling desc',20,NULL);
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
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-13 10:33:48
