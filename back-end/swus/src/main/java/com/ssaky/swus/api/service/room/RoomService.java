package com.ssaky.swus.api.service.room;

import com.ssaky.swus.api.request.room.PublicExitReq;
import com.ssaky.swus.common.error.exception.custom.OverCapacityException;
import com.ssaky.swus.db.entity.Room.PublicParticipant;
import com.ssaky.swus.db.entity.Room.PublicRoom;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.room.ParticipantRepository;
import com.ssaky.swus.db.repository.room.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;
    private final int LIMIT = 9; //공용 열람실의 최대 인원수

    @Transactional
    public int createPublic(String type) {
        PublicRoom publicRoom = new PublicRoom();
        publicRoom.setType(type);
        return roomRepository.createPublic(publicRoom);
    }

    public List<PublicRoom> findPublics() {
        return roomRepository.findAll();
    }

    @Transactional
    public void enterPublic(int room_id, int user_id){
        PublicRoom room = roomRepository.findPublicOne(room_id);
        //Optional<T>를 쓰면 T가 null인 경우를 방지해줌
        Optional<Member> member = memberRepository.findOne(user_id);

        //기능1. 방 정원을 넘는지 검사
        if (room.getCount() >= LIMIT) {
            throw new OverCapacityException(LIMIT,room.getCount());
        }

        //기능2. room_id의 참가자 1 증가시키기
        roomRepository.updateCount(room_id, 1);

        //기능3. 만약 비정상적으로 종료한 사용자가 Participant에 남아있다면 삭제
        PublicParticipant unnomalUser = participantRepository.findByMemberId(user_id);
        if(unnomalUser != null){
            participantRepository.exit(unnomalUser);
        }

        //기능4. user를 Paricipant에 insert해주기
        PublicParticipant participant = PublicParticipant.builder()
                .room(room)
                .member(member.get())
                .joined_at(LocalDateTime.now()).build();
        participantRepository.joinPublic(participant);
    }
    @Transactional
    public void exitPublic(PublicExitReq publicExitReq) {
        //기능1 순공, 총공시간 갱신
        //아직 구현 안함

        //기능2 room_id의 참가자 1 감소시키기
        roomRepository.updateCount(publicExitReq.getRoomId(), -1);

        //기능3. Participant에서 Delete해주기
        PublicParticipant participant = participantRepository.findByMemberId(publicExitReq.getMemberId());
        log.debug("삭제할 참가자 id : "+publicExitReq.getMemberId());
        log.debug("삭제할 참가자 : "+participant);
        participantRepository.exit(participant);
    }
}
