package com.ssaky.swus.db.repository.room;

import com.ssaky.swus.db.entity.Room.PublicRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    //공용 열람실 생성
    public int createPublic(PublicRoom publicRoom) {
        em.persist(publicRoom);
        int room_id = publicRoom.getId();
        publicRoom.setSession_name("public"+publicRoom.getType()+room_id);
        return publicRoom.getId();
    }

    //공용 열람실 조회
    public PublicRoom findPublicOne(int id) {
        return em.find(PublicRoom.class, id);
    }

    public List<PublicRoom> findAll() {
        return em.createQuery("select i from PublicRoom i", PublicRoom.class)
                .getResultList();
    }

}
