package com.ssaky.swus.db.repository.room;

import com.ssaky.swus.db.entity.Room.PublicRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Slf4j
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

    //방 인원수를 count 만큼 증가 또는 감소
    public void updateCount(int id, int count){
        PublicRoom publicRoom=null;
        publicRoom = em.find(PublicRoom.class, id);
        log.debug("id : "+id+(publicRoom==null?" 이 아이디는 널입니다. ":publicRoom.toString()));
        int updateCnt = publicRoom.getCount()+count;
        publicRoom.setCount(updateCnt);
    }
    public void delete(PublicRoom room) {
        em.remove(room);
    }

}
