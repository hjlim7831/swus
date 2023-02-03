package com.ssaky.swus.db.repository.room;

import com.ssaky.swus.db.entity.Room.PublicParticipant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class ParticipantRepository {

    private final EntityManager em;

    public void joinPublic(PublicParticipant publicParticipant) {
        em.persist(publicParticipant);
    }

    public PublicParticipant findByMemberId(int id){
        return em.createQuery("select p from PublicParticipant p where p.member.id = :id", PublicParticipant.class)
                .setParameter("id", id).getSingleResult();
    }

    public void exit(PublicParticipant participant) {
        em.remove(participant);
    }
}
