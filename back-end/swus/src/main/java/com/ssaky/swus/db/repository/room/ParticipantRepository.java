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
}
