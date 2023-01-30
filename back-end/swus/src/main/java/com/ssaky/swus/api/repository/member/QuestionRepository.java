package com.ssaky.swus.api.repository.member;

import com.ssaky.swus.api.domain.member.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuestionRepository {

    private final EntityManager em;

    public Question findOne(int id) {
        return em.find(Question.class, id);
    }

    public List<Question> findAll(){
        return em.createQuery("select q from Question q", Question.class)
                .getResultList();
    }


}
