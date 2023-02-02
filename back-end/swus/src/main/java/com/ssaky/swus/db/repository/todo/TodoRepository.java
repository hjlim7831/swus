package com.ssaky.swus.db.repository.todo;

import com.ssaky.swus.db.entity.todo.TodoPrivate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TodoRepository {

    private final EntityManager em;

    public void save(TodoPrivate todoPrivate) {em.persist(todoPrivate); }



//    public Optional<TodoPrivate> findOne(int num){ return em.find(TodoPrivate.class, num); }

    public List<TodoPrivate> findList(int memberId){
        return em.createQuery("select t from TodoPrivate t where t.member.id = :memberId", TodoPrivate.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }
}
