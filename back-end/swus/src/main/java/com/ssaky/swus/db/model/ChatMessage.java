package com.ssaky.swus.db.model;

import lombok.Getter;
import lombok.Setter;

//채팅메세지를 주고받기 위한 DTO
@Getter
@Setter
public class ChatMessage {

    private MessageType type; // 메시지 타입
    private String roomName; // 방이름
    private String sender; // 메시지 보낸사람
    private String message; // 메시지

    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
        ENTER, TALK
    }
}
