package com.ssaky.swus.db.repository.report;

import com.ssaky.swus.api.response.report.TodoGroupMemberGetResp;
import com.ssaky.swus.db.entity.report.TodoGroupMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TodoGroupMemberRepository {

    private final EntityManager em;


    @Transactional
    public int save(TodoGroupMember todoGroupMember) {
        em.persist(todoGroupMember);
        return todoGroupMember.getNum();
    }

    public Optional<TodoGroupMember> findOne(int num) {
        List<TodoGroupMember> list = em.createQuery(
                "SELECT t FROM TodoGroupMember t " +
                        "WHERE t.num = :num", TodoGroupMember.class)
                .setParameter("num", num)
                .getResultList();
        return list.stream().findAny();
    }

    /**
     * num을 찾아 해당 row 제거
     * @param todoGroupMember
     */
    @Transactional
    public void delete(TodoGroupMember todoGroupMember){
        em.remove(todoGroupMember);
    }

    //해당 회차의 사용자 투두리스트 불러오기
    public List<TodoGroupMemberGetResp> findTodoGroupMemberList(int memberId, int teamId, int round) {
        return em.createQuery("SELECT new com.ssaky.swus.api.response.report.TodoGroupMemberGetResp(t.num, t.todoDone, t.content)" +
                        " FROM TodoGroupMember t" +
                        " WHERE t.member.id = :memberId" +
                        " AND t.team.teamId = :teamId" +
                        " AND t.round = :round", TodoGroupMemberGetResp.class)
                .setParameter("memberId", memberId)
                .setParameter("round", round)
                .setParameter("teamId", teamId)
                .getResultList();
    }
}
