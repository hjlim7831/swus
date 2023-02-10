package com.ssaky.swus.db.entity.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="group_room")
@NoArgsConstructor
public class GroupRoom {

    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private int id;

    private String type;

    //private int team_id; //그룹id 외래키
}
