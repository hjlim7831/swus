package com.ssaky.swus.db.repository.member;

import com.ssaky.swus.api.request.auth.CheckPwdReq;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.db.entity.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    private final EntityManager em;

    public void save(Member member) {em.persist(member);}

    public Optional<Member> findOne(int id) {
        return Optional.ofNullable(em.find(Member.class, id));
    }

    public Optional<Member> findByEmail(String email){
        List<Member> resultList = em.createQuery("select m from Member m where m.email = :email", Member.class)
                .setParameter("email", email)
                .getResultList();
        if (resultList.isEmpty()){
            return Optional.empty();
        }else{
            return Optional.of(resultList.get(0));
        }
    }

    public Optional<Member> checkEmailAndPassword(LoginReq form){
        String email = form.getEmail();
        String password = form.getPassword();

        List<Member> resultList = em.createQuery("select m from Member m where m.email = :email and m.password = :password", Member.class)
                .setParameter("email", email)
                .setParameter("password", password)
                .getResultList();
        if (resultList.isEmpty()){
            return Optional.empty();
        }else{
            return Optional.of(resultList.get(0));
        }
    }

    public Optional<Member> findByEmailAndQuestion(CheckPwdReq form) {
        List<Member> resultList = em.createQuery("select m from Member m where m.email = :email and m.questionId = :questionId and m.answer = :answer", Member.class)
                .setParameter("email", form.getEmail())
                .setParameter("questionId", form.getQuestionId())
                .setParameter("answer", form.getAnswer())
                .getResultList();
        if (resultList.isEmpty()){
            return Optional.empty();
        }else{
            return Optional.of(resultList.get(0));
        }
    }
}
