package com.ssaky.swus.db.repository.todo;

import com.ssaky.swus.db.entity.todo.JandiTodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface JandiTodoRepository extends JpaRepository<JandiTodo, Date> {

    JandiTodo save(JandiTodo jandiTodo);

}
