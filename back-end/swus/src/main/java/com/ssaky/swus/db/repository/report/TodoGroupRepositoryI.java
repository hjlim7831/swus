package com.ssaky.swus.db.repository.report;

import com.ssaky.swus.db.entity.report.TodoGroup;
import com.ssaky.swus.db.entity.report.TodoGroupId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface TodoGroupRepositoryI extends JpaRepository<TodoGroup, TodoGroupId> {

    @Transactional
    TodoGroup save(TodoGroup todoGroup);

    <T> Optional<T> findByIdRoundAndIdTeamId(int round, int teamId, Class<T> type);

}
