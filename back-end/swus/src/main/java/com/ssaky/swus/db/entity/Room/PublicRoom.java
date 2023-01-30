package com.ssaky.swus.db.entity.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="public_room")
@NoArgsConstructor
public class PublicRoom {
    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private int id;

    private String type;

}
