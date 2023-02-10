package com.ssaky.swus.db.entity.Room;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@ToString
@Table(name="public_room")
@NoArgsConstructor
@AllArgsConstructor
public class PublicRoom {
    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private int id;

    //쉬는 시간 있는 방 Y, 없는 방 N
    private String type;

    //세션 이름 (세션 이름별로 방이 생성됨)
    private String session_name;

    //방 참여인원수 초기값 0
    @Builder.Default
    private int count=0;

}
