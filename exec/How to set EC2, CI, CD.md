# [Final] How to set EC2 & CI/CD

---
- Written By @ShinMinhye

## 사용 기술

---
### Server

- Ubuntu 20.04 LTS

### Database

- MySQL 8.0.29

### Container & Management



### SSL



### Proxy



### Deploy



### WebRTC

- Openvidu 2.22.0

### Architecture



## Dev env

---
### Frontend

- React {버전작성}
- VS Code {버전작성}

### Backend

- Spring Boot 2.7
    - OpenJDK 11
- IntelliJ 2022.3.1

### External Libraries

- Frontend
    - {사용한 라이브러리 작성}


### Git Branch Strategy

- {내용작성}

### ✨ EC2 포트 정리




# 방법

## EC2 설정

1. apt-get 최신화

    ```bash
    sudo apt-get update
    ```

2. ec2에 docker를 설치한다

    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    
    # docker.sock 권한 변경
    # docker를 재시작할때마다 아래의 명령어 입력 필요
    chmod 666 /var/run/docker.sock
    
    # docker-compose도 설치해준다(openvidu 컨테이너화에 필요)
    apt install docker-compose
    ```

3. ec2에 letsencrypt를 이용하여 ssl 인증서를 받는다

    ```bash
    sudo apt-get install letsencrypt
    sudo letsencrypt certonly —standalone -d <DOMAIN>
    ```

4. ec2에 Nginx를 설치한다

    ```bash
    sudo apt-get install nginx
    ```


## Frontend 설정

1. EC2에 프로젝트와 동일한 node.js 버전 및 npm 설치

    ```bash
    {우분투 설치 명령어}
    ```


## Backend 설정

1. 프로젝트 최상단에 Dockerfile 작성
    - Dockerfile

        ```docker
        코드 작성
        ```


- server.port 는 8080(기본값)으로 사용

## DB 설정

1. {작성}

    ```bash
    작성
    ```


## Jenkins

1. {작성}

    ```bash
    작성
    ```



### Frontend - Jenkins
1. frontend config file 설정

    ```bash
    {작성}
    ```


### Backend - Jenkins
1. backend config file 설정

    ```bash
    {작성}
    ```


### Main branch Deploy - Jenkins
1. Jenkins 설정
    


## Openvidu
### Installation
1. {내용작성}