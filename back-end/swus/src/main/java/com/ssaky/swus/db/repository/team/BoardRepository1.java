package com.ssaky.swus.db.repository.team;

import com.ssaky.swus.db.entity.team.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository1 extends JpaRepository<Board, Integer> {

    <T> Optional<T> findByTeamTeamId(int teamId, Class<T> type);
}
