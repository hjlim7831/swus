package com.ssaky.swus.db.repository.team;

import com.ssaky.swus.db.entity.team.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface TeamRepository1 extends JpaRepository<Team, Integer> {

    <T> Optional<T> findByTeamId(int teamId, Class<T> type);

    @Transactional
    Team save(Team team);

    @Transactional
    void deleteAll();

}
