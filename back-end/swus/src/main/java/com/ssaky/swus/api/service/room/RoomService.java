package com.ssaky.swus.api.service.room;

import com.ssaky.swus.api.request.room.PublicExitReq;
import com.ssaky.swus.api.response.room.ParticipantResp;
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
import java.util.ArrayList;
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

    public PublicRoom findPublic(int id) {
        return roomRepository.findPublicOne(id);
    }

    public List<PublicRoom> findPublics() {
        return roomRepository.findAll();
    }

    @Transactional
    public void enterPublic(int room_id, int user_id){
        PublicRoom room = roomRepository.findPublicOne(room_id);

        //기능1. 방 정원을 넘는지 검사
        if (room.getCount() >= LIMIT) {
            throw new OverCapacityException(LIMIT,room.getCount());
        }

        //기능2. room_id의 참가자 1 증가시키기
        roomRepository.updateCount(room_id, 1);

        //기능3. 만약 비정상적으로 종료한 사용자가 Participant에 남아있다면 삭제
        Optional<PublicParticipant> unnomalUser = participantRepository.findByMemberId(user_id);
        log.debug("비정상적인 입장을 요청한 사용자가 있습니까? "+unnomalUser.isPresent());
        if(unnomalUser.isPresent()){
            log.debug("위 사용자를 삭제합니다.");
            int roomId = unnomalUser.get().getRoom().getId();
            int memberId = unnomalUser.get().getMember().getId();
            this.exitPublic(new PublicExitReq(roomId, memberId)); //비정상 사용자가 속했던 방에서 퇴장처리

            Optional<PublicParticipant> delParti = participantRepository.findByMemberId(memberId);
            log.debug("호출 후 검사 > "+(!delParti.isPresent()?"삭제된 참가자 입니다.":"삭제되지 않았습니다."));
        }

        //기능4. user를 Paricipant에 insert해주기
        Optional<Member> member = memberRepository.findById(user_id, Member.class); //Optional<T>를 쓰면 T가 null인 경우를 방지해줌
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
        PublicParticipant participant = participantRepository.findByMemberId(publicExitReq.getMemberId()).get();
        log.debug("삭제할 참가자 id : "+publicExitReq.getMemberId());
        log.debug("삭제할 참가자 : "+participant);
        participantRepository.exit(participant);
    }

    public List<ParticipantResp> getParticipants(int roomId) {
        List<ParticipantResp> partiResps = new ArrayList<>();
        List<PublicParticipant> partis = participantRepository.findByRoomId(roomId);
        for (PublicParticipant p : partis) {
            int partiId = p.getId();
            int memberId = p.getMember().getId();
            LocalDateTime joinedAt = p.getJoined_at();
            partiResps.add(new ParticipantResp(partiId,memberId,joinedAt));
        }
        return partiResps;
    }
}
