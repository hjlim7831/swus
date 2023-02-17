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
-- Table structure for table `todo_private`
--

DROP TABLE IF EXISTS `todo_private`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_private` (
  `num` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `todo_done` varchar(255) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`num`),
  KEY `FKj9ik285qb43fkhgn8kswnuucd` (`member_id`),
  CONSTRAINT `FKj9ik285qb43fkhgn8kswnuucd` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_private`
--

LOCK TABLES `todo_private` WRITE;
/*!40000 ALTER TABLE `todo_private` DISABLE KEYS */;
INSERT INTO `todo_private` VALUES (7,'자소서 쓰기','N',5),(8,'수능 voca 50단어 외우기','N',6),(17,'스트립트 작성하기','N',4),(18,'기하와 벡터 level 3 오답 수정','Y',6),(21,'자바의 정석 1쳅터 완독','N',1),(26,'이력서 작성하기','N',16),(27,'선형대수 HW2 - 2문제 마무리하기','N',2),(28,'토익 영단어 50개 암기하기','N',16),(31,'토익 리스닝 오답노트 하기','N',16),(76,'ㅁㄴㅇㅁㄴㅇㅁㄴ','N',74),(79,'등록!!','N',1),(92,'수학 한문제 풀기','N',2),(108,'영어 단어 외우기','N',3),(109,'영어 문장 쉐도잉 하기','N',3),(111,'영어 회화 1강 수강하기','N',3),(195,'이펙티브 자바 스터디하기','N',6);
/*!40000 ALTER TABLE `todo_private` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:03:18
