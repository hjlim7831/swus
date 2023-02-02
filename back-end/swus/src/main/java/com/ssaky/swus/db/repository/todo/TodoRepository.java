package com.ssaky.swus.db.repository.todo;

import com.ssaky.swus.api.response.auth.todo.TodoGetResp;
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


    public Optional<TodoPrivate> findOne(int num, int memberId){
        List<TodoPrivate> list = em.createQuery("select t from TodoPrivate t where t.member.id = :memberId and t.num = :num", TodoPrivate.class)
                .setParameter("memberId", memberId)
                .setParameter("num", num)
                .getResultList();
        return list.stream().findAny();
        }

    public List<TodoGetResp> findList(int memberId){
        return em.createQuery("select new com.ssaky.swus.api.response.auth.todo.TodoGetResp(t.num, t.todoDone, t.content) from TodoPrivate t where t.member.id = :memberId", TodoGetResp.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    /**
     * num을 찾아 해당 row 제거
     * @param todoPrivate
     */
    public void delete(TodoPrivate todoPrivate){
        em.remove(todoPrivate);
    }


}
