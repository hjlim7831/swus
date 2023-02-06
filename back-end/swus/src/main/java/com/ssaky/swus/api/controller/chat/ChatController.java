package com.ssaky.swus.api.controller.chat;

import com.ssaky.swus.db.model.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

//메세지 전송을 위한 컨트롤러
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

    //@MessageMapping을 통해 Websocket으로 들어오는 메세지 발행을 처리
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) //message 타입이 ENTER라면
            message.setMessage(message.getSender() + "님이 입장하셨습니다."); // 환영멘트를 메세지에 저장
        //ChatMessage 객체를 메세지로 변환하여 목적지로 전송함
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomName(), message);
    }
}
