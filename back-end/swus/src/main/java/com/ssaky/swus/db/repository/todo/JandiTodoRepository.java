package com.ssaky.swus.db.repository.todo;

import com.ssaky.swus.db.entity.todo.JandiTodo;
import com.ssaky.swus.db.entity.todo.JandiTodoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public interface JandiTodoRepository extends JpaRepository<JandiTodo, JandiTodoId> {

    @Transactional
    JandiTodo save(JandiTodo jandiTodo);

    <T> List<T> findByIdMemberIdAndIdStudyAtBetween(int memberId, Date fromDate, Date toDate, Class<T> type);

}
