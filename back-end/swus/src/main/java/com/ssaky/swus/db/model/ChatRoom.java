package com.ssaky.swus.db.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoom {
    private String name;

    //채팅방 생성
    public static ChatRoom create(String name) {
        ChatRoom chatRoom = new ChatRoom();
//        chatRoom.roomId = UUID.randomUUID().toString(); //이부분을 randomUUID에서 바꿔야한다.
        chatRoom.name = name;
        return chatRoom;
    }
}
