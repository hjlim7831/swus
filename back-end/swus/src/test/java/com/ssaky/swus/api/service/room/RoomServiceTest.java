package com.ssaky.swus.api.service.room;

import com.ssaky.swus.common.error.exception.custom.OverCapacityException;
import com.ssaky.swus.db.entity.Room.PublicRoom;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.room.ParticipantRepository;
import com.ssaky.swus.db.repository.room.RoomRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoomServiceTest {

    @Autowired
    RoomService roomService;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    EntityManager em;

    @Test
    @Transactional
    @Rollback
    public void 정원초과() {
        //방 생성
        PublicRoom room = PublicRoom.builder()
                .type("N").build();
        int room_id = roomRepository.createPublic(room);

        //참가자 10명 생성
        List<Integer> memberIds = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Member member = new Member();
            em.persist(member);
            memberIds.add(member.getId());
        }

        //참가자 9명 입장
        for(int i=0; i<9; i++){
            roomService.enterPublic(room_id, memberIds.get(i));
        }

        //참가자 1명 추가로 입장 << 에러 발생해야함
        assertThrows(OverCapacityException.class, () -> roomService.enterPublic(room_id, memberIds.get(9)));
    }

}