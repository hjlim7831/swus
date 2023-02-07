package com.ssaky.swus.db.repository.todo;

import com.ssaky.swus.api.response.todo.TodoGetResp;
import com.ssaky.swus.db.entity.todo.TodoPrivate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TodoRepository {

    private final EntityManager em;

    @Transactional
    public int save(TodoPrivate todoPrivate) {
        em.persist(todoPrivate);
        return todoPrivate.getNum();
    }

    public Optional<TodoPrivate> findOne(int num, int memberId) {
        List<TodoPrivate> list = em.createQuery("SELECT t FROM TodoPrivate t WHERE t.member.id = :memberId AND t.num = :num", TodoPrivate.class)
                .setParameter("memberId", memberId)
                .setParameter("num", num)
                .getResultList();
        return list.stream().findAny();
        }

    public List<TodoGetResp> findList(int memberId) {
        return em.createQuery("SELECT new com.ssaky.swus.api.response.todo.TodoGetResp(t.num, t.todoDone, t.content) FROM TodoPrivate t WHERE t.member.id = :memberId", TodoGetResp.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    /**
     * num을 찾아 해당 row 제거
     * @param todoPrivate
     */
    @Transactional
    public void delete(TodoPrivate todoPrivate){
        em.remove(todoPrivate);
    }

    /**
     * 완료한 todo들을 모두 제거
     * deleteAllByIdIn 이런 식으로 구현하면, Query가 하나씩 날아가서 매우 느려짐
     *
     */
    @Transactional
    public void deleteAllDoneInQuery(){
        em.createQuery("DELETE FROM TodoPrivate t WHERE t.todoDone = :done")
                .setParameter("done", "Y")
                .executeUpdate(); // update, delete 이 일어나는 경우에는 executeUpdate 붙이기
    }

    /**
     * JandiTodo에 저장하기 위해 사용자 별로 완료한 투두 개수 조회
     */
    public List<MemberTodoCount> findTodoCountGroupByMember(){
        return em.createQuery("SELECT new com.ssaky.swus.db.repository.todo.MemberTodoCount(tp.member.id, COUNT(tp.member.id)) FROM TodoPrivate tp " +
                "WHERE tp.todoDone = :done "+
                "GROUP BY tp.member.id", MemberTodoCount.class)
                .setParameter("done", "Y")
                .getResultList();
    }


}
