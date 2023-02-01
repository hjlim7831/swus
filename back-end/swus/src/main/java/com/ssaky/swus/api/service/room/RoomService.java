package com.ssaky.swus.api.service.room;

import com.ssaky.swus.db.entity.Room.PublicRoom;
import com.ssaky.swus.db.repository.room.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;

    @Transactional
    public int createPublic(String type) {
        PublicRoom publicRoom = new PublicRoom();
        publicRoom.setType(type);
        int room_id = roomRepository.createPublic(publicRoom);
        return room_id;
    }

    public List<PublicRoom> findPublics() {
        return roomRepository.findAll();
    }

    @Transactional
    public void enterPublic(int room_id, int user_id){

        //기능1. 방 정원을 넘는지 검사

        //기능2. room_id의 참가자 1 증가시키기
        roomRepository.updateCount(room_id, 1);

        //기능3. user를 Paricipant에 insert해주기
    }
}
