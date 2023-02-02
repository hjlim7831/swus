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

    public int save(TodoPrivate todoPrivate) {
        em.persist(todoPrivate);
        return todoPrivate.getNum();
    }

    public Optional<TodoPrivate> findOne(int num){
        return Optional.ofNullable(em.find(TodoPrivate.class, num)); }

    public List<TodoPrivate> findList(int memberId){
        return em.createQuery("select t from TodoPrivate t where t.member.id = :memberId", TodoPrivate.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    /**
     * num을 찾아 해당 row 제거
     * @param todoPrivate
     */
    public void delete(int num){
        TodoPrivate todoPrivate = TodoPrivate.builder().num(num).build();
        em.remove(todoPrivate);
    }


}
