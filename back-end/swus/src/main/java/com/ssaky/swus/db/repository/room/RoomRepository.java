package com.ssaky.swus.db.repository.room;

import com.ssaky.swus.db.entity.Room.PublicRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    //공용 열람실 생성
    public int createPublic(PublicRoom publicRoom) {
        em.persist(publicRoom);
        return publicRoom.getId();
    }

    //공용 열람실 조회
    public PublicRoom findPublicOne(int id) {
        return em.find(PublicRoom.class, id);
    }

}
