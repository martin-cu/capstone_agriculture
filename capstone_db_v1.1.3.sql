-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_agriculture_db
-- ------------------------------------------------------
-- Server version	8.0.19

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
  `planting_method` enum('Irrigation','Non-Irrigation') NOT NULL,
  `seed_planted` int NOT NULL,
  `status` enum('Active','Inactive','In-Progress','Completed') DEFAULT NULL,
  `seed_rate` int NOT NULL,
  `harvest_yield` int DEFAULT NULL,
  `crop_plan` varchar(45) NOT NULL,
  PRIMARY KEY (`calendar_id`),
  UNIQUE KEY `calendar_id_UNIQUE` (`calendar_id`),
  KEY `seed_to_calendar_idx` (`seed_planted`),
  KEY `farm_to_calendar_idx` (`farm_id`),
  CONSTRAINT `farm_to_calendar` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`),
  CONSTRAINT `seed_to_calendar` FOREIGN KEY (`seed_planted`) REFERENCES `seed_table` (`seed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_calendar_table`
--

LOCK TABLES `crop_calendar_table` WRITE;
/*!40000 ALTER TABLE `crop_calendar_table` DISABLE KEYS */;
INSERT INTO `crop_calendar_table` VALUES (1,30,'2021-10-24 00:00:00','2021-10-27 00:00:00',NULL,'Non-Irrigation',3,'In-Progress',99,NULL,'my planz'),(2,1,'2021-10-31 00:00:00','2021-11-06 00:00:00',NULL,'Irrigation',1,'In-Progress',50,NULL,'your plan1'),(4,1,'2020-10-24 00:00:00','2021-09-20 00:00:00',NULL,'Irrigation',3,'Completed',99,NULL,'done_plan'),(5,30,'2020-10-24 00:00:00','2021-09-20 00:00:00',NULL,'Irrigation',3,'Completed',99,NULL,'done_plan');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_table`
--

LOCK TABLES `employee_table` WRITE;
/*!40000 ALTER TABLE `employee_table` DISABLE KEYS */;
INSERT INTO `employee_table` VALUES (1,'Office Worker','last','first','9293150238'),(3,'Office Worker','last','first','9293150233'),(4,'Farmer','Cu','Martin','9138457'),(5,'Farmer','Aquino','Y2','9169821'),(6,'Farm Manager','Anyayahan','Yen','13432874'),(7,'Farm Manager','Madrazo','Wilford','1345672874'),(8,'Farmer','Magpantay','Lissa','98231'),(9,'Farmer','Macana','Darren','111110'),(10,'Farmer','Lu','Lia','111111'),(11,'Farmer','See','Rich','111112'),(12,'Farmer','Espalto','Mike','111113');
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_assignment`
--

LOCK TABLES `farm_assignment` WRITE;
/*!40000 ALTER TABLE `farm_assignment` DISABLE KEYS */;
INSERT INTO `farm_assignment` VALUES (1,3,1,'Active'),(2,6,1,'Active'),(3,8,1,'Active'),(4,4,2,'Active'),(5,7,2,'Active'),(6,8,2,'Active'),(27,6,30,'Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_materials`
--

LOCK TABLES `farm_materials` WRITE;
/*!40000 ALTER TABLE `farm_materials` DISABLE KEYS */;
INSERT INTO `farm_materials` VALUES (1,1,1,'Seed',500,1),(2,1,2,'Seed',220,1),(3,1,3,'Fertilizer',390,1),(4,1,1,'Pesticide',200,1),(7,30,1,'Fertilizer',100,1),(8,30,2,'Fertilizer',200,1),(9,30,4,'Fertilizer',300,1),(10,30,5,'Fertilizer',500,1),(11,30,6,'Fertilizer',600,1),(12,30,1,'Seed',50,1),(13,30,2,'Seed',80,1),(14,1,2,'Pesticide',20,1),(15,1,5,'Pesticide',175,1),(16,30,1,'Pesticide',20,1),(17,30,2,'Pesticide',45,1),(18,30,3,'Pesticide',98,1),(19,30,5,'Pesticide',103,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_table`
--

LOCK TABLES `farm_table` WRITE;
/*!40000 ALTER TABLE `farm_table` DISABLE KEYS */;
INSERT INTO `farm_table` VALUES (1,'farm1','desc',100,'Lowland','Active'),(2,'farm2','desc',200,'Upland','Active'),(30,'LA Farm (API Paid)','Yawa',30,'Lowland','Active'),(35,'sdadas','',0,'Lowland','Active'),(36,'moa','',0,'Lowland','Active'),(37,'moaaa','',0,'Lowland','Active'),(39,'yehey','',0,'Lowland','Active'),(40,'a','',0,'Lowland','Active');
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
  PRIMARY KEY (`fertilizer_id`),
  UNIQUE KEY `fertilizier_id_UNIQUE` (`fertilizer_id`),
  UNIQUE KEY `fertilizer_name_UNIQUE` (`fertilizer_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizer_table`
--

LOCK TABLES `fertilizer_table` WRITE;
/*!40000 ALTER TABLE `fertilizer_table` DISABLE KEYS */;
INSERT INTO `fertilizer_table` VALUES (1,'APN','Ammonium Phosphate Nitrate',30,10,0,100),(2,'APS','Ammonium Phosphate Sulfate',16,20,0,55),(3,'APP','Ammonium Polyphosp',10,34,0,120),(4,'AN','Ammonium Nitrate',33,0,0,145),(5,'MOP','Potassium Chloride',10,34,0,200),(6,'NK','Potassium Nitrate',13,0,44,250);
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
INSERT INTO `sessions` VALUES ('ABBE2FsK5hZ29cGgS8t-M6wsrsLJ-P9x',1637668445,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2021-11-23T11:15:12.663Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('YhovtF-t8w9vuJ1ZcMMvOekoZdx3laLL',1637612710,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2021-11-21T19:11:01.686Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('dw4OLoDN-IpHYc_VlYD_-JloeFCzftt8',1637503055,'{\"cookie\":{\"originalMaxAge\":108000000,\"expires\":\"2021-11-20T12:54:11.531Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
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
  PRIMARY KEY (`soil_quality_id`),
  UNIQUE KEY `soil_quality_id_UNIQUE` (`soil_quality_id`),
  KEY `sq_id_idx` (`farm_id`),
  CONSTRAINT `sq_id` FOREIGN KEY (`farm_id`) REFERENCES `farm_table` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soil_quality_table`
--

LOCK TABLES `soil_quality_table` WRITE;
/*!40000 ALTER TABLE `soil_quality_table` DISABLE KEYS */;
INSERT INTO `soil_quality_table` VALUES (1,1,6.5,0,0,0,'2021-11-04'),(2,30,7.5,4,8.75,3.75,'2021-11-05');
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
) ENGINE=InnoDB AUTO_INCREMENT=4965 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_forecast_table`
--

LOCK TABLES `weather_forecast_table` WRITE;
/*!40000 ALTER TABLE `weather_forecast_table` DISABLE KEYS */;
INSERT INTO `weather_forecast_table` VALUES (4844,'2021-11-17','2:00PM',800,'clear sky',90,25.35,24.81,'Clear',1012,0,23),(4845,'2021-11-17','5:00PM',800,'clear sky',87,24.67,24.67,'Clear',1009,0,23),(4846,'2021-11-18','2:00AM',800,'clear sky',89,25.01,25.01,'Clear',1008,0,23),(4847,'2021-11-18','5:00AM',800,'clear sky',93,24.85,24.85,'Clear',1010,0,23),(4848,'2021-11-18','8:00AM',800,'clear sky',90,24.78,24.78,'Clear',1011,0,23),(4849,'2021-11-18','11:00AM',804,'overcast clouds',89,24.97,24.66,'Clouds',1011,0,23),(4850,'2021-11-18','2:00PM',800,'clear sky',87,24.81,24.81,'Clear',1009,0,23),(4851,'2021-11-18','5:00PM',800,'clear sky',89,24.9,24.9,'Clear',1009,0,23),(4852,'2021-11-18','8:00PM',800,'clear sky',93,24.62,24.62,'Clear',1010,0,23),(4853,'2021-11-18','11:00PM',800,'clear sky',89,24.73,24.73,'Clear',1011,0,23),(4854,'2021-11-19','2:00AM',804,'overcast clouds',80,27.2,27.2,'Clouds',1012,0,23),(4855,'2021-11-19','5:00AM',804,'overcast clouds',81,27.34,27.34,'Clouds',1011,0,23),(4856,'2021-11-19','8:00AM',800,'clear sky',83,27.15,27.15,'Clear',1011,0,23),(4857,'2021-11-19','11:00AM',800,'clear sky',88,26.5,26.5,'Clear',1012,0,23),(4858,'2021-11-19','2:00PM',800,'clear sky',83,27.23,27.23,'Clear',1013,0,23),(4859,'2021-11-19','5:00PM',800,'clear sky',65,30.15,30.15,'Clear',1011,0,23),(4860,'2021-11-19','8:00PM',800,'clear sky',78,28.81,28.81,'Clear',1011,0,23),(4861,'2021-11-19','11:00PM',800,'clear sky',82,28.04,28.04,'Clear',1011,0,23),(4862,'2021-11-20','2:00AM',800,'clear sky',74,29.51,29.51,'Clear',1011,0,23),(4863,'2021-11-20','5:00AM',800,'clear sky',76,29.43,29.43,'Clear',1012,0,23),(4864,'2021-11-20','8:00AM',804,'overcast clouds',61,30.59,30.59,'Clouds',1008,0,23),(4865,'2021-11-20','11:00AM',800,'clear sky',76,28.78,28.78,'Clear',1008,0,23),(4866,'2021-11-20','2:00PM',800,'clear sky',88,27.21,27.21,'Clear',1008,0,23),(4867,'2021-11-20','5:00PM',800,'clear sky',76,29.11,29.11,'Clear',1009,0,23),(4868,'2021-11-20','8:00PM',800,'clear sky',80,28.81,28.81,'Clear',1010,0,23),(4869,'2021-11-20','11:00PM',800,'clear sky',82,27.44,27.44,'Clear',1008,0,23),(4870,'2021-11-21','2:00AM',800,'clear sky',89,26.1,26.1,'Clear',1009,0,23),(4871,'2021-11-21','5:00AM',800,'clear sky',90,26.32,26.32,'Clear',1009,0,23),(4872,'2021-11-21','8:00AM',800,'clear sky',82,27.4,27.4,'Clear',1010,0,23),(4873,'2021-11-21','11:00AM',800,'clear sky',88,26.91,26.91,'Clear',1011,0,23),(4874,'2021-11-21','2:00PM',800,'clear sky',89,25.59,25.59,'Clear',1010,0,23),(4875,'2021-11-21','5:00PM',800,'clear sky',87,25.5,25.5,'Clear',1010,0,23),(4876,'2021-11-21','8:00PM',800,'clear sky',92,26.16,26.16,'Clear',1011,0,23),(4877,'2021-11-21','11:00PM',800,'clear sky',88,25.71,25.71,'Clear',1012,0,23),(4878,'2021-11-22','2:00AM',800,'clear sky',91,25.45,25.45,'Clear',1013,0,23),(4879,'2021-11-22','5:00AM',800,'clear sky',89,25.09,25.09,'Clear',1010,0,23),(4880,'2021-11-22','8:00AM',800,'clear sky',89,25.37,25.37,'Clear',1010,0,23),(4881,'2021-11-22','11:00AM',800,'clear sky',92,25.63,25.63,'Clear',1011,0,23),(4882,'2021-11-22','2:00PM',800,'clear sky',89,25.07,25.07,'Clear',1012,0,23),(4883,'2021-11-22','5:00PM',800,'clear sky',91,25.14,25.14,'Clear',1013,0,23),(4884,'2021-11-22','8:00PM',804,'overcast clouds',92,26.04,26.04,'Clouds',1010,0,23),(4885,'2021-11-22','11:00PM',803,'broken clouds',92,25.92,25.92,'Clouds',1010,0,23),(4886,'2021-11-23','2:00AM',803,'broken clouds',92,25.92,25.92,'Clouds',1010,0,23),(4887,'2021-11-23','5:00AM',803,'broken clouds',92,25.9,25.9,'Clouds',1010,0,23),(4888,'2021-11-23','8:00AM',803,'broken clouds',92,25.87,25.87,'Clouds',1010,0,23),(4889,'2021-11-23','11:00AM',803,'broken clouds',92,25.83,25.83,'Clouds',1010,0,23),(4890,'2021-11-23','2:00PM',802,'scattered clouds',92,25.81,25.81,'Clouds',1010,0,23),(4891,'2021-11-23','5:00PM',802,'scattered clouds',92,25.79,25.79,'Clouds',1010,0,23),(4892,'2021-11-23','8:00PM',802,'scattered clouds',92,25.78,25.78,'Clouds',1010,0,23),(4893,'2021-11-23','11:00PM',802,'scattered clouds',92,25.77,25.77,'Clouds',1010,0,23),(4894,'2021-11-24','2:00AM',802,'scattered clouds',92,25.76,25.76,'Clouds',1010,0,23),(4895,'2021-11-24','5:00AM',802,'scattered clouds',92,25.76,25.76,'Clouds',1010,0,23),(4896,'2021-11-24','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4897,'2021-11-24','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4898,'2021-11-24','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4899,'2021-11-24','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4900,'2021-11-24','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4901,'2021-11-24','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4902,'2021-11-25','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4903,'2021-11-25','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4904,'2021-11-25','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4905,'2021-11-25','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4906,'2021-11-25','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4907,'2021-11-25','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4908,'2021-11-25','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4909,'2021-11-25','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4910,'2021-11-26','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4911,'2021-11-26','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4912,'2021-11-26','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4913,'2021-11-26','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4914,'2021-11-26','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4915,'2021-11-26','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4916,'2021-11-26','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4917,'2021-11-26','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4918,'2021-11-27','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4919,'2021-11-27','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4920,'2021-11-27','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4921,'2021-11-27','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4922,'2021-11-27','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4923,'2021-11-27','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4924,'2021-11-27','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4925,'2021-11-27','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4926,'2021-11-28','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4927,'2021-11-28','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4928,'2021-11-28','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4929,'2021-11-28','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4930,'2021-11-28','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4931,'2021-11-28','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4932,'2021-11-28','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4933,'2021-11-28','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4934,'2021-11-29','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4935,'2021-11-29','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4936,'2021-11-29','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4937,'2021-11-29','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4938,'2021-11-29','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4939,'2021-11-29','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4940,'2021-11-29','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4941,'2021-11-29','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4942,'2021-11-30','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4943,'2021-11-30','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4944,'2021-11-30','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4945,'2021-11-30','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4946,'2021-11-30','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4947,'2021-11-30','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4948,'2021-11-30','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4949,'2021-11-30','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4950,'2021-12-01','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4951,'2021-12-01','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4952,'2021-12-01','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4953,'2021-12-01','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4954,'2021-12-01','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4955,'2021-12-01','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4956,'2021-12-01','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4957,'2021-12-01','11:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4958,'2021-12-02','2:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4959,'2021-12-02','5:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4960,'2021-12-02','8:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4961,'2021-12-02','11:00AM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4962,'2021-12-02','2:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4963,'2021-12-02','5:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23),(4964,'2021-12-02','8:00PM',802,'scattered clouds',92,25.75,25.75,'Clouds',1010,0,23);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wo_resources_table`
--

LOCK TABLES `wo_resources_table` WRITE;
/*!40000 ALTER TABLE `wo_resources_table` DISABLE KEYS */;
INSERT INTO `wo_resources_table` VALUES (1,3,'Seed',NULL,30,3),(2,4,'Fertilizer',NULL,2,6),(3,5,'Fertilizer',NULL,1,1),(4,6,'Fertilizer',NULL,3,6),(14,26,'Pesticide',NULL,11,1),(15,26,'Pesticide',NULL,3,5),(16,26,'Pesticide',NULL,2,2),(17,27,'Pesticide',NULL,100,1),(18,27,'Pesticide',NULL,0,3),(19,27,'Pesticide',NULL,50,5),(20,28,'Pesticide',NULL,3,1),(21,28,'Pesticide',NULL,5,2),(22,28,'Pesticide',NULL,6,3),(23,28,'Pesticide',NULL,5,5);
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
  `notes` varchar(45) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  PRIMARY KEY (`work_order_id`),
  UNIQUE KEY `work_order_id_UNIQUE` (`work_order_id`),
  KEY `work_order_fk_idx` (`crop_calendar_id`),
  CONSTRAINT `work_order_fk` FOREIGN KEY (`crop_calendar_id`) REFERENCES `crop_calendar_table` (`calendar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_order_table`
--

LOCK TABLES `work_order_table` WRITE;
/*!40000 ALTER TABLE `work_order_table` DISABLE KEYS */;
INSERT INTO `work_order_table` VALUES (1,'Land Preparation',2,'2021-11-07','2021-11-15','Completed',NULL,NULL,'2021-11-07'),(2,'Sow Seed',2,'2021-11-15','2021-11-18','Pending',NULL,NULL,'2021-11-16'),(3,'Sow Seed',1,'2021-11-19','2021-11-19','Completed',NULL,NULL,'2021-11-19'),(4,'Fertilizer Application',1,'2021-11-19','2021-11-19','Completed',NULL,NULL,'2021-11-19'),(5,'Fertilizer Application',1,'2021-11-19','2021-11-19','Completed',NULL,NULL,'2021-11-19'),(6,'Fertilizer Application',1,'2021-11-19','2021-11-19','Completed',NULL,NULL,'2021-11-19'),(26,'Pesticide Application',1,'2021-11-21','2021-11-21','Pending',NULL,'','2021-11-21'),(27,'Pesticide Application',2,'2021-11-21','2021-11-21','Pending',NULL,'','2021-11-23'),(28,'Pesticide Application',1,'2021-11-21','2021-11-13','Pending',NULL,'','2021-12-03');
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

-- Dump completed on 2021-11-22 13:55:21
