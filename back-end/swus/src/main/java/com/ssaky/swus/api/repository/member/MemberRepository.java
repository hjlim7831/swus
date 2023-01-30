package com.ssaky.swus.api.repository.member;

import com.ssaky.swus.api.request.auth.LoginDTO;
import com.ssaky.swus.api.domain.member.Member;
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

    public Member findOne(int id) {return em.find(Member.class, id);}

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

    public Optional<Member> checkEmailAndPassword(LoginDTO form){
        String email = form.getEmail();
        String password = form.getPassword();

        List<Member> resultList = em.createQuery("select m from Member m where m.email = :email and m.password = :password", Member.class)
                .getResultList();
        if (resultList.isEmpty()){
            return Optional.empty();
        }else{
            return Optional.of(resultList.get(0));
        }
    }

}
