CREATE DATABASE  IF NOT EXISTS `swusdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `swusdb`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: swusdb
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `todo_group`
--

DROP TABLE IF EXISTS `todo_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_group` (
  `round` int NOT NULL,
  `team_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `study_at` date DEFAULT NULL,
  PRIMARY KEY (`round`,`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_group`
--

LOCK TABLES `todo_group` WRITE;
/*!40000 ALTER TABLE `todo_group` DISABLE KEYS */;
INSERT INTO `todo_group` VALUES (1,1,'1챕터. 생성자 대신 정적 팩터리 메서드를 고려하라','2023-02-16'),(1,2,'해커스 토익 모의고사 1회차 문제 풀이',NULL),(1,3,'첫번째 시간',NULL),(1,4,'2022 12월 모의고사','2023-02-17'),(1,7,'모여서 각자 공부하기 1주','2023-02-17'),(2,1,'2챕터. 생성자에 매개변수가 많다면 빌더를 고려하라','2023-02-16'),(2,3,'두번째 시간',NULL),(2,4,'2022 9월 모의고사',NULL),(2,7,'모여서 각자 공부하기 2주',NULL),(3,1,'3챕터. private 생성자나 열거 타입으로 싱글턴임을 보증하라','2023-02-16'),(3,4,'2022 6월 모의고사',NULL),(3,7,'모여서 각자 공부하기 3주',NULL),(4,1,'4챕터. 인스턴스화를 막으려거든 private 생성자를 사용하라','2023-02-16'),(4,4,'2022 4월 모의고사',NULL),(5,1,'5챕터. 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라',NULL),(5,4,'2022 3월 모의고사',NULL);
/*!40000 ALTER TABLE `todo_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:03:38
