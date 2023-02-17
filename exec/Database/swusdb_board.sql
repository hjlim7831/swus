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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `create_at` date DEFAULT NULL,
  `content` longtext,
  `title` varchar(255) NOT NULL,
  `views` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKsds8ox89wwf6aihinar49rmfy` (`member_id`),
  KEY `FKhnthbc04iar1brn0b6jki0evy` (`team_id`),
  CONSTRAINT `FKhnthbc04iar1brn0b6jki0evy` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `FKsds8ox89wwf6aihinar49rmfy` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'2023-02-16','유튜브 이펙티브 자바 기초편 1주에 두 챕터 진도 나갑니다. \n매일 분량을 정해줍니다. \n공부한 내용의 책 사진을 인증해주시고 모르는 것이 있으면 질문하고 대답하는 시간 가지겠습니다\n(저도 초보라 자신은 없지만 성심성의껏 답변하겠습니다). \n\n온라인으로 진행되며 만약 당일 (자정 12시 기준)에 스터디를 하지 못했을 경우에는 스터디원 중에 한분에게 랜덤으로 1000원 기프티콘 돌리는 벌칙을 수행해야 합니다. \n자바의 정석 기초편 진행한 후에는 스터디원 의견에 따라 자바의 정석으로 가거나 재독을 염두에 두고 있습니다.\n\n아래 카톡으로 연락주세요\nID : ssafy123','이펙티브 자바 스터디 구합니다',32,1,1),(2,'2023-02-16','토익 스터디를 모집합니다.\n\n한달 달려서 목표 점수 같이 이뤄요!\n\n시험장처럼 토익 모의고사 같이 풀고 채점해요, 그후에 오답정리나 모르는 것 있으면 공유합시다.','토익 스터디 모집합니다.',7,16,2),(3,'2023-02-16','저녁시간에 같이 공부할 사람 모집합니다~\n\n02.16 ~ 03.24 (월, 수, 금)\n약 한달간 6시 30분부터 9시 30분까지 3시간동안 같이 공부할 친구 2명 찾아요~\n\n같이 하시고 싶으신 분은\n카ID : hyejin0000\n으로 연락주세요~','저녁시간에 공부할 사람 모집합니다~',10,4,3),(4,'2023-02-16','지구 과학 모의고사 같이 풀 스터디원 구합니다.\n\n2018년부터 2023년까지 5 개년 치\n최근 것부터 같이 시간 정해서 푸실 분 구합니다.\n\n공부는 모여서 각자!!\n같이 지구 과학 모의고사 풀어도 좋고\n다른 공부하고 싶으면 다른 공부해도 됩니다.\n모여서 같이 동기부여만 해주세요~~\n\nkakao아이디 : happysooneung','지구과학 모의고사 스터디 같이해요',11,6,4),(5,'2023-02-16','취준생인데 혼자 공부하는것보다 여럿이서 규칙을 지키면서 공부하는게 더 도움이 돼서 만들었습니다. 서로 화면 공유해서 같이 공부하는 느낌을 받고 싶은게 목적입니다. \n\n무조건 평일 7시~10시는 참여하셔야하고 그 이후나 주말/공휴일은 자율입니다. 이때는 하시고 싶으신분만 나와서 하시면 됩니다.\n\n지각 3번은 무단 결석 1번으로 무단 결석 3번시 퇴실됩니다.\n\n카톡ID : ssafy123','아침 모각공 4분 구해요~~',3,1,5),(6,'2023-02-16','CS에 대한 학습(네트워크 , OS)\n인원 : 2명 (현재: 1명)\n\n5개 Github Repo에 있는 내용 중 중복되는 문제를 먼저 학습을 하고 이후 자세하게 공부를 할 생각입니다.\n취준생 분들을 위주로 뽑을 예정입니다. 만약에 직장이 있으셔도 시간이 가능하시면 상관은 없습니다.','CS 스터디 모집합니다',1,164,6),(7,'2023-02-17','모여서 각자 공부할 사람 구합니다.\n시간만 잘 지켜서 와주세요\n\n카톡아이디: sjk2321','모각공 메이트 구해요',1,6,7);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:03:31
