package com.ssaky.swus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

//Stomp를 사용하기 위해 @EnableWebSocketMessageBroker 사용
@Configuration
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {

    //pub/sub 메시징 구현
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //메시지를 구독하는 요청에는 prefix로 /sub를 달기
        config.enableSimpleBroker("/sub");

        //메시지 발행하는 요청에는 prefix로 /pub를 달기
        config.setApplicationDestinationPrefixes("/pub");
    }

    //stomp websocket의 연결 endpoint는 /ws-stomp로 설정
    //웹소켓 개발 서버 접속 주소는 ws://localhost:port/ws-stomp
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*")
                .withSockJS();
    }
}