package com.ssaky.swus.db.repository.room;

import com.ssaky.swus.db.entity.Room.PublicRoom;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoomRepositoryTest {

    @Autowired
    RoomRepository roomRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void 공용열람실_생성() {
        PublicRoom publicRoom = new PublicRoom();
        publicRoom.setType("N");
        int roomId = roomRepository.createPublic(publicRoom);

        PublicRoom findPublicRoom = roomRepository.findPublicOne(roomId);

        //새로 생성한 객체와 영속성 컨테이너에 등록된 객체의 아이디가 같은지 비교
        Assertions.assertThat(findPublicRoom.getId()).isEqualTo(publicRoom.getId());

        //JPA 엔티티가 동일한지 비교
        Assertions.assertThat(findPublicRoom).isEqualTo(publicRoom);
    }
}