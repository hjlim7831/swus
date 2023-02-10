package com.ssaky.swus.db.entity.Room;

import com.ssaky.swus.db.entity.member.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Builder
@Entity
@Getter
@Setter
@Table(name="public_participant")
@NoArgsConstructor
@AllArgsConstructor
public class PublicParticipant {

    @Id
    @GeneratedValue
    @Column(name = "participant_id")
    private int id;

    private LocalDateTime joined_at;

    //참가자가 속한 방
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "room_id")
    private PublicRoom room;

    //멤버와 단방향 관계
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
