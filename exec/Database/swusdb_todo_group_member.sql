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
-- Table structure for table `todo_group_member`
--

DROP TABLE IF EXISTS `todo_group_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_group_member` (
  `num` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `round` int NOT NULL,
  `todo_done` varchar(255) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`num`),
  KEY `FKl30p06jincj4tox0kp1ptob9n` (`member_id`),
  KEY `FK33l0hi28f1qdj6cfu8hib3isf` (`team_id`),
  CONSTRAINT `FK33l0hi28f1qdj6cfu8hib3isf` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `FKl30p06jincj4tox0kp1ptob9n` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_group_member`
--

LOCK TABLES `todo_group_member` WRITE;
/*!40000 ALTER TABLE `todo_group_member` DISABLE KEYS */;
INSERT INTO `todo_group_member` VALUES (46,'생성자가 뭔지 공부하기',1,'Y',5,1),(47,'1챕터 1회독',1,'Y',1,1),(48,'팩토리 메서드 이해하기',1,'N',2,1),(49,'정적 팩터리 메서드 공부하기',1,'Y',5,1),(50,'정적 팩터리 메서드 배우기',1,'Y',4,1),(51,'생성자 개념 학습',1,'Y',1,1),(52,'둘의 차이점 숙지하기',1,'N',5,1),(53,'생성자 복습하기',1,'Y',2,1),(54,'생성자와 다른 점 찾기',1,'Y',4,1),(55,'정적 팩터리의 개념 정리',1,'N',6,1),(56,'static의 메모리 저장 방식 학습',1,'N',1,1),(57,'예제 코드 이해하고 따라 치기',1,'Y',2,1),(58,'생성자 개념 정리',1,'Y',6,1),(59,'스터디 다음 진행내용 공지',1,'Y',1,1),(60,'정적 팩토리 메서드 정의 정리',1,'Y',3,1),(61,'정적 팩토리 메소드 패턴 학습하기',1,'Y',3,1),(62,'생성자와 비교 내역 작성',1,'N',3,1),(93,'2회차 투두리스트 등록',2,'Y',1,1),(94,'매개변수 많을 때 고민하기',2,'Y',4,1),(95,'달성된 내역입니다.',2,'Y',1,1),(96,'생성자에 대해 알아보기',2,'Y',4,1),(97,'생성자 매개변수 공부하기',2,'N',6,1),(98,'매개 변수 처리하기',2,'N',5,1),(99,'빌더와의 연관관계 공부하기',2,'Y',5,1),(100,'예시 코드 찾아보기',2,'Y',6,1),(101,'생성자 복습',2,'N',2,1),(102,'빌더 개념 알아보기',2,'N',3,1),(103,'빌더 패턴 공부하기',2,'Y',2,1),(116,'인스턴스화 배우기',4,'Y',4,1),(117,'4회차이빈다.',4,'N',1,1),(118,'private 생성자 개념 숙지',4,'Y',5,1),(119,'private 생성자 이론 공부하기',4,'N',6,1),(120,'체크 해볼꺼에요',4,'Y',1,1),(121,'인스턴스화 개념 잡기',4,'Y',2,1),(122,'인스턴스화 막는 방법 공부하기',4,'Y',6,1),(123,'자바 생성자 요약하기',4,'N',3,1),(124,'인스턴스화 개념 숙지',4,'Y',5,1),(125,'생성자 완전정복하기',4,'Y',4,1),(126,'private, public, protected 차이 복습',4,'N',2,1),(127,'예제 풀이',4,'Y',5,1),(172,'',0,'N',166,6),(173,'노찌',0,'Y',166,6),(190,'회차 회차',0,'Y',1,5),(191,'등록도랴ㅐ',0,'N',1,5),(198,'2022 12월 모의고사 풀기',1,'Y',6,4),(199,'모의고사 오답풀이',1,'Y',6,4),(200,'비슷한 유형 문제 찾기',1,'N',6,4),(202,'경제신문 읽기',1,'Y',6,7),(203,'재무제표 보는 법 익히기',1,'N',6,7);
/*!40000 ALTER TABLE `todo_group_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:03:21
