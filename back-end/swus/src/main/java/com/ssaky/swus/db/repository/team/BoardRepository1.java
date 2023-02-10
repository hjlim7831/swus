package com.ssaky.swus.db.repository.team;

import com.ssaky.swus.db.entity.team.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface BoardRepository1 extends JpaRepository<Board, Integer> {

    <T> Optional<T> findByTeamTeamId(int teamId, Class<T> type);

    <T> Optional<T> findByBoardId(int boardId, Class<T> type);

    @Transactional
    Board save(Board board);
}
