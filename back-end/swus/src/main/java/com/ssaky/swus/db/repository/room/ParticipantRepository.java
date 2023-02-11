package com.ssaky.swus.db.repository.room;

import com.ssaky.swus.db.entity.Room.PublicParticipant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ParticipantRepository {

    private final EntityManager em;

    public void joinPublic(PublicParticipant publicParticipant) {
        em.persist(publicParticipant);
    }

    public Optional<PublicParticipant> findByMemberId(int id){
        List<PublicParticipant> partis = em.createQuery("select p from PublicParticipant p where p.member.id = :id", PublicParticipant.class)
                .setParameter("id", id).getResultList();

        return partis.stream().findAny();
    }

    public List<PublicParticipant> findByRoomId(int roomId) {
        List<PublicParticipant> partis = em.createQuery("select p from PublicParticipant p where p.room.id = :id", PublicParticipant.class)
                .setParameter("id", roomId).getResultList();

        return partis;
    }

    public void exit(PublicParticipant participant) {
        em.remove(participant);
    }
}
