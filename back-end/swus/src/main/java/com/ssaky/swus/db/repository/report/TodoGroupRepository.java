package com.ssaky.swus.db.repository.report;


import com.ssaky.swus.api.response.report.TodoGroupGetResp;
import com.ssaky.swus.db.entity.report.TodoGroup;
import com.ssaky.swus.db.entity.report.TodoGroupId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TodoGroupRepository {

    private final EntityManager em;

    @Transactional
    public TodoGroupId save(TodoGroup todoGroup) {
        em.persist(todoGroup);
        return todoGroup.getId();
    }

    public TodoGroup findOne(int teamId, int round) {
        TodoGroupId id = new TodoGroupId(teamId, round);
        return em.find(TodoGroup.class, id);
    }

    //회차별 주제 리스트 불러오기
    public List<TodoGroupGetResp> findTodoGroups(int teamId) {
        return em.createQuery("SELECT com.ssaky.swus.api.response.report.TodoGroupGetResp(t.id.round, t.content)" +
                        " FROM TodoGroup t" +
                        " WHERE t.id.teamId = :teamId", TodoGroupGetResp.class)
                .setParameter("groupId", teamId)
                .getResultList();
    }
}
